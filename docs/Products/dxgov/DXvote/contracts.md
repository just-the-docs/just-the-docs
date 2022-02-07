---
layout: default
title: Contracts
parent: DXvote
nav_exclude: true

---

# DXvote contracts

Much of the existing architecture DXvote was built on comes from DAOstack, reading the docs there can give a more detailed background and fundamental understanding of the architecture we use
https://daostack.github.io/arc/contracts/README/

All other contracts can be found at https://github.com/DXgovernance/dxdao-contracts/tree/main/contracts 


![Wallet architecture](/assets/images/dxgov/architecture.png)

## Avatar
The avatar is as close as you can get to the main address of the DAO. It is where the main treasury sits and therefor commands the most security. Avatars are deployed on each chain we use, all with their own treasuries. 

- Mainnet - 0x519b70055af55a007110b4ff99b0ea33071c720a
- Gnosis chain - 0xe716EC63C5673B3a4732D22909b38d779fa47c3F
- Arbitrum - 0x2B240b523f69b9aF3adb1C5924F6dB849683A394

## Controller
It can be good to think of the controller as the interface between the schemes and the avatar as it allows proposals to execute calls from the avatar. If a scheme has permissions for the controller then it also has access to the funds on the avatar by proxy. 

## Voting Machine
The voting machine, as its name suggests maintains the voting process on proposals in schemes as well as handling the holographic consensus system. 

## Permission Registry
A simple registry mapping smart contracts to permissions deciding what the wallet schemes can do.

## Reputation
The reputation contract is a key part of the DXvote system and what makes it special. The contract is very similar to a traditional ERC20 standard token with the key feature of being non-transferable. Instead of transferring, it can be burned and minted only. The avatar owns this contract and it is what currently decides voting power, this will change in gov 2.0 and it will be a part of what makes up voting power alongside other factors. 

## Wallet Schemes
With new wallet schemes we have the ability to:
- Abstract funds away from avatar treasury
- Each scheme has the ability to send funds only from 
- Configurable vote params mean more specific security for specific use cases
- More configuration
- We can set limits for example on maximum mintable REP per proposal
- More permissions
- We can dial in exactly what permissions to send and interact with contracts we want specific schemes to have

You can also refer to the [**wallet schemes page**]({% link docs/Products/dxgov/DXvote/wallet-schemes.md %}) for more detailed on this new addition to the architecture.