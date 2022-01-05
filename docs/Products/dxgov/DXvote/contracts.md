---
layout: default
title: Contracts
parent: DXvote
grand_parent: Products
nav_order: 2

---

# DXvote contracts

Much of the existing architecture DXvote was built off of and around comes from DAOstack, reading the docs there can give a more detailed background and fundamental understanding of the architecture we use
https://daostack.github.io/arc/contracts/README/

All other contracts can be found at https://github.com/DXgovernance/dxdao-contracts/tree/main/contracts 


![Wallet architecture](/assets/images/dxgov/architecture.png)

## Avatar
The avatar is as close as you can get to the main address of the DAO. It is where the main treasury sits and therefor commands the most security. Avatars are deployed on each chain we use, all with their own treasuries. 

## Controller
It can be good to think of the controller as the interface between the schemes and the avatar as it allows proposals to execute calls from the avatar. If a scheme has permissions for the controller then it also has access to the funds on the avatar. 

## Voting Machine
The voting machine, as its name suggests maintains the voting process on proposals in schemes as well as handling the holographic consensus system. 

## Permission Registry
A simple registry mapping smart contracts to permissions deciding what the wallet schemes can do.

## Reputation
The reputation contract is a key part of the DXvote system and what makes it special. The contract is very similar to a traditional ERC20 standard token with the key feature of being non-transferable. Instead of transferring, it can be burned and minted only. The avatar owns this contract and it is what currently decides voting power, this will change in gov 2.0 and it will be a part of what makes up voting power alongside other factors. 

## Wallet Schemes
You can also refer to the wallet schemes page for more detailed on this new addition to the architecture. 