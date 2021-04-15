---
layout: default
title: xDai Multicall Token Order
parent: Alchemy
grand_parent: Governance
nav_order: 2
---

# xDai MultiCall Token Orders

___

## Using MultiCall Scheme on xDai Chain to Initiate a Token Order on Gnosis Protocol

  

### Important Note: This is for xDXdao on xDai Chain
⠀

**Steps**:

1) On xDai Chain, go to xDXdao’s GenericSchemeMultiCall plugin [here](https://alchemy.daostack.io/dao/0xe716ec63c5673b3a4732d22909b38d779fa47c3f/scheme/0xbcfb334e74c4c6161b4bb67b9de23b42034bfe0d0a2f0a59e95f58c923a1e90d).

2) Click “ **+ New Proposal**” button

3) Enter “**Title**” and “**Description**”

4) In “**Add custom contract**” field, paste in the GnosisProtocolRelayer contract:
**0x0B0704f4F7813fA86d0DCc74E78E8447adB5Dbd7**

The contract can be found here on [BlockScout](https://blockscout.com/poa/xdai/address/0x0B0704f4F7813fA86d0DCc74E78E8447adB5Dbd7/transactions).


You will be notified of “**Contract added successfully!**”

  

5) In “ * **Contract Address**” field, choose the same contract:

“Unknown name (0x0B0704f4F7813fA86d0DCc74E78E8447adB5Dbd)”

![](https://lh4.googleusercontent.com/Wf2bLmIBf6mVLETY2pSlCojjZ9SrX2c0iPOF7M-J-O0p2lgmQaWDR1EIuncDRju01eWcBIJ9Goie9Qeyg_XyXllDMvlH3NYmr_GUoTCVdQ18MXALxyYl0ReLc1O11RqC0yPJPOUt)

  

6) In “ * **Method**” field, choose:  
*orderTrade (tokenIn: address,tokenOut: address,tokenInAmount: uint128,tokenOutAmount: uint128,priceTolerance: uint256,minReserve: uint256,deadline: uint256,factory: address)*

![](https://lh6.googleusercontent.com/5--K7RPLzPt72kvqKq0fv698Zw874vM0jEVCJIm1sIBrRtOg3DkGKzAGZp98RUAt2ysTxqXZivKNMWvOiU86yDJokEGlqx5H9xFd1DsDZfYMzy2HVSr2YNWQjHLYc52VgkS-w9Pg)

  

7) Enter all necessary fields:

This trade example is to enter an order to trade 300 xDAI for at least 17.1 STAKE, allowing for a 2% slippage from the Oracle Price.

  

Enter what is in **BOLD**.

  

To begin, enter the “xDAI Value” that is to be sent as part of the proposal:

In this case 300 xDAI, entered as: **300**

  

Contract fields:

  

TokenIn: **0x0000000000000000000000000000000000000000** (xDAI)

TokenOut: **0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e** (STAKE)

TokenInAmount: **300 000000000000000000**

MinAmountOut: **17 100000000000000000**

PriceTolerance: **20 000** (2%)

MinReserve: **20000 000000000000000000**

Deadline: **1612051200** (January 31st)

PriceOracle: **0xA818b4F111Ccac7AA31D0BCc0806d64F2E0737D7** (Honeyswap Factory)

  

*Screenshot of exact field entries:*

  

![](https://lh3.googleusercontent.com/freEh_vHuRih3uCl5F7j-NMFntfjXlOdwnEDSxHX2vVrI0oMEL2QdH9xMzv9qTxDP9yoBzciu3QaAsHodB_Al7wBdvuG3l_BCfjpaX72K7soTmBc-10Teu4apzKqR9ezYdoGGdQ6)

  
  
  

8) Click the “Submit Proposal” button, and “Confirm” the MetaMask transaction.

Your proposal will show in “Regular Proposals”. You will see a blinking **Red** warning that the proposal is “ **> Sending 300 xDAI <** ” so that it is very clear this multicall proposal is sending funds.

  

![](https://lh4.googleusercontent.com/ywViQvkI8dqN6JS9I6LQ-rB4P-Zd9DbxOs5ZiVveYhzGOFEXy3SYW0j24iY08GCrAmRrXGe04bHAyMLhaF5zjeH0HUWqQJOy7JfaPtK3MNLoYGZhYtA_euVCXf5hpAAbnepH3MXz)

  
  

9) That’s all folks!