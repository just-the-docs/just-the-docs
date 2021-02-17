---
layout: default
title: FAQ
parent: Mesa
grand_parent: Products

---

## What is Mesa?  
 
Mesa is a decentralized application built on the Gnosis Protocol, a fully permissionless DEX that enables ring trades to maximize liquidity.  
 
Gnosis Protocol enables ring trades to maximize liquidity. Ring trades are order settlements that share liquidity across all orders, rather than a single token pair, and uniquely suited for trading prediction market tokens and the long tail of all tokenized assets.  
 
Read more about the protocol’s mechanism on the Gnosis [Developer Portal](https://docs.gnosis.io/protocol/docs/introduction1/).  
 
## How are trades matched?  
 
Orders are collected in batches every 5 minutes, and external participants called solvers (everyone can participate as a solver) propose a settlement solution to the smart contract. The smart contract selects the solution that maximizes [trader welfare](https://docs.gnosis.io/protocol/docs/devguide01/). The utility in this optimization function is the difference between what a trader is willing to pay and what they pay once a batch is cleared. After a solution is selected, orders are matched and settled accordingly and on-chain.
 
## What advantages do ring trades bring?  
 
Ring trades are order settlements that share liquidity across all orders, rather than a single token pair, and hence maximize liquidity.  
 
## Is Gnosis Protocol secure?  
 
The Gnosis Protocol smart contracts have been audited externally. Check this section on their [Developer Portal](https://docs.gnosis.io/protocol/docs/devguide04/) for further information, including the audit report and the code repository.  
 
## Can I create a trade without depositing to the smart contract? 
 
Indeed, orders can be placed without a corresponding balance in the Exchange Wallet. However, **_only_** orders with a balance in the Exchange Wallet can be matched and filled.
 
## Why do I need to _Enable Deposit_?
 
In order to participate in the Gnosis Protocol as a liquidity provider or as a trader, you need to transfer funds from your wallet into the Exchange Wallet. With the button **Enable Deposit**, you set this allowance for the Gnosis Protocol smart contract.
 
Note that you only need to **Enable Deposit** for the token(s) you want to actively deposit. You can withdraw any token you receive from trading without having to enable it first.
 
## What is the Liquidity page?
 
Liquidity provision is a way in which **Gnosis Protocol Web** users can easily provide liquidity and get rewarded with little effort and low risk. It works by letting users place standing orders to market-make between selected tokens.
 
To provide liquidity, click on the `Liquidity` page, and follow three simple steps: select your stablecoin tokens, define your spread, and finally, submit your orders.
 
Users must also have at least one of the tokens of their liquidity provision deposited in their Exchange Wallet to enable trades.
 
Importantly, don’t forget that **all** orders placed by an Ethereum address share the same deposited liquidity! Consider participating with separate addresses for separate strategies when partaking in the liquidity provision and when trading normally.
 
Learn more about liquidity provision on [this section](https://docs.gnosis.io/protocol/docs/liquidity1/) of the Gnosis Developer Portal.