---
layout: default
title: DXvote
parent: Governance
nav_order: 2
has_children: true
---

# DXvote

___

<a href="https://dxvote.eth.link" target="_blank">DXvote</a>, our governance application, is responsible for interfacing with the smart contracts that keep our DAO and treasury safe and governed. 
DXvote is all about maximal decentralization and replaces the now deprecated alchemy interface in favour of our own. 

The application was built by Augusto and is now being built and maintained by DXgov, a full time DXdao squad dedicated to building governance tools and platforms - read more [**here**]({% link docs/Products/dxgov/index.md %}). 
Being our own open source implementation we have a lot more control and flexibility over our own governance.

Due to the decentralized nature we have a [**novel caching solution**]({% link docs/Products/dxgov/DXvote/tehCache.md %}) to avoid dependency upon external services for application data. Due to this the application may be slower at certain times, we are working to improve this, but please be patient while the app is being continuously improved. 

Anyone can make proposals on DXvote. Proposals have descriptions explaining in detail why and what the proposal aims to do, it also contains actions which can be anything on chain; transferring tokens, updating applications, minting REP.

Anyone can predict through staking DXD/GEN tokens on whether a proposal is going to pass or not. This helps guide the collective voting process by sorting and prioritizing the proposals.

Currently, only REP holders can vote on proposals. DXdao is, however, finalizing its Governance 2.0 initiative, which will give on-chain voting power to both DXD and REP holders that stake DXD in DXdao’s governance contract, lock liquidity on Swapr, or stake DXD in an Omen prediction market.

## Glossary

**On-Chain Voting** DXvote requires an ethereum address to incur REP on and vote. The Ethereum address is where these parameters are stored (not where the protocol itself is). Voting occurs on chain with on chain outcomes. 

**Queued Vote Period Limit** The amount of time proposals can queue for

**Boosting** Anyone can boost a proposal by staking GEN/DXD to show confidence in the proposal’s passage. Proposals that are boosted receive a shorter vote time. Once a proposal is boosted there is a pending period before boosting activates. Once activated to proposal will pass if no one votes against it. Voting on boosted proposals also does not lock REP. 

**Proposal Reputation Reward.** ETH addresses may claim REP for making proposals that pass. (only on some schemes/chains)

**In queue** If not boosted then the state of an active proposal is "In queue". Voting on these proposals locks REP which must be redeemed when finished. If voting on lots of in queue proposals REP can quickly be locked and power in new proposals diminished. 

**Quorum** The defined percentage required for a proposal to pass - generally 50%