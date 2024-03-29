---
slug: solving-the-issue-openwrt-homeproxy-hysteria2-port-hopping
title: 解决 Openwrt 上 HomeProxy 插件不支持 Hysteria2 Port Hopping 的问题
authors: [sqybi]
date: 2024-03-05T21:00
tags: [technology]
keywords: [technology, 技术, openwrt, homeproxy, hysteria, port hopping]
unlisted: false
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 4
---

随手记录一些比较短的问题解决方案：

Openwrt 上 HomeProxy 的 sing-box 不支持 Hysteria2 port hopping？不如自己来 hop 吧！

<!--truncate-->

## 背景

Hysteria2 是一种基于 UDP 的代理方案。

因为国内运营商大多对 UDP 的流量进行了管控（UDP QoS），所以如果长期连接某个特定的端口发送大量 UDP 包，很容易导致后续到这个端口的 UDP 包都会被运营商直接丢弃。

Hysteria 的客户端自带了 port hopping 功能，即可以输入一个或多个端口段，由客户端自行在一定时间之后重新连接一个新的端口。

但我在使用的 OpenWrt (ImmortalWrt) 中 HomeProxy 插件是基于 sing-box 的，可惜的是 sing-box 并没有支持 Hysteria2 协议的 port hopping 特性，且根据 issues 中的讨论，今后也没有支持的打算。

我们只好自己动手丰衣足食，写一段自动更换端口的脚本。

## 服务端配置

根据 [Hysteria2 官方文档](https://v2.hysteria.network/docs/advanced/Port-Hopping/#server) 中的说明，即使是官方服务端也是不支持配置多端口监听的。这是因为 `iptables` / `nftables` 可以简单地通过配置 DNAT 完成同样的功能。

其中`iptables` 配置如下，如果你的服务端系统已经升级到了 `nftables` 也可以自行查阅上述文档中的配置方法：

```shell
iptables -t nat -A PREROUTING -i eth0 -p udp --dport 20000:29999 -j DNAT --to-destination :443
ip6tables -t nat -A PREROUTING -i eth0 -p udp --dport 20000:29999 -j DNAT --to-destination :443
```

这里的 `20000` - `29999` 是 port hopping 功能监听的端口段，后续客户端配置需要对应这一段端口号；`443` 是 Hysteria2 自身监听的端口。

同时，需要注意 `iptables` 的配置会在重启后失效，可以使用 `netfilter-persistent` 来持久化配置。

首先安装 `netfilter-persistent`：

```shell
apt install iptables-persistent
```

理论上如果在安装之前你已经完成了 `iptables` 配置，那么对应的配置文件就已经被持久化且保存在 `/etc/iptables/rules.v4` 和 `/etc/iptables/rules.v6` 中了。

如果没有也没关系，可以执行 `iptables-save > /etc/iptables/rules.v4` 和 `iptables-save > /etc/iptables/rules.v6` 手动保存。每次重启的时候，`systemctl` 的服务 `netfilter-persistent.service` 都会自动加载这些配置。

## 客户端配置

客户端则要麻烦一些，推荐使用下列脚本自动执行端口更换操作，模仿 port hopping 的效果。

脚本的开始首先配置了对应服务器配置的端口信息，其中 `PORT_STARTING` 为起始端口，`PORT_RANGE` 为端口段的长度。

接下来会尝试最多五次通过 `curl google.com` 检查网络可达性，注意 HomeProxy 是没有代理 ICMP 协议的，所以这里不要使用 `ping`，否则可能会失败。

如果五次中有任何一次成功，则意味着端口依然可用，直接退出脚本；如果五次全部失败，则认为端口已经不可用，需要更换端口。

更换端口的方式则是通过 `uci` 直接修改 OpenWrt 前端 Luci 的配置，同时在修改后适时地重启 `homeproxy` 服务。

:::warning[更新提醒：2024-03-13]

因为之前的脚本在 OpenWrt 的 sh 中执行，会导致部分语法不支持，所以我更新了脚本内容。

新的脚本通过测试已经确认可以成功执行。

:::

```shell
#!/usr/bin/env sh

PORT_STARTING=20000
PORT_RANGE=10000
MAX_FAILURE_ATTEMPTS_BEFORE_HOPPING=5
CURL_TIMEOUT_IN_SECONDS=3
NETWORK_TEST_URL=http://www.google.com/generate_204
LOG_FILE=/var/log/hopping.log
NODE_NAME=my_hysteria_node

failure_count=0

for i in $(seq 1 ${MAX_FAILURE_ATTEMPTS_BEFORE_HOPPING}); do
    curl -m ${CURL_TIMEOUT_IN_SECONDS} ${NETWORK_TEST_URL} &> /dev/null

    if [ $? -eq 0 ]; then
        echo "Network check successful."
        break
    else
        let failure_count=${failure_count}+1
        echo "Network check failed. Total failures: ${failure_count}"
    fi

    sleep 1
done

if [ "${failure_count}" -ge ${MAX_FAILURE_ATTEMPTS_BEFORE_HOPPING} ]; then
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

这里之所以要先检查网络可用性，是因为这个更换端口服务等于重新启动 HomeProxy 和 sing-box，这意味着它不像 Hysteria 官方客户端实现的 port hopping 一样可以保持连接不断开，而是要断开所有网络连接并重连。如果过于频繁地执行这个操作，反而可能导致网络特别是长连接的不稳定。

这里的网络检查是为了能够只在网络已经断开的情况下通过换端口的方式恢复，当然你也可以修改这部分脚本来执行你自己的检查策略。

最后，将上面的脚本存入文件，例如 `/root/port_hopping.sh`，并添加可执行权限：

```shell
chmod +x /root/port_hopping.sh
```

然后通过 crontab 定期执行：

```crontab
* * * * * /root/port_hopping.sh
```

大功告成！
