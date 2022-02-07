---
layout: default
title: Dev Environment Setup
parent: DXvote
nav_exclude: true
---

## Setup
- `yarn`
- `yarn start` - Starts DXvote locally but with actual networks configured (mainnet, xdai, arbitrum, rinkeby) this is fine for most tasks but requires tokens be acquired, on anything other than rinkeby and xdai this has real cost
- `yarn dev` Starts DXvote with the actual networks as well as spinning up a local blockchain with preset proposals for testing (more difficult to run) PK for wallets will be logged when running the application to test with

## Configs
Check each individual network config file for specific contract addresses

## Rinkeby
Mainnet's testnet with DXvote deployed
- Use a rinkeby faucet for testnet ethereum
- Get testnet DXD from dxtrust.eth.link

# Arbitrum / Arbitrum Rinkeby
Real L2
- To get assets on arbitrum or its testnet the easiest method is bridging
- Native ethereum or rinkeby assets can be bridged

## xDAI / Gnosis Chain
Although not a testnet we can often use xDAI for testing purposes just before production due to the cheap fees, usually only costing a fraction of a cent. For new joiners if you ask we can send you some initial XDAI to get started transacting on the network. 