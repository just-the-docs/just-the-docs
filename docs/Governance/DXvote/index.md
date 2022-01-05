---
layout: default
title: DXvote
parent: Governance
nav_order: 4
has_children: true
---

# DXvote

___

<a href="https://dxvote.eth.link" target="_blank">DXvote</a>, our governance application, is responsible for interfacing with the smart contracts that keep our DAO and treasury safe and governed. 
DXvote is all about maximal decentralisation and replaces the now deprecated alchemy interface in favour of our own. 

The application was built by Augusto and is now being built and maintained by DXgov, a full time DXdao squad dedicated to building governance tools and platforms - read more here (link). 
Being our own open source implementation we have a lot more control and flexibility over our own governance.

Due to the maximally decentralsied nature we have a novel caching solution (link - teh cache) to avoid dependency upon external services for application data. Due to this the application may be slower at certain times, we are working to improve this, but please be patient while the app is being continuously improved. 

Anyone can make proposals on DXvote. Proposals have descriptions explaining in detail why and what the proposal aims to do, it also contains actions which can be anything on chain; transferring tokens, updating applications, minting REP.

Anyone can predict through staking DXD/GEN tokens on whether a proposal is going to pass or not. This helps guide the collective voting process by sorting and prioritizing the proposals.

Currently, only REP holders can vote on proposals. DXdao is, however, finalizing its Governance 2.0 initiative, which will give on-chain voting power to both DXD and REP holders that stake DXD in DXdao’s governance contract, lock liquidity on Swapr, or stake DXD in an Omen prediction market.

## Alchemy Voting Parameters

Alchemy created the Genesis Protocol, which is an implementation of holographic consensus as a smart contract on the Ethereum blockchain.

**On-Chain Voting.** Alchemy requires an ethereum address to incur REP on and vote. The Ethereum address is where these parameters are stored (not where the protocol itself is).

**Activation Time.** Represents that date and time, represented in Unix time, when proposals can be submitted.

**Queued Vote Period Limit.** A non-boosted proposal is open for voting for 21 days.

**Boosting.** Anyone can boost a proposal by staking GEN to show confidence in the proposal’s passage. Proposals that are boosted receive a shorter vote time of seven (7) days. Once a proposal is boosted, the proposal’s vote time will shorten after 24 hours, if no one stakes against the proposal’s passage.

**Proposal Reputation Reward.** ETH addresses may claim REP for making proposals that pass.

**Pre-Boosted Vote Period Limit.** DXdao currently has a pre-boosting period of one (1) day, which is the length of time that a proposal must maintain a confidence score (upstake divided by downstake) higher than the boosting threshold to become eligible for boosting.
