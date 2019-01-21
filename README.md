## Demo

[Demo link here](http://ledgy.matthewbarbara.com)

You can add URL parameter `?exit=n`.
Examples:

http://ledgy.matthewbarbara.com?exit=60000000

http://ledgy.matthewbarbara.com?exit=45000000

http://ledgy.matthewbarbara.com?exit=35000000

## Small note.

When I met your team I had good resemblances of the previous start up I worked for. On Thursday evening, when I was asked to do the challenge, I challenged myself to build a working calculator by Friday morning. Just like the good old days with my previous employer.

By the early hours of Friday morning I had a working calculator with no capping and conversions :trophy:

It was a great deja vu feeling!

## Quality of code

***UPDATE***

==============

I've started refactoring. There is still lots of work to do but its work in progress. I am doing the refactoring in a new branch.

You can see the diff's here https://github.com/metju90/ledgy-challenge/compare/major-refactor?diff=split&expand=1

==============

:warning: Warning! :warning:

Wet, nasty and not-so-nice code is guaranteed to be seen in one particular file.

I am a fond of neat, polished and well structured code and I usually put great effort into that. But given the difficulty of this challenge, the **mistake which I did**, was to literally not care about the quality of code and instead, I focus only on getting to logic working right. I explained the wrong decisions I made [in this section](#technical-problems-which-i-encountered)

I thought that when I will have a working calculator, it should not be as challenging to refactor my code. But damn, how wrong I was!

Excluding `App.js` all source code is of a good standard. But if I had to judge my own code, I would raise eyebrows when seeing the mentioned file.

If you would like to see neat solutions, check out the following:

[Ginetta's Challenge - frontend only](https://github.com/metju90/search-github-users)

[Postcode - Fullstack (including docker and database)](https://github.com/metju90/postcodes)

[R3PI's Challenge - frontend only](https://github.com/metju90/R3PI)

## Features

- **Seniority Structure: Standard**\
  The latest group of investors have precedent over others for preferred shares.

- **Dynamic settings**\
  Limited settings can be changed dynamically.
  Edit on the go and see instant results (hopefully good ones :) )

- **Multiplier**\
  From the brief and basic research which I did, and I hope I got this right, an investors can have a multiplier which would multiply his preferred shares. By default, this is set to 1.

- **Conversion option**\
  When you reach the cap, you have the option to convert the investor's preferred shares to common. If you take the option and then changes your mind, dont worry, you are one click away to revert back.

- **Tools tips**\
  Added tool tips to help you understand my reasoning.
  

## Domain knowledge

I learned what Liquidation preference is on Thursday evening. To be honest with you, I even had to go through investopedia to clarify Liquidation =)

Having said that, I may have used terms/wording which a person familiar in this domain may find it inappropriate or even worse, not logical. If by the time you are reading this you had already experience this, I am sorry. Feel free to correct where you deem is not good.

## Obstacles

Before I rolled my sleeves to start coding, I spent a around 2-3 hours trying to understand the logic and read the tutorials which you provided in your gist. This itself was challenging but I really enjoyed learning about this topic.

When I had a good understanding of whats required, I started coded and produced a working application in a relatively short time.

The logic behind this task is challenging and I did find it hard. Nonetheless I really enjoyed working on the logic.

As happens most of the time I design the UI from scratch, I found it very challenging to come up with a nice one. This was definitely the most time consuming part. I've built complex UI pages in my career but with the UI design being provided to me. After trying several designs, I've settled with one which in my opinion is not very professional. I think (and hope) its sufficient for this challenge.

## UX

UX design is an area which I consider myself better in comparison with UI. Whilst I see big room for improvement on the UI, I feel the UX is good based on this UI.

## Technical problems which I encountered

- **Not in full control of applications state**\
  It's been a while since I built an application of this scale (or bigger) without using state management libraries such as Redux.

  Numbers were changing but why and which part of the code was changing it I wasn't sure. Needles to say, not having full control of the application state is not the best developer experience one can have. Lesson learned, for non-trivial application I will ensure state management is handled better in the future.
