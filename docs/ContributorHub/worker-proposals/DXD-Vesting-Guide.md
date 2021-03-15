---
layout: default
title: DXD Vesting Guide
parent: Worker Proposals
grand_parent: Contributor Hub
nav_order: 3
---

## DXD Vesting Contract Creation

  

The below step-by-step instructions outline the detailed process for a DXdao contributor to create a DXD Vesting contract to be used with a worker payment.

  

This walkthrough explains how to use Etherscan and MetaMask to help accomplish the task.

  

### How it works

1.  Create your own unique token vesting contract with the desired parameters calling the create function in the TokenVesting Factory
    
2.  Send the DXD tokens via Alchemy proposal to your token vesting contract
    
3.  Claim the tokens till the vesting ends. Beware that you will have to wait for the cliff time to be reached and that the vesting might be able to be revoked by the organization.
    

  

### What you will need:

1.  Your ETH account where you will eventually receive the vested DXD tokens
    
2.  The start time in format of unix timestamp
    
3.  The duration of the cliff period in seconds
    
4.  The total duration of the vesting in seconds
    
5.  If your contract can be terminated by the DXdao or not
    

  

[*Useful tool for Unix TimeStamp Conversion*](https://www.unixtimestamp.com/index.php)

  
  

### Current parameters for DXdao full-time contributors

1.  Your ETH account where you will eventually receive the vested DXD tokens.

	`Example: 0xed6fA573B2ddB34F6a9a6941b53f7833bF283b02`

2.  The start time in format of unix timestamp = The start date of your Worker Proposal

	`Example: Start date of 11/01/2020 @ 12:00pm (UTC) is 1604232000`

3.  The duration of the cliff period in seconds = 1 year from Start Date

	`Example: If Cliff date of 11/01/2021 @ 12:00pm (UTC) is 1635768000, the cliff duration is 1635768000 - 1604232000 = 31536000 seconds`

4.  The duration of the vesting period in seconds = 2 years from Start Date

	`Example: If End date of 11/01/2022 @ 12:00pm (UTC) is 1667304000, the cliff duration is 1635768000 - 1604232000 = 63072000 seconds`

5.  If your contract can be terminated by the DXdao or not. 

	`Currently, the input would be “false”`
    

  

## Steps to follow:

### 1) Navigate to the [TokenVesting Factory contract on Etherscan](https://etherscan.io/address/0x9a75944ed8b1fff381f1ebf9dd0a75ea72f75727#writeContract).

### 2) Click “Connect to Web3” and connect using MetaMask.

In “1. Create”, you will see the following fields:

![](https://lh4.googleusercontent.com/Snsrz7KhGzAGVDPr3F6DnRKCnNkx8jcnOROC_GLMFIt5gNHgOdvsgKMfW-JGosz2BkLLg6fIgjqfMVLqBsQ-V253NILzKO1svq_H1Pm-DtFBxILtQlj9rDfildDzpViVRFw9pbqs)

### 3) Fill in the fields with your calculated inputs.

Using the example inputs:

![](https://lh4.googleusercontent.com/yghh41y6BQOc1M6abpZoIIKGEr3slG7TPtwAsccU8qgG8a_37sA8j0GpvFdOVm4JudJb2ET1UGFU5x5Rf1lwxqFNZ9vILfPMlrzM8BYaV-n7PTjd34sW2Uy5_fuk6A9tWcOU3XCP)

  

### 4) Click the “Write” button.

This brings up a MetaMask window. Click “Confirm”.

### 5) Once the transaction is mined go to the event logs and look for the event VestingCreated.

![](https://lh4.googleusercontent.com/VL3wkCKBKpoTZFUAEDJ0nRUMJ5xJpZjGjVyJTSqoQzzGdhS3IVSaAXGQnNQ3vWWtRexH30K7cVqsc2binchsFmwDwjuSzz9C5UiKSzgtJHZxOyKiQccJFEhGDiS99oPDfDTt60NG)

  

![](https://lh5.googleusercontent.com/H1YyfvKD8wFEZ0EWwqChLmM3qUV_yrWIJa7oH8OGTYx4uLBZOTmfuOGWgl_OniRjGbrMV3MCQ1W5DZVLuKGoS7i7pAdH_kRi4W4p2Pe2tFmmgccpOfSKnDWT5PmFL37T697szvxz)

**vestingContractAddress** is the address of your vesting contract. This is where you will request to send your DXD from your Alchemy Proposal.

  
  

### 6) Send your DXD to your vestingContractAddress.

  

### 7) Wait until the Start time plus cliffDuration time is reached, at which time you can execute the release function.

The release function will release any vested DXD to the **beneficiary (address)** already provided.

Enter the **DXD token address** into the field: **0xa1d65E8fB6e87b60FECCBc582F7f97804B725521**

  

Click “Write”

![](https://lh5.googleusercontent.com/G2mNAHBvcFgxp4rdsdrrMflZ7gGyli1d949PNhPvnl1wkwbeAzzejf-u4Pn8NQ4ByLkWM4QTNVdyv7tmEquknJWHp9RyLukrTmYwwRIYG_oPHWaNYyng9igS2Qb31Uz7xrQ3cORW)

### 8) Process Complete.

The process is not too complex, just create your vesting, send your DXD and receive it over time.

**NOTE: It is better to do your contract creation when gas prices are low!**

**Any questions?** Reach out to the [DXdao Discord](https://discord.gg/4QXEJQkvHH), or the [DXdao Keybase](https://keybase.io/team/dx_dao).