---
slug: becoming-an-brilliant-programmer-01
title: "Becoming an Brilliant Programmer (01): Understanding \"Not Understanding\""
authors: [sqybi]
date: 2024-03-04T23:00
tags: [technology, becoming-an-brilliant-programmer]
keywords: [software engineering, philosophy, understanding]
unlisted: false
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 4
last_translated_at: 2024-03-04T16:24:10.829Z
---

> (This article was translated by ChatGPT automatically.)

> To view other articles in the series, please use the tag to jump to the article directory page: [#becoming-an-brilliant-programmer](/blog/tags/becoming-an-brilliant-programmer/).

Yes, I'm starting a new series.

Thinking back to when I first started working in 2013, it has already been 11 years, and my annual leave has finally reached 10 days, which is quite a delightful and congratulatory milestone.

During these 11 years, I've definitely encountered numerous pitfalls. Reflecting on the past, I often faced moments of confusion: Why can't I do well? Am I strong or weak? What exactly is this so-called "career development plan"? Such questions, along with a myriad of unforeseen changes that one could never imagine while in the "ivory tower," arrived in quick succession.

When I tried to emulate those "successful" individuals, I realized that their so-called successful experiences were simply not applicable to me, leading to deeper self-doubt: Could it be that I'm truly incompetent, unable to achieve success like them?

To this day, I still feel that such "success" is not replicable. Fortunately, as I am increasingly less often addressed as "youngster," I also see a deeper understanding of this among the younger crowd.

Similarly, I do not believe that my series of articles can truly help everyone become an excellent programmer; the idea is merely a selling point. Or rather, perhaps my unnoticed blog doesn't even need a selling point; having a title is simply because an article must have one. Rather than being a guide, these contents are more like pure reflections. If you agree that a person's self is composed of all their past life experiences, you'll understand this point quite easily.

<!--truncate-->

The reason why I ultimately picked such a title includes a bit of my personal desire. In my most confused times, I often wished someone could tell me how they dealt with similar situations. And after overcoming each life challenge, I would sometimes have the thought, "Turns out, it wasn’t as tough as I thought; if only someone had given me a hint back then."

Fortunately, with more experiences like these, the more I realized how rare such opportunities can be. I have seen truly noble people who invest their time and money to understand and help a group, like my junior icedream61 (his Bilibili space: [Icedream](https://space.bilibili.com/269924695)). He spent years researching and understanding the actual conditions of students in vocational and technical colleges, hoping to help them grasp the societal reasons that prevent them from becoming so-called "good students" or landing "good jobs," to eventually overcome structural unemployment. Compared to my leisurely blogging, he is the true pathfinder. Yet even so, it is evident that his efforts do not cover groups like me from a decade ago, and there are few people like him. Yes, **such opportunities are rare and precious**.

So, I think, even if I don't have such noble ideals or the perseverance to maintain them, sharing my knowledge and perceptions is always a good thing. Especially for our generation that grew up with the internet, we have been imprinted with this mindset since childhood.

In short, due to this series of experiences, I will be releasing some not-too-long articles about things I want to discuss. The current series relates to the profession and work of programmers, but it will delve into many life reflections; later, I might talk about life-related content, which might be named "becoming an excellent person."

So let's begin our casual chat today.

## Collapse Due to Misunderstanding

### A World Constructed from Misunderstanding

I believe that I remain someone who struggles to understand others. I admire those who can empathize easily and have always been curious about how they do it—sometimes stubbornly suspecting that perhaps they don’t actually understand others, merely pretending to do so.

Unfortunately, our world is made up of countless people like me. Men are like this, and so are women; adults are like this, and so are children (maybe better?); PMs, testers, and especially programmers are like this.

And the world, or to be more specific, any matter involving cooperation between people, operates on such a chaotic underlying logic. This is the deeper principle behind the non-linear relation of man-months mentioned in "The Mythical Man-Month": the cost of communication cannot be ignored. If you ponder further on this, you may arrive at a more frightening conclusion: any software development project, once reaching a certain scale, is bound to collapse. (Of course, this isn't limited to software development, but this article only discusses this particular scope.)

### Good News and Bad News

The good news is that programmers (and all related professions, henceforth not listed repeatedly) have learned to isolate the cost of understanding through abstraction.

For example, when using GCC or Clang to compile your C++ code, you don’t actually need to understand their implementation principles or underlying designs—you just need to be familiar with their interfaces. The teams developing GCC and your team coding (what seems like) trash in C++ mostly have zero overlap. Those who have participated in compiler development or have even submitted valid issues could probably be counted on one hand, at least not including the majority of mundane programmers.

Yet based on abstracted methods, we can use some of the world’s finest tools to work effectively on our small patches of land.

Unfortunately, the bad news is worse: perhaps the world today does not know how far the abstraction-based software development can go before collapsing.

If you are familiar with front-end development, you may feel that this field has already taken a step too far down the road of over-abstraction. A plethora of abstraction-based frameworks emerge endlessly, but the same functionality might be implemented by dozens or hundreds of different frameworks; even if you have only heard of three or four, the complexity can be overwhelming. With the continual iterations of new frameworks and the branching of old ones, the ongoing learning cost is becoming unacceptable to many.

Looking at the entire programming field, this trend is also worth discussing. When people talk about what makes an excellent programmer, they often expect this hypothetical spherical programmer in a vacuum to not only be able to use various tools but also to deeply understand the principles—the deeper the better, ideally starting from how silicon is turned into logic gates on a chip. However, with the rapid development of computers over the past decades, as well as the theory based on abstraction, "to each their own" has instead become the consensus.

On one hand, it is clear that further abstraction will lead to programmers understanding other layers less and less; on the other hand, there is an expectation for programmers to understand more about other abstract layers—this is the dilemma facing the software industry today.

### Maybe It's Not a Problem

A dilemma? I think I need to retract my previous words immediately. The situation might not be as dire as that; I exaggerated.

Upon reflection, a similar complexification process occurred earlier in the scientific field. The current scientific domain is hundreds of times more complex than the singular field of software engineering, yet the same approach based on abstraction and division of labor is still feasible. Scientists learn and understand knowledge closely related to their fields while choosing to believe common views on general knowledge and continuously updating and supplementing it with the latest research findings.

From this perspective, it seems the software industry will not collapse. Hooray—

...Not so fast. This may mean that you have to begrudgingly accept this flawed reality and try to adapt to it.

## Stable Self-Perception

(Universe-level disclaimer: Based on some beliefs, perhaps TeX is an exception; but with my level of understanding, I cannot comprehend its perfection, so it is also imperfect.)

### Do Not Trust Any Software to Be Perfect

In the earlier years of my career, the most important lesson I learned was not to prematurely consider a software as perfect or sophisticated before understanding it. This actually touches upon one's understanding and stable perception of oneself. I don't know after how many repetitions of similar scenarios I gradually grasped this truth.

Facing a renowned software, tool, or framework that requires secondary development, I often don't know where to start. I might be able to quickly outline some basic principles, but they usually seem so simple that I worry: Could my thinking be wrong? How could software developed by some of the world's finest people (of course, as there are five Heavenly Kings, usually "the finest" also includes many groups) be so simple?

Consequently, I would fall into a deep anxiety, hoping someone could step forward to confirm or refute my thoughts. But as mentioned earlier, that person usually does not appear. And such anxiety further ensnares a person, making their subsequent actions timid.

My ultimate solution, or partial solution, to this problem actually came from a clearer understanding of myself. When you have gone through enough similar scenarios, you will gradually anchor yourself in the right position. You will realize that these seemingly great people actually create tools that are not perfect everywhere. They indeed have many pioneering and unrivaled works, but from most perspectives, the software they develop is not much different from our thoughts.

In other words, they too have to build their abstract layers based on many others' layers. An excellent piece of software is not excellent because it reinvented all the layers of abstraction but because it did something unprecedented on the existing layers.

:::note

It's necessary to reaffirm: This is just a personal issue I've encountered. If you've never experienced this, I celebrate for you and genuinely envy you.

But as before, I do not expect my article to help everyone in the world. If someone happens to share my problem and my words help them advance even a tiny step on the path to understanding these issues, that's already great.

Even if that doesn't happen, it's okay. After all, to step back, this series of articles is just casual chitchat to satisfy my own desire to express.

:::

### Replace Thinking with Trying

Even though my current self-awareness has helped me address the problem to some extent, this doesn't mean that someone like me can achieve the same level of self-awareness just by reading the above text. As someone who actually experiences significant mental burnout, I understand that such burnout cannot be changed by a few simple words.

:::note

Normally, internet-based MBTI classifications would refer to people like me as "I" type people. I don't agree with this categorization but acknowledge the simplicity and effectiveness of such classifications.

:::

After all, one’s inherent thought process can only be corrected by new life experiences, which most often can only be brought about by changing one’s own behavior, provided—the big premise—you agree with the view that "a person's self is made up of all their past life experiences."

As mentioned in "Bakemonogatari": One can only save oneself by oneself; nobody can save someone else. (人は一人で勝手に助かるだけ。誰かが誰かを助けることなどできない。)

I cite this phrase only out of personal preference. The glorification of cultural works within one’s own cognitive scope is a common phenomenon among programmers of our generation, so please forgive me. In fact, philosophers have long perceived this truth. Whether it’s Hegel's dialectic on the development of things or the Stoic reflection on rationality, they all reflect this point.

And the best way to change one's behavior is found in a familiar ancient saying.

Learning without thinking is labor lost; thinking without learning is perilous.

Here "learning" could mean to further study and understand, but must also include practice. Rather than dwelling on the correctness of certain matters, it's better to first accept your own cognition. If this cognition is wrong, it will be corrected someday.

In fact, this is a lesson everyone has heard since childhood: Failure is the mother of success. But previously, I merely understood it as "you must work hard even after failure to succeed." Reflecting on it now, perhaps a more important message is: Everyone is bound to encounter failure, and will continue to fail.

Just like those forever imperfect pieces of software.

## Unclear Yet Clear

I consider myself fortunate to have been able to effortlessly write down these words while thinking about the topic of "misunderstanding," rounding off to what I personally find a satisfying conclusion.

Although the above didn't specifically discuss the view I'll mention next, having only touched upon it slightly, I still want to indulge in some personal bias. I think the metaphor of AT Field in "EVA," depicting the barriers between people, is an incredibly brilliant allegory. If you trust others too much and completely lower your barriers, you will lose yourself; conversely, when you do not trust others at all, your self loses its meaning.

Interestingly, these two seemingly contradictory states usually don't appear independently, but together. At the same time, you need to find a balance between these states to survive in this world while maintaining your self.

Because I don’t assume all my readers are familiar with "EVA," I will not delve much further into this subject. Nonetheless, when someone can both be a member of the world who doesn't understand it and understand their own and everyone else's misunderstanding of the world, that person can truly begin to comprehend the world.

Initially, I considered titling this article "Sculpting Roses with Feces," a term coined by a former CTO of my company to describe the state of software engineering. After some thought, I decided that this expression, while accurate, was too flippant. Besides, when the term was first proposed, it carried some negative connotations. However, my article, while rooted in my work to minimize such situations (especially related to CI/CD and engineering), leans more towards accepting this pervasive reality as an objective fact.

After all, understanding this imperfection caused by misunderstanding is also part of the journey towards perfection.
