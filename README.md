
This software provides a solution for the following problem:

----

When a startup closes a new financing round (called a Series A, B, C, and so on), a new share class with preferred rights is usually created. These protect new investors in case the company gets sold at a lower valuation than the current financing round (while founders and employees might still get a pretty nice return). They are called liquidation preferences. When the company is sold (called an “exit”), the money of the exit has to be divided among all shareholders according to these liquidation preferences.

The basic rules are:

#### 1× non-participating

The investor gets paid back 1× their originally invested amount, nothing else. The rest is divided among all the *other* shareholders according to their ownership in the company (this is called “pro-rata”).

Of course, this could also be 2× or even 10×. But let’s keep it simple.


#### 1× participating, uncapped

First, the investor receives 1× their invested amount. Then, the rest is divided pro-rata among all shareholders, including the investor.


#### 1× participating, 2× cap

Same as uncapped, but when dividing the rest pro-rata the investor can only get 2× their invested amount. The 1× return *plus* the pro-rata distribution may not exceed 2× their original investment.


#### Conversion to Common

Every investor has the right to ignore the liquidation preference and convert to Common shares instead.

_Example:_ An investor buys 20% of a company for $1m with a 1× non-participating liquidation preference. If the company gets sold for $3m, the investor receives $1m, the remaining $2m is divided between all the others. If a company is sold for $6m, the investor converts to Common shares and gets their $1.2m share.

_Hint:_ The uncapped participating preference never converts because it would always result in a worse deal for the investor.

#### Stacking

The term “waterfall analysis” comes from stacking several liquidation preferences. If there are several financing rounds, each new round takes precedence over the previous. Thus, if there is a Series A, Series B, and Series C, in an exit one starts with the Series C, then B, then A, and then all Common shares. The proceeds from the exit are distributed like a multi-stage waterfall. (SpaceX is already in their Series I.)


## The Challenge

The goal of this challenge is to write an algorithm that can compute the return for each shareholder, given an exit value and a cap table with multiple stacked liquidation preferences.

> Write a function that takes the exit price and the following cap table data as input and outputs a cash distribution for each shareholder:
> ```
> Share class,# shares,Invested [$]
> Common,1000000,0
> Preferred A,200000,900000
> Preferred B,300000,2100000
> Preferred C,1500000,15000000
> ```
> Give results for the following exit values (in $): [25m, 40m, 50m, 70m, 39m, 47m]

For simplicity, one shareholder is equal to one share class. Thus, the ownership would be:
* **Founders:** 33.33%
* **Series A Investors:** 6.67%
* **Series B Investors:** 10%
* **Series C Investors:** 50%

The founders own Common shares with *no liquidation preference*. The Preferred share classes each have a *1× participating preference with 2× cap*. Preferred C has the highest priority, Preferred A the lowest.

###### A Note on Difficulty
To find a solution that handles all cases correctly is hard. Just start with the easy ones and see how far you can get. If your solution is incomplete, that’s totally fine for us.

###### A Note to Frontend Developers
We are excited to see your frontend skills! Show us a nicely designed UI in a modern framework. Give us a glance at your abilities to work with CSS, splitting a UI into components, or using cutting-edge techniques like React hooks.


#### Examples

If the company is sold for *$60m*, all shares convert to Common shares, liquidation preferences will be ignored and returns would be:
* **Founders:** $20m
* **Series A Investors:** $4m
* **Series B Investors:** $6m
* **Series C Investors:** $30m

Let’s see what happens if the company is sold for $25m: The investors receive their 1× liquidation preference. The total is $18m, the remaining $7m are distributed pro-rata to all shareholders (that’s participation). So we get:
* **Founders:** $2.33m (33.33% of $7m)
* **Series A Investors:** $0.9m + $0.47m (6.67% of $7m)
* **Series B Investors:** $2.1m + $0.7m
* **Series C Investors:** $15m + $3.5m

If the company is sold for *$35m*, the cap comes into play. If computed as before, the Series A shares would get $0.9 + $1.14m (6.67% of $17m). That’s too much, the cap is 2× or $1.8m. To solve this, we give $1.8m to the Series A shares and distribute the remaining $16.1m pro-rata to all other shareholders. This gives us:
* **Founders:** $5.75m (35.71% of $16.1m)
* **Series A Investors:** $0.9m + $0.9m (2× cap)
* **Series B Investors:** $2.1m + $1.725m (10.71% of $16.1m)
* **Series C Investors:** $15m + $8.625m (53.57% of $16.1m)

At *$45m* we observe the first conversion to Common shares. Preferred B has reached the cap and gets a fixed $2.1 + $2.1m. Preferred A could get $1.8m using their liquidation preference. However, if they convert to Common and ignore their preference, they end up with more. The liquidation preferences sum up to $19.2 and distributing the remainder we end up with:
* **Founders:** $9.56m (37.04% of $25.8m)
* **Series A Investors:** $1.91m (7.41% of $25.8m)
* **Series B Investors:** $2.1m + $2.1m (2× cap)
* **Series C Investors:** $15m + $14.3m (55.56% of $25.8m)

As these examples demonstrate, liquidation preferences can get really messy. And that’s why lawyers charge a lot of money to compute these in Excel.

#### Further Reading
* https://www.seedinvest.com/blog/startup-investing/liquidation-preferences
* https://en.wikipedia.org/wiki/Liquidation_preference
* https://medium.com/@CharlesYu/the-ultimate-guide-to-liquidation-preferences-478dda9f9332

