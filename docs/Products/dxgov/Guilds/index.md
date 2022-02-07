---
layout: default
title: Guilds
parent: DXgov
grand_parent: Products
nav_order: 2
has_children: true
---

# Guilds

___

## Table of contents
{: .text-delta }

1. <a href="{% link docs/Products/dxgov/Guilds/GuildsvsDAOvsGovernance2.0.md %}" target="_blank">Guilds vs DAO vs Governance 2.0?</a>
2. <a href="{% link docs/Products/dxgov/Guilds/competition-scheme.md %}" target="_blank">	Competition Scheme</a>
3. <a href="{% link docs/Products/dxgov/Guilds/free-sig-voting.md %}" target="_blank">Free Signature Voting</a>

___

<a href="https://guilds.eth.link" target="_blank">Guilds</a> are our minimal governance solution. These DAOs fit into the existing liquid token governance model popular in the space and familiar to most. Normal ethereum tokens are locked/staked in return for voting power. 
Guilds offer far more decentralization due to being managed on-chain but with the user experience voters have come to expect with free signed voting, automated execution of actions and more. 

This doesn't solve any major governance issues but does push the space into a more decentralized form of governance necessary considering the amount of liquidity and increased importance of the space as a whole.

Guilds also act as a way for new DAOs to begin learning how to run a real DAO, getting used to the community, operations, etc. This can then lead to a more advanced DAO that would utilise governance 2.0.

The guild **executes previously authorized functions** to smart contracts after a proposal action to execute that function reaches the **minimum amount of votes** using **locked tokens as voting power** after a **period of time**.

- The guild can execute only allowed functions, this means that if you want to call function X to smart contract P you will need to first submit a proposal to allow the execution of function X to smart contract P.

- A guild proposal can have none or multiple actions, each proposal action is a list of ethereum calls, that can execute functions and transfer value. <a href="https://guilds.eth.link" target="_blank">Read more</a>

- The voter can set his vote on a decision only once, the action voted cant be changed, only the voting power can be increased.

- The voting power in the guild is based on the ERC20 token balance **locked by the voter**, that means that the tokens need to be locked for a minimum period of time in order to be used as voting power.

- The tokens locked are held in a token vault, a smart contract owned and controlled by the guild.

- A minimum amount of voting power can be required to create a proposal.

- The voter can vote on multiple proposals at the same time using different amount of voting power for each of them.

- The voter can sign a vote that can be executed by other account on his behalf.

- When a proposal is created it enters the voting period. Once the voting period passes if the is no proposal action with enough votes to execute, it will be rejected. If it has enough votes to execute and executes successfully during a the execution period of time, it will be finished successfully. If during that execution period of time the proposal action cant be executed it will be set as failed and wont be able to be executed again once the execution time ends.

- The guild can be configured to automatically pay the voting costs back to the voter, for this the vote gas a max gas price to be use for vote refund needs to be set.

- Each proposal has a title and a content hash that can be used to refer off-chain information.


## Use cases:
- ERC20 DAO
- Multisig replacement

## Current partners:
- Augur

## Links
- Smart contract repo
- Frontend repo