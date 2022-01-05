---
layout: default
title: Competition Scheme
parent: Guilds
nav_order: 4
has_children: true
---

# Competition scheme

In guilds we have the concept of actions. A single action is a list of ethereum calls that can be executed. In a single proposal we can have a number possible actions that act as different outcomes of a proposal.

The standard voting model most users are familiar with is a binary, yes or no vote. This can be represented in guilds as a proposal with 2 actions, one which can execute any number of ethereum calls and one which does nothing. 

Singular action proposals can also be made, in this case to vote against the proposal a user simply would not vote and the vote would have to pass a high quorum level. 

Proposals with no actions would be what we consider "Signal votes" and would have no underlying effect on the blockchain, relying on the trust of someone to honour the proposal. 

If a proposal were to have 10 actions all with different outcomes or amounts of funds being sent then the action that receives the most votes would win and be executed so long as it passed the required quorum specified by the guild. 

---

Example competition proposal

Whichever action here gained most votes (& > quorum) would be executed

ACTION 1 : 
  - Send 10,000 DAI to rossdev.eth

    AND

  - Mint NFT to rossdev.eth

OR

ACTION 2 :
  - Approve 30 DXD to Vesting Factory

    AND

  - Create vesting contract for rossdev.eth for 30 DXD

OR

ACTION 3 : 
  - Do nothing