---
layout: default
title: Roadmap
parent: Omen
grand_parent: Products
nav_order: 4

---

# Omen Roadmap

___

Along with the upcoming launch of the Omen Guild, a revised roadmap is being prepared. This page will be updated as soon as it is available. While the early 2021 roadmap is being updated you can keep up to date by visiting the Omen channels on the <a href="https://discord.gg/4QXEJQkvHH" target="_blank">DXdao Discord</a>.

___

# Omen - Eclipse - Roadmap 2021

![](https://lh4.googleusercontent.com/BxqBzLnIPfvHsVu3U83tih4dp2I7srefB6iJxWQAEOXfxttbtjQq19xcMYeKoslKK3jZx2TnujmUv7qo8X4o7fPFgooPbin5lJZjfGqdijVpT3cSoPSRThQYMYnDv1_EuyjiHj71)

Despite Omen just being 7 months old, it quickly established itself as the first decentralised and most secure AMM based prediction market platform. With a total trading volume of more than 6 million dollars and 267 markets created, We believe Omen has a very bright future ahead. Before we are getting into the upcoming roadmap, it is important to reflect of what has been achieved according to the goals in our [Omen - Version 2](https://daotalk.org/t/omen-version-2/1571) roadmap.

## Omen Guild
- Grew to 6 Full-time contributors
    - [Kaden (react/typescript/subgraph)](https://daotalk.org/t/dev-violet-worker-proposal-31-12-2020-30-01-2020/2506)
    - [Geronimo (product management,UI/UX design)](https://daotalk.org/t/corkus-worker-proposal-16-11-2020-16-01-2021/2360)
    - [Violet (react/typescript/subgraph)](https://daotalk.org/t/dev-violet-worker-proposal-31-12-2020-30-01-2020/2506)
    - [Hexyls (react/typescript/solidity)](https://daotalk.org/t/hexyls-worker-proposal-for-16-11-20-16-12-20/2394)
    - [Roy (react/typescript)](https://daotalk.org/t/worker-proposal-pritam-roy-06-01-21-06-02-21/2495/2)
    - [Sky (BizDev)](https://daotalk.org/t/skymine-labs-draft-worker-proposal-01-21-to-02-21/2553)
- [12 Versions released](https://github.com/protofire/omen-exchange/releases) since it took ownership of the project which was developed by [protofire.io](http://protofire.io/) and [gnosis.io](https://gnosis.io/)

## What has the Omen Guild accomplished?
- Scalar market support added
- Omen on xDai with Kleros mainnet support
- Market verification process by DXdao and Kleros 
- Redesign of the Market details page:
    - Switch between currencies/markets inside the market details page
    - Show/Hide market lifecycle progress bar
    - Request verification powered by Kleros
    - Reality.eth integration which allow omen users to finalize markets
- Redesign of the Market overview page:
    - Show only verified markets on default
    - Included a market type picker for scalar and categorical markets
    - Verification source filter added
- Redesign of the Market creation/import process.
- Added [Authereum](https://authereum.com/) support.
- Automatic wrapping/unwrapping of native assets like Ether or xDAI powered by Gnosis Safe Proxy-kit
- Created Partnership with API3 to integrate Airnode-enabled dAPI/Oracle into Omen on xDai which will allow an almost instanst finalization of omen markets.([Daotalk](https://daotalk.org/t/draft-proposal-api3-data-for-omen-mvp/2500), [Ratified Proposal](https://alchemy.daostack.io/dao/0x519b70055af55a007110b4ff99b0ea33071c720a/proposal/0x3b43fb15b837345be17414f2049bfdf99694c1abfc0c83c2ca6a4b98607ac17d))


## Scaling Twofold

Eclipse

> An eclipse is an astronomical event that occurs when an astronomical object or spacecraft is temporarily obscured, by passing into the shadow of another body or by having another body pass between it and the viewer.

### Mainnet Support

The Omen guild is convinced that the Ethereum Mainnet is not the right place for Omen anymore. Network congestion and high transaction costs hinder the usage and adoption of Omen. Over the coming months Omen on Ethereum Mainnet will transition to the subdomain [main.omen.eth](https://main.omen.eth) which will always be accessible through the Omen UI. Meanwhile the root domain [omen.eth](https://omen.eth.link) will connect to xDai on default.

### xDai

Omen needs to scale now without degrading access or the user experience. We achieve that by tightly integrating xDai into Omen without the user needing to switch networks. Users only need to bridge Dai through our bridge interface([powered by STAKE bridge](https://bridge.xdaichain.com/)) and that´s it! Once that is done, a user is interacting with Omen through xDai enjoying almost instant feeless transactions. Omen on xDai will also be able to use the DXdao base on xDai to curate markets for validity and use the DXdao as cheaper alternative arbitration service compared to the Kleros arbitration service. Omen on xDai will expand the addressable market by drastically lowering the minimum amount to trade. xDai also introduces a smoother on-ramp for a casual user, no longer requiring ETH to participate.

### Arbitrum
Long-term, Omen needs to go where users and assets go. As activity begins to move away from mainnet, Layer 2 scalability solutions - those that maintain the security properties of Ethereum - are emerging as a long-term solution for many dapps. Arbitrum is a Layer 2 optimistic rollup that is EVM compatible, which means the deployment process should be simple and almost identical to the xDai deployment. Arbitrum's increased security properties means that it can have larger deposits, but maintain the speed and cost savings. Arbitrum is expected to launch on mainnet in March. Launching on Arbitrum will make Omen truly "multi-chain" and eventually make [omen.eth](https://omen.eth.link) the hub for all prediction markets.

## Timelines

### [Omen transition to xDai](https://https://github.com/protofire/omen-exchange/milestone/25)
**Release Date: 17th March 2021**

- Integrate xDai relayer service ([Link](https://github.com/protofire/omen-exchange/issues/1606))
- New UI for Connection/Account view ([Link](https://https://github.com/protofire/omen-exchange/issues/1668))
- New UI for deposit/withdraw into Omen ([Link](https://github.com/protofire/omen-exchange/issues/1680))
- Easy switch between Mainnet/xDai via Omen UI ([Link](https://github.com/protofire/omen-exchange/issues/1700))

## 2021/Q2
**April**
- Deploy Guild on Rinkeby (@Augusto is ERC-20 Guild ready?)
- [Guild - Simple Proposal](https://github.com/protofire/omen-exchange/milestone/28) (2 Weeks)
- [Guild - Market Curate](https://github.com/protofire/omen-exchange/milestone/27) (2 Weeks)


**May**
- **05/01/2021** (2 Weeks)
    - Mesa Sale OMN for DXD
    - Snapshot/Airdrop for DXD holders & Omen Users.
    - Vampire Attack for Polymarket users
- [Guild - Easy Competition](https://github.com/protofire/omen-exchange/milestone/29) (2 Weeks)
    - Guild votes on top 3 markets which will get OMN rewards bimonthly (vested)

**June**
- Mainnet Release of Guild Dashboard (2 Weeks)
    - Includes Market Curation, Simple Proposal, Competitions
- Transition reality.eth finalization process from ETH as collateral to OMN token. (2 Weeks)

## 2021/Q3 and beyond
- Token curation contract 2.0 for multi-chain world (Cross-team project?)
- Convert omen outcome tokens to ERC-20 tokens and back
- ERC-20 outcome token curation which will allow market outcomes to be traded outside of Omen.
- Native integration into a borrow/lending protocol on xDai



## Upcoming Features

### Add Limit Orders powered by Gnosis Protocol V2

![](https://lh6.googleusercontent.com/wv3T3tLzUTPw5AtqMaA6_5pzp7EeSp-5vNVcE523O6sHPs7iF6uMZKS2bgiyJStqSwIZ8j_G0dQzCFswxiGTKeGV6LdGIUuLZAm0qrXtKIP-WgUjq_GdZKQDOXZccEVRYTqLUK47)

Omen markets use an automated market maker to provide a trading venue for its outcome tokens. Providing liquidity to an automated market maker especially for outcome tokens of a prediction market is risky and its viability has yet to be proven. Therefor the Omen Guild recognizes the existantial need to add an orderbook with limit order functionality as a second trading venue. We consider Gnosis Protocol V2 as the most promising solution as it is able to leverage the existing liquidity pool of Omens automated market maker.

### Finalize scalar markets without the need of reality.eth

![](https://lh6.googleusercontent.com/vaxLTAPk-ol2jUcMKJLSrY-Ev8qry436d1_39vHu2ZToa83_O18xSX72tZCyS_7LT9QmqW_RdXlvt-FZNnnLLfmXvtODfBrpOmHw7h8Gjp0qpoD-UCeWhyI1R9FADBoWotWQk2uO)

With [Omen - Version 1.2.1](https://github.com/protofire/omen-exchange/releases/tag/v1.2.1) users are able to finalize **categorical markets** through the Omen interface without the need to visit [reality.eth](https://reality.eth.link) anymore. We need to extend this feature to **scalar markets** to provide a consistent user experience.

### Convert ERC-1155 to ERC-20 outcome tokens 

![](https://lh6.googleusercontent.com/4aadqwaTFsBj8zafcMC5_Vim9-h-Jxo_NCZ0sZKpXj5GqkKaDWVh05KgErp8_WQVeTY76ONLjOQ8xPEWEawnscM3czFZPr5VdD2SPxm2ZgzFAlwiOgc5FVJ2hji3A_o1AXkYI0D9)

Omen users are buying/selling outcome tokens with the token standard ERC-1155 powered by the [conditional token framework](https://docs.gnosis.io/conditionaltokens/). Unfortunately, the ERC-1155 token standard is not getting adopted which results in the need to provide the functionality to convert ERC-1155 tokens into ERC-20 tokens. With it, Omen markets will be able to leverage the broader Ethereum ecosystem most importantly DeFi. 

### Create/Redeem Outcome tokens in ERC-1155/ERC-20

![](https://lh5.googleusercontent.com/03SZR2qWbrulG1II-ljqLFj54vdboHK9xR2e9OPT9ZloKddgvDwv5GLF0KJcFcrG6mDjuTT36detAqPcWIjCSNaNOPOSnMpLIWRXLIfwFQ8p36jOrOS10zQhwPe9imvyqcA-qphp)


The creation of outcome tokens is currently only possible through a deposit into an Omen market by receiving pool tokens. Anyone should be able to create outcome tokens with the ERC-1155 or ERC-20 token standard. If there multiple venues for a popular market (Like https://swapr.eth.link) this will enable and simply arbitrage opportunities.

### Making Omen more Antifragile

![](https://lh4.googleusercontent.com/1PgQXlJAXFEDOVSZemfQ89fo9jaydrlzyKxs-ezj5nhnj0GtJ8iu4ROutRdhH7uXVq31_U1DC2EM_feBnxZjPt4mZZ7K5HRFzJAXcwLLqrSrqp7ydp9DARaRl05n1j6OJIO4Bb1b)

With the recent [Infura Mainnet Outage](https://blog.infura.io/infura-mainnet-outage-post-mortem-2020-11-11/) it is clear that decentralised application cannot rely only on one web3 service provider. Giving users the freedom of adding their own ethereum node and switching between nodes will make Omen more robust/antrifagile.

### DXdao market curation 



## Service Integrations

### Earn interest while providing liquidity powered by Compound [Mainnet]

![](https://lh3.googleusercontent.com/iW-dP3iweMRaQzTHJUiWZ7RQR5xdTcH3zPRpUQySLV7yRDPswNdBtGquoRV8hapLXGHrccnYSf64QSDALxNZZvNfzBLTXkRgDwesKUAu1zRQudkt-DDi4am7Tj4MEy_ov36TA7RC)

Our primary goal is to make liquidity provision more profitable and less risky. By providing a seemless integration of [Compound.finance](https://compound.finance)(borrow & lending protocol), liquidity providers will earn trading fees and additional interest simultaniously. Omen will automatically convert a base token for example Dai into cDai, the interest bearing Dai equivalent. This allows us to provide a seemless experience as users don´t need to know anything about cDai because the inteface will continue presenting everything in Dai (the base token).

### Automatically withdraw liquidity powered by Gelato [Mainnet]

![](https://lh5.googleusercontent.com/puSizf3oRz_GuPx5nhZ8CFn3b0jwYP0KvGAIyvHfnX500fR7yqZFgzlUlk-NPMfza7HIaz_bGXipP3rg9Y_vu87oVOFb2kK7m6zAO-xyahQ6R5Sbn5l_idMt5T1QW6y3Bq4AmUXO)

Integrating the [Gelato network](http://gelato.finance/) will make liquidity provision on Omen less risky. Gelato allows liquidity providers to schedule a liquidity withdrawal based on a specified condition. Initially, only the condition of time will be supported. This feature will also allow DAOs (Decentralised Autonomous Organisation) like the DXdao to safely provide liquidity on Omen markets by scheduling an automatic withdrawal to make sure liquidty will be withdrawn before the market closed.


### Instant market finalization powered by API3 [xDAI]

Omen is using reality.eth as an oracle provider which comes with a fully trustless coordination game to get the correct answer for a question/market. This coordination game (staking on the correct outcome) is not capital efficient as it requires at least one day(best case) to finalize a market with the correct answer. If a dispute arises this coordination game with an additional arbitration call could lead to weeks of locked capital. By partnering with API3, Omen can provide an instant finalization process by using dAPIs/Oracles powered by airnodes.