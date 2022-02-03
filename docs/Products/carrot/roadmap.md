---
layout: default
title: Roadmap
parent: Carrot
grand_parent: Products
nav_order: 2

---

# Carrot Roadmap

___

The below thread can be found in the [DXdao forum](https://daotalk.org/t/current-state-of-carrot-and-v1-vision-plans/3806); written by lead developer Luzzifoss. It details how Carrot currently operates, visions of Carrot V1, and the future of Carrot. Posted on 01/17/2022.

___

## Current state of Carrot and v1 vision/plans


Hi guys, I’d like to write a bit about Carrot. The current state, my plans for the v1 and in general get some feedback from the community.

## [](https://daotalk.org/t/current-state-of-carrot-and-v1-vision-plans/3806#a-short-primer-1)A short primer

As you all know, we launched Carrot back in November. Carrot is a new product focused on incentivization, and in particular making incentivization more capital efficient, smoother, and why not, fun and exciting.  

The currently released MVP lets partners create an ERC20 token backed by some ERC20 collateral, which is then tied to a real world condition. What I mean by tied is that if the condition (the goal of the campaign) actually verifies (either in its entirety or just partially), the collateral (either all or part of it) is unlocked for token holders to redeem based on their held amount. 


The link from condition to collateral is enforced by an oracle that reports on-chain whether the condition was actually reached or not. As of now, only Reality.eth is supported (a crowdsourced oracle previously battle-tested through Omen), and the only production deployment of Carrot is on Gnosis Chain (where DXdao acts as an arbitrator if the need arises).  


We refer to the tokens created by Carrot campaigns as KPI tokens, and both scalar and boolean campaigns are supported (i.e. rewards can be unlocked in a range or all-or-nothing based on a spot condition).  


Some interest has been shown by 3rd parties and I’m overall pretty happy with the launch.  
The MVP though was just that, an MVP, and plans were always there to substantially improve Carrot through a new architecture that eliminates some major limitations.

## [](https://daotalk.org/t/current-state-of-carrot-and-v1-vision-plans/3806#carrot-v1-2)Carrot v1

The v1 of Carrot will be a major improvement over the MVP.

The most important change, and what will hopefully make the platform as future-proof as possible, is the ability for users to create multiple oracle and KPI token templates, free for use by anyone wanting to use the platform.  


This means that if anyone wants some custom functionality, they can permissionlessly go ahead, code it, and use it. It’s that simple.  


2 public registries will be used to register new oracles and KPI token templates, and anyone will be able to use any of the publicly available templates on any campaign they create, in a permissionless way. A curation process will be fundamental to verify and separate great template additions to the platform from outright malicious ones, and it will be carried out initially by the DAO, with a transition to a Carrot guild.  


This feature is very similar to the one envisioned for Aqua, but applied to oracles and KPI tokens instead of sales templates.

The possibilities with this setup are endless as far as oracles go, even moreso if you consider the potential of automated oracles. Anyone could for example develop and plug in an oracle that autonomously reads and reports Swapr TWAP info for a certain token and use the data collected by that oracle to settle a KPI token that has a goal related to the price of the token. The same example could be used for TVL-based oracles or really anything else that can be coded and read on-chain. 


The full potential of this vision can only be realized through the development of a decentralized keeper network platform available to poke these oracles periodically though, so that they can autonomously register and report on-chain data in a trust-minimized way. I’m currently working on that kind of platform and Carrot will seamlessy integrate into this additional product.

As an example of the flexibility and potential of kind of setup, it’s a possibility for us to easily and instantly make Carrot compatible with Chainlink oracles through a simple adapter that can be added as an oracle template. That’s it!

As for KPI tokens templates, the possibilities here are again truly endless. The KPI token can now have any unlocking logic that can be coded on the EVM and any possible shape or form. We could have ERC721/ERC1155 KPI tokens (KPI tokens as NFTs!), step-based unlocking, a curve-based, non-linear unlocking over a range, or even different types of collaterals (no ERC20 constraints) etc etc. All this can be achieved through the development of a custom template.

This amount of flexibility will hopefully lead to creativity and people coming up with new and innovative usages for the platform. One of the goals of this development is in fact to make the platform hackable (in the good sense obviously) to the maximum by anyone, and in order to make this a reality, good docs and SDKs will be provided together with the actual product. DXdao could also fund the development of different frontends to increase decentralization further and avoid a potential single point of failure (see the Liquity model).

The platform will initially ship with a single, retro-compatible ERC20 KPI token template, and a single, retro-compatible oracle template.

The KPI token template itself is a pretty big improvement over the current one. It will:

-   Support multi-collateral ERC20 tokens.
-   Support multiple conditions (and oracles) on a single KPI token (multiple tokens had to be previously created to achieve the same result, unless conditions could be encoded in a single Reality.eth question, not without a loss on flexibility though).
-   On multi-condition KPI tokens, Carrot will let the campaign creator manage the logical relationship and weights of each condition. 2 types of logical relationships will initially be available: OR and AND. If 2 or more conditions are in an AND relationship, and one of the 2 does not verify, all the collateral will be sent back to the campaign’s creator, regardless of the outcome of the other condition, and the related KPI tokens will become worthless. If 2 or more conditions are in an OR relationships, weights can be assigned to them, and collateral will be unlocked depending on which conditions actually verify and which don’t. If for example we have a KPI token with 2 conditions A and B, both with a weight of 1, and only A actually verifies, 50% of the collateral will be unlocked for the KPI token holders to redeem, while the other 50% will be sent back to the campaign’s creator. In the same scenario, but with weights set to 2 for A and 1 for B, roughly 66% of the collateral will be unlocked for users to redeem, while the remaining 33% will be sent back to the campaign creator. This allows for unprecedented fine-grained control over the campaigns conditions/rewards for any Carrot campaign creator and enhanced efficiency.
-   Support a minimum payout, guaranteed to be given out to user even if the goal is not reached (it can just be set to 0 in case the campaign creator is not interested in the feature).

As for the oracle, it works in basically the same way the current one does, i.e. it uses Reality.eth and supports custom arbitrator/parameters (such as question timeout, expiry etc).