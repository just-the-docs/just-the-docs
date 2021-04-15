---
layout: default
title: Mainnet Multicall Token Order
parent: Alchemy
grand_parent: Governance
nav_order: 1
---

# Mainnet MultiCall Token Orders

___

## Using MultiCall Scheme on Mainnet to Initiate an Token Order on Gnosis Protocol

### Important Note: This is for DXdao on Mainnet
⠀

**Steps**:

1) On Mainnet, go to DXdao’s GenericSchemeMultiCall plugin [here](https://alchemy.daostack.io/dao/0x519b70055af55a007110b4ff99b0ea33071c720a/scheme/0xda346ede8c60016d80a59642744407a5bf77392c259e584e8c8202705c4618a2).

2) Click “ **+ New Proposal**” button.

3) Enter “**Title**” and “**Description**”.

4) In “ * **Contract Address**” field, choose the GnosisProtocolRelayer contract from the drop down list.
**0x30AAD48F5eA5e8b2277612eB2A375fC173bB049e**

The contract can be found here on [Etherscan](https://etherscan.io/address/0x30AAD48F5eA5e8b2277612eB2A375fC173bB049e#code).



![](https://lh5.googleusercontent.com/JmktnUK2SPyxsjISDoNozYxCFZOW469i6X5v-jmHb03hDSkpAzU2Z829B_dHTbUkAUpDPUvIOBU_7R8YKoCJgtpyOvBlpiHNGDAIsP5SlyuFfl00hVhxXw0EIjaNq6iLop1NfLOe)

  

6) In “ * **Method**” field, choose:  
*orderTrade (tokenIn: address,tokenOut: address,tokenInAmount: uint128,tokenOutAmount: uint128,priceTolerance: uint256,minReserve: uint256,deadline: uint256,factory: address)*

![](https://lh6.googleusercontent.com/erwQIa0QYF229pV4H4JU04bfPkynF9goIeEMk2xr3ZKcNguKpYExLuYSkXbIsWjl8vxtxme2rJuN6OiMyk2-Gkq5mc8gwGEDVfcaXcQ8pRn5uedgkAOfR3lNH5tbjUFSmCzyQm9d)

  

7) Enter all necessary fields:

This trade example is to enter an order to trade 5 ETH for at least 6,250 DAI, allowing for a 2% slippage from the Oracle Price.

  

Enter what is in **BOLD**.

  

To begin, enter the “xDAI Value” that is to be sent as part of the proposal:

In this case 5 ETH, entered as: **5**

  

Contract fields:

TokenIn: **0x0000000000000000000000000000000000000000** (ETH)

TokenOut: **0x6b175474e89094c44da98b954eedeac495271d0f** (DAI)

TokenInAmount: **5 000000000000000000**

MinAmountOut: **5000 000000000000000000**

PriceTolerance: **20 000** (2%)

MinReserve: **20000 000000000000000000**

Deadline: **1612958400** (February 10th)

PriceOracle: **0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f** (Uniswap Factory)

Screenshot of exact field entries:

![](https://lh5.googleusercontent.com/wVSwNjABRwwOTfgEm0U3FiBYvAmh4CPxOyECvQBuxP1UIuzIWaIqRWPH1pWLEGu_Rm6Q0qRxRbPNdJT3qKZ861I6dnnDFj6ccG4iQ0Qb0r-MU_ylqWH0ADKJ-inZiJ3BcqicFleh)


8) Click the “Submit Proposal” button, and “Confirm” the MetaMask transaction. 
⠀
Your proposal will show in “Regular Proposals”. You will see a blinking **Red** warning that the proposal is “ **> Sending 5 ETH <** ” so that it is very clear this multicall proposal is sending funds.

  

![](https://lh3.googleusercontent.com/0ICxl8PF5eQp524sciAN-ave-Di_xARxNGyePNu-adZW67j27CgyUI_ljO7MT5iINcyP5Wuz2wSmQ_eni8GMFyVtd94A-bkrZxZC2oYsPNb9KQ39i6vK9fQS4aKwAlJ5aSfLEEsm)

  
  
  

9) That’s all folks!