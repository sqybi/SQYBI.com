---
slug: mechanical-keyboards-compatible-with-macos
title: Mechanical Keyboards Compatible with MacOS
authors: [sqybi]
date: 2024-05-30T23:00
tags: [random]
keywords: [keyboard, MacOS, mechanical keyboard, NuPhy, Halo96, functional key, VGN, SKN, Varmilo]
unlisted: false
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 4
last_translated_at: 2024-05-30T15:02:39.135Z
---

:::info[Translation Tool]

This article was translated by ChatGPT automatically, with minor manual corrections.

:::

Disclaimer: This article contains no advertisements, although I do hope to get ad revenue someday.

About a month ago, I left a company where I worked for over seven years and transitioned to a new industry, starting a new job.

Because of this, I'm currently in the initial stages of various tasks and have a lot to learn. As an introvert pretending to be an extrovert, the social pressure is not insignificant. Along with previous colleagues and friends wanting to catch up and my own search for housing, I indeed haven't had much time to update my blog. Even the photos from my trip to Japan in early April have only had a [few edited](https://flickr.com/photos/sqybi/).

Time flies, and now it's already the latter part of the month. To avoid a gap in May, I decided to write this article.

<!--truncate-->

(Since you clicked in, I must sincerely tell you: if you haven't encountered the problem I have, this article might be quite boring.)

## Apple Good, People Bad

Since I started working at Microsoft after graduation, my initial coding environment at work was purely Windows + Visual Studio. Being a competitive programmer, I naturally dabbled in Linux early on. However, it wasn't until I joined Google that I got my first MacBook and used MacOS for the first time.

I must say, the MacOS of that time was quite suitable for programmers: it didn't have the cumbersome command line of Windows, nor did it have the myriad of bugs one would encounter with X on Linux. Not to mention, back then, Windows hadn't even polished Powershell, while Linux distributions, even without a graphical interface, still had various headaches—anyone who used Arch Linux at the time can recall how its so-called rolling updates often required a complete reinstall if you went months without updating.

By contrast, MacOS had a relatively stable GUI experience along with a functional shell, making it perfect for development tasks like running git and SSH.

Apart from computers, keyboards are also an important part of a programmer's work. I owned a few mechanical keyboards early on when the market for them was still immature, with Cherry and FILCO being the top choices. I didn't give much thought to the differences between Mac and Windows shortcut keys. Even though they were functionally inconvenient, I made do.

At that time, Apple products were generally seen as: closed but user-friendly. Steve Jobs, still alive, was highly glorified. With Windows and Linux still having certain shortcomings, most people just went with the flow. If MacOS wasn't user-friendly, the problem was seen as "my" fault, not Apple's. **Apple good, people bad!**

Later, after leaving Google, the new company's development and production environments were all on Ubuntu. Those years saw the rise of Ubuntu's desktop environment, and with increasing work and life pressures, I had less leisure time, naturally shifting to Ubuntu, which I had once looked down upon—it turned out to be quite comfortable. Despite some minor issues, it was much more usable than a few years earlier.

Eventually, I transitioned to a managerial role, switching my company's development and laptop environments back to Windows. Around that time, Windows introduced WSL = Windows Subsystem for Linux, a feature that significantly improved the development environment, making Windows highly enjoyable.

Gradually, whether due to working with government departments or enterprises, I found myself opening Word more frequently, reducing my usage of Linux at work. At home, following a motherboard change that left my Linux system without a network driver, I completely abandoned it, doing all coding via VSCode and SSH in WSL, connected to another Linux server at home. Despite differences, Linux and Windows had similar enough experiences that switching between them was smooth.

For several years, time seemed to stand still. I did similar things daily, lacking the passion to tinker with different operating systems. Recently, though, I left that unexpectedly long job, joined a new company, and received another MacBook to start this new chapter.

Meanwhile, the mechanical keyboard market underwent a drastic change over those seven years.

## Apple Bad, Keyboards Bad

In recent years, the most noticeable shift in the mechanical keyboard market has been the fall of Cherry and FILCO, with domestic manufacturers driving down prices and blurring the lines between custom and mass-produced mechanical keyboards.

People who once revered Cherry's blue, brown, and red switches began discovering that keyboards could feel, sound, and even look better. New layouts, keycap materials, and personalized designs attracted new and returning mechanical keyboard enthusiasts, all at a more affordable price.

Although Cherry's keyboards still hold a spot in the high-end market, they no longer dominate.

This mirrors Apple's situation: over the years, people realized that even Apple's products were far from perfect and had many issues. However, despite losing its pedestal, Apple maintained market relevance with its strengths and advantages.

Now back to my current situation: I have a MacBook and I have a keyboard.

When I connect them—

Darn it, despite switching the F keys' default function in the system settings to prioritize F1-F12 over multimedia keys (which even works on the laptop keyboard), my external keyboard still doesn't follow suit!

I was using a VGN S99 with Anya switches, and I quite liked both its appearance and switches. This keyboard claimed to support MacOS, yet having to press the Fn key along with the F keys each time was intolerable.

After some research, I found an explanation on V2EX: Apple's F keys, function keys, and Fn key are indeed triggered differently from Windows keyboards. However, the real reason the F keys couldn't switch was that only officially certified keyboards supported this function. Other keyboards had their codes blocked by Apple, but some could simulate official codes to switch functions.

While I haven't confirmed this explanation's accuracy, it seems Apple's differential treatment of official and third-party keyboards is real. Though Apple is bad, my keyboard is also bad!

## Finding the Right Keyboard

Initially, I hoped to use Karabiner-Elements, a seemingly universal remapping software on Mac, to fix my keyboard.

However, whether due to the keyboard or software, I found that some keys could indeed be remapped—specifically, F6 to F12—but not F1 to F5.

With a busy work schedule, I couldn't afford to constantly tinker. Losing efficiency due to Fn key dependency was a real problem. Ultimately, I decided to use my company's Productivity Boost reimbursement to get a new keyboard.

At first, I considered custom keyboards. After consulting some friends, I found several major issues conflicting with my needs:

- To get reimbursed, I needed to buy from an invoice-issuing source. However, official sales for custom keyboards often sell out quickly, especially for reputable and stable models. These high-quality keyboards couldn't be bought with an invoice.
- Available custom keyboards were mostly from unknown brands and models, often non-returnable. If I ended up with a keyboard I didn't like, the time cost would be significant.
- Although most custom keyboards support QMK/VIA, which certainly allows remapping F keys on Mac, pre-sales advice was almost nonexistent. Getting a non-supportive keyboard would mean buying a useless piece of metal.
- Custom keyboards often require manual assembly, sometimes soldering, which wasn't clear in product descriptions. Without prior assembly experience and in need of an immediate solution, spending extensive time on this was unreasonable.

Considering everything, custom keyboards were more toys than productivity tools. They were fun to play with during leisure time but not suitable for plug-and-play needs.

So, I looked into certain market niches: mass-produced keyboards with some degree of customization.

## My Solution: NuPhy Halo96

First of all, this is not an advertisement.

I didn't spend much time researching, so there might be better options. Keyboard preference is highly subjective, and the undifferentiated market of ten years ago was unusual.

I'm sharing this keyboard to offer a quick solution or direction for those facing the same issue. Though my blog doesn't get many comments, I'd welcome alternative suggestions and might even try them.

Here's the key point: NuPhy's Air and Halo series products can meet the aforementioned F key remapping requirement.

The Air series' advantage is its support for QMK/VIA, allowing more flexible remapping. The downside for me is that it's a low-profile keyboard, unsuitable given my strong finger pressure.

The Halo series process exemplifies mass-produced advantages. Customer service professionally assured me that the keyboard, using NuPhy's remapping software, perfectly suited MacOS and guaranteed F key swapping. As a mass-produced product, it also had a huge edge over custom keyboards: a seven-day no-questions-asked return policy! Customer service even suggested trying it at home, promising a return option with shipping insurance if unsatisfied.

Ultimately, I chose the Halo series' 96% layout, compromising some Insert area function keys but retaining the numeric pad. I accidentally selected Cold Green Rose switches, a tactile switch. Although I stopped using tactile switches after feeling Varmilo's electrostatic capacitive switches, preferring linear switches, I decided to stick with it.

Once the keyboard arrived, the first thing I tried was the F key area, and it worked perfectly. Simply enabling the F key swap option in the system made the switch work flawlessly.

However, I quickly noticed the switches weren't quite right, realizing my selection mistake: Cold Green Rose switches were "garbage" even among tactile ones. Tactile actuation was immediate, often causing a snagging sensation with non-linear keypresses, leading to frequent missed keystrokes.

More annoyingly, even the function keys except the spacebar used these switches, significantly raising the failure rate of key combos like Cmd + Opt + X. However, the spacebar's feel was quite commendable.

Here comes an advantage of mass-produced keyboards with a custom feel: this keyboard, like many newer Chinese mass-produced ones, had swappable switches!

While writing this article, new switches and keycaps are on their way, signaling the end of my month-long keyboard ordeal.

As for my previous VGN S99 with Anya switches—it's so comfortable that it's now hooked up to my Windows system at home, replacing the SKN Qinglong 4.0.

The removed Qinglong 4.0, aside from being my game keyboard, might end up as my server keyboard, replacing an Varmilo Senling Grasswood Green switch keyboard that I plan to sell.

Typically, I'd sell it to a familiar face or in a company secondhand group lower than Xianyu's price. Although I don't intend to sell things via this blog, if you've read this far and I know you, and you're interested, reach out in the comments or privately. It's a form of fate, and keyboard blessings might grant you an even lower price.
