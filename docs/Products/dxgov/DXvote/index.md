---
layout: default
title: DXvote
parent: DXgov
grand_parent: Products
nav_order: 1
has_children: true
---

# DXvote

___

## Table of contents
{: .text-delta }

1. <a href="{% link docs/Products/dxgov/DXvote/holo.md %}" target="_blank">Holographic Consensus</a>
2. <a href="{% link docs/Products/dxgov/DXvote/gov2.md %}" target="_blank">Governance 2.0</a>
3. <a href="{% link docs/Products/dxgov/DXvote/tehCache.md %}" target="_blank">Teh Cache</a>
4. <a href="{% link docs/Products/dxgov/DXvote/wallet-schemes.md %}" target="_blank">New Wallet Schemes</a>
5. <a href="{% link docs/Products/dxgov/DXvote/hashing.md %}" target="_blank">Hashing</a>
6. <a href="{% link docs/Products/dxgov/DXvote/dev-env-setup.md %}" target="_blank">Dev Environment Setup</a>
7. <a href="{% link docs/Products/dxgov/DXvote/contracts.md %}" target="_blank">Contracts</a>

___

<a href="https://dxvote.eth.link" target="_blank">DXvote</a>, our governance application, is responsible for interfacing with the smart contracts that keep our DAO and treasury safe and well governed. 
DXvote is all about maximal decentralization and replaces the legacy alchemy interface in favour of our own. 

The application was built by Augusto and is now being built and maintained by DXgov, a full time DXdao squad dedicated to building governance tools and platforms - read more here (link). 
Being our own open source implementation we have a lot more control and flexibility over our own governance.

Due to the maximally decentralized nature we have a novel caching solution (link - teh cache) to avoid dependency upon external services for application data. Due to this the application may be slower at certain times, we are working to improve this, but please be patient while the app is being continuously improved. 

Anyone can make proposals on DXvote. Proposals have descriptions explaining in detail why and what the proposal aims to do, it also contains actions which can be anything on chain; transferring tokens, updating applications, minting REP.

Anyone can predict through staking DXD/GEN tokens on whether a proposal is going to pass or not. This helps guide the collective voting process by sorting and prioritizing the proposals.

Currently, only REP holders can vote on proposals. DXdao is, however, finalizing its Governance 2.0 initiative, which will give on-chain voting power to both DXD and REP holders that stake DXD in DXdao’s governance contract, lock liquidity on Swapr, stake ETH, or stake DXD in an Omen prediction market.
