---
slug: solving-the-issue-openwrt-homeproxy-hysteria2-port-hopping
title: Solving the Issue of the HomeProxy Plugin on OpenWrt Not Supporting Hysteria2 Port Hopping
authors: [sqybi]
date: 2024-03-05T21:00
tags: [technology]
keywords: [technology, 技术, openwrt, homeproxy, hysteria, port hopping]
unlisted: false
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 4
last_translated_at: 2024-03-05T13:41:40.246Z
---

:::info[Translation Tool]

This article was translated by ChatGPT automatically, with minor manual corrections.

:::

Just jotting down some brief solutions to problems:

Unable to use Hysteria2 port hopping with HomeProxy's sing-box on Openwrt? Why not hop it yourself!

<!--truncate-->

## Background

Hysteria2 is a UDP-based proxy solution.

Since most domestic ISPs in China control UDP traffic (UDP QoS), if you continuously send large amounts of UDP packets to a specific port for a long time, it is very likely that subsequent UDP packets to this port will be directly discarded by the ISP.

Hysteria's client comes with a port hopping feature, which allows you to enter one or more port ranges, and the client will reconnect to a new port after some time has passed.

However, in the OpenWrt (ImmortalWrt) I am using, the HomeProxy plugin is based on sing-box, and unfortunately sing-box does not support the port hopping feature of the Hysteria2 protocol. According to the discussions in issues, there is no plan to support it in the future.

We can only take matters into our own hands by writing a script that automatically changes the ports.

## Server Configuration

According to the instructions in the [Hysteria2 official documentation](https://v2.hysteria.network/docs/advanced/Port-Hopping/#server), even the official server does not support multi-port listening configuration. This is because DNAT can be simply configured with `iptables` / `nftables` to achieve the same function.

The `iptables` configuration is as follows, if your server system has upgraded to `nftables`, you can also refer to the configuration methods in the documentation above:

```shell
iptables -t nat -A PREROUTING -i eth0 -p udp --dport 20000:29999 -j DNAT --to-destination :443
ip6tables -t nat -A PREROUTING -i eth0 -p udp --dport 20000:29999 -j DNAT --to-destination :443
```

Here, `20000` - `29999` is the port range listened to by the port hopping feature, and subsequent client configurations need to correspond to this range of port numbers; `443` is the port Hysteria2 itself listens to.

At the same time, it should be noted that the `iptables` configuration will be invalid after a reboot, so you can use `netfilter-persistent` to persist the configuration.

First, install `netfilter-persistent`:

```shell
apt install iptables-persistent
```

In theory, if you have completed the `iptables` configuration before installation, then the corresponding configuration files have already been persisted and saved in `/etc/iptables/rules.v4` and `/etc/iptables/rules.v6`.

If not, that's okay, you can manually save by executing `iptables-save > /etc/iptables/rules.v4` and `ip6tables-save > /etc/iptables/rules.v6`. Every time you reboot, the `systemctl` service `netfilter-persistent.service` will automatically load these configurations.

## Client Configuration

The client configuration is a bit more complicated. It is recommended to use the script below to automatically carry out the port hopping operation, emulating the effect of port hopping.

The script starts by configuring the port information corresponding to the server configuration, where `PORT_STARTING` is the starting port, and `PORT_RANGE` is the length of the port range.

Next, it will attempt up to five times to check network reachability through `curl google.com`. Note that HomeProxy does not proxy the ICMP protocol, so don’t use `ping` here, or it might fail.

If any one of the five attempts is successful, it means the port is still available, so the script will exit directly; if all five attempts fail, it will be assumed that the port is no longer available, and it is necessary to change the port.

The way to change the port is to modify the configuration of the OpenWrt front-end Luci directly with `uci`, and to restart the `homeproxy` service in a timely manner after the modification.

```shell
#!/usr/bin/env sh

PORT_STARTING=20000
PORT_RANGE=10000
MAX_FAILURE_ATTEMPTS_BEFORE_HOPPING=5
NETWORK_TEST_URL=http://www.google.com/generate_204
LOG_FILE=/var/log/hopping.log
NODE_NAME=my_hysteria_node

failure_count=0

for i in {1..${MAX_FAILURE_ATTEMPTS_BEFORE_HOPPING}}; do
    curl ${NETWORK_TEST_URL} &> /dev/null

    if [ $? -eq 0 ]; then
        echo "Network check successful."
        break
    else
        let failure_count=${failure_count}+1
        echo "Network check failed. Total failures: ${failure_count}"
    fi

    sleep 1
done

if [ "${failure_count}" -eq ${MAX_FAILURE_ATTEMPTS_BEFORE_HOPPING} ]; then
    new_port=$((RANDOM % ${PORT_RANGE} + ${PORT_STARTING}))
    echo `date "+%Y-%m-%d %H:%M:%S"` >>${LOG_FILE}
    echo "${failure_count} consecutive ping failures. Try hopping to port ${new_port}." >>${LOG_FILE}

    uci set homeproxy.config.main_node=nil
    uci commit homeproxy
    /etc/init.d/homeproxy restart
    sleep 1
    uci set homeproxy.${NODE_NAME}.port=${new_port}
    uci set homeproxy.config.main_node=${NODE_NAME}
    uci commit homeproxy
    /etc/init.d/homeproxy restart

    echo "Switched to port ${new_port}" >>${LOG_FILE}
    echo "" >>${LOG_FILE}
else
    echo "Network is OK. Total failures: ${failure_count}"
fi
```

The reason for checking network availability first is that this port swapping service is equivalent to restarting HomeProxy and sing-box, which means it cannot maintain the connection without disconnection, like the port hopping implemented by the official Hysteria client, but it has to disconnect all network connections and reconnect. If this operation is performed too frequently, it may instead lead to instability in the network, especially in long connections.

The network check here is so that the connection can be restored by changing ports only when the network is already disconnected. Of course, you can also modify this part of the script to execute your own checking strategy.

Finally, save the above script into a file, such as `/root/port_hopping.sh`, and add executable permissions:

```shell
chmod +x /root/port_hopping.sh
```

Then execute it regularly through crontab:

```crontab
* * * * * /root/port_hopping.sh
```

Great success!
