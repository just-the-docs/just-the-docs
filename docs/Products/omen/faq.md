---
layout: default
title: FAQ
parent: Omen
grand_parent: Products

---

# Omen FAQ
{: .no_toc }

___

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What is Omen? 
 
Omen is an information market platform. Users can create and/or participate in information markets on various topics (crypto, politics, sports, etc.) and risk their crypto on possible outcomes. The oracle provider then validates the outcome, and the users who hold shares of the correct outcome collect the crypto held as collateral. In the case of a dispute, an arbitrator can be called to make a judgment. 
 
## What is an information market?
 
 An Information Market is a venue where tokens representing potential outcomes of an event are bought and sold. When the event occurs, the Market pays out to holders of the outcome that actually occurred. Sometimes called prediction markets or decision markets, information markets are a vehicle for aggregating financially backed sentiment about the expected outcome of a future event. 
 
## What do I need to participate in Omen? 
 
You will need [Metamask](https://metamask.io/) or [Wallet Connect](https://walletconnect.org/apps/), some amount of ETH to execute transactions, and the collateral token of the market in which you want to participate. If you don’t have that token yet, you can exchange tokens at [Swapr.eth](https://swapr.eth.link/)
 
## Where do I see my outcome tokens? 
 
You can see your outcome token balance in the Omen user interface. Your outcome tokens are [ERC-1155 tokens](https://eips.ethereum.org/EIPS/eip-1155). Etherscan and most wallets currently do not show ERC-1155 tokens. Soon, there will be a blockchain explorer and more wallets that will show these tokens. 
 
## Is there a risk in buying outcome tokens? 
 
A liquidity provider removes liquidity before an outcome is known. After the outcome is known, all tokens (apart from the winning one) lose their value. 
 
## Is there a cost to participating in Omen? 
 
There is a trading fee of 2% paid when purchasing market shares (in addition to the Ethereum gas fee for the transaction). These trading fees go to the liquidity providers. 
 
## What is the difference between Categorical and Binary markets? 
 
A *Categorical market* is one with a **set number** of outcomes. It resolves to an outcome from a defined list. 
 
**Example**: 
 
Who will be Joe Biden's Vice Presidential running mate in the 2020 Presidential election? 
 
 - Outcome A: Elizabeth Warren 
 
 - Outcome B: Kamala Harris 
 
 - Outcome C: Amy Klobuchar 
 
 - Outcome D: Other 
 
A *Binary market* is a categorical market with only **two** possible outcomes. 
 
**Example**: 
 
Will Ethereum’s 2.0 Beacon chain launch by January 1, 2021 at 00:00 UTC? 
 
- Outcome **A**: Yes 
 
- Outcome **B**: No 
 
What are the three states of Markets? 
 
 1. **Open** : a market that is currently tradable. We are before the Earliest Resolution Date. 
 2. **Closed** : a market that is past the Earliest Resolution Date. It is not tradeable, and is waiting to be resolved.
 3. **Resolved** : a market where the oracle has set the winning outcome(s) for the markets. 
 
## How are Markets on Omen resolved? 
 
Once a market is Closed, the outcome is then determined by the market reporter [Realitio](http://realitio.github.io/), a mechanism for verifying real-world events for smart contracts. Most markets will be resolved following that. 
 
In some cases, a market outcome will be contested where users can pay for rounds of arbitration until the matter is resolved, or users wish to no longer pay for arbitration. 
 
When a prediction market reaches its resolution date, the outcome is determined by [Realitio](https://realitio.github.io/). Users on Realitio post bonds for their chosen outcomes, and they can be challenged by someone posting a new answer, and doubling the bond. This may happen for several cycles until the posting stops, and the answer is determined by the last one to post their bond. If someone doesn’t agree with Realitio’s outcome as a market reporter, they can dispute it through realitio by requesting [Kleros](http://kleros.io/) to arbitrate the dispute. 
 
Kleros selects a randomized subset of jurors from a juror pool by sortition and applies game-theoretical incentivization to align the pseudonymous voters to consensus. Those who stake on the correct outcomes collect from those who staked on the incorrect outcome. In the future, the DXdao, the self-governing organization behind Omen, could also function as a competent arbiter. 
 
## What is an Automated Market Maker (AMM) and how does it work?
 
The automated market maker (AMM) is a smart contract deployed for each market to enable continuously available liquidity for an outcome token. As long as the AMM is funded, participants can buy and sell outcome tokens for a prediction market, and the AMM will aggregate the trade data to produce estimates for the odds of outcomes. 
 
Omen employs a type of AMM called the Fixed Product Market Maker (FPMM). The FPMM is a new market maker using the same mechanism as Uniswap and Balancer pools. It was originally designed for the more general use case of swapping tokens, but has been tailored for the prediction markets use case. 
 
## How does liquidity provisioning work? 
 
**Example:** 
 
1. Alice funds the market with 10 DAI and sets the probabilities to 50:50.
 
2. The market takes the funding and converts it to 10 Yes and 10 No outcome tokens that are kept in the market as liquidity. 
 
3. Alice receives an amount of pool tokens which represents the 10 DAI deposit. 
 
4. Bob buys 2.5 Dai worth of Yes tokens from the market.
 
	*a*. Bob sends 2.5DAI (plus a 2% fee of ~ 0.05DAI). 
 
	*b*. The market takes the 2.5 DAI and converts it to 2.5 Yes and 2.5 No outcome tokens. It also deposits the fee. 
 
	*c*. The market then converts the 2.5 No tokens to Yes tokens by trading with the existing liquidity. 
 
	*d*. Preserving the product of its balances, the market returns 2 Yes tokens for the 2.5 No tokens deposited, leaving it with 8 Yes tokens and 12.5 No tokens (8*12.5 = 100 = 10*10). 
 
	*e*. Bob gets back a total of 4.5 Yes tokens. 
 
5. Alice deposits her pool tokens and withdraws her liquidity, getting back 8 DAI and 4.5 No tokens, along with the 0.05 DAI she earned in fees. If the market resolves to Yes, Alice’s No tokens will be worth nothing and she will have experienced nearly a 20% loss. 
 
## Why can liquidity provisioning be risky? 
 
Providing liquidity is risky and could result in near total loss. It is important to withdraw liquidity before the event occurs and to be aware the market could move abruptly at any time. 
 
The liquidity provider is taking possession of a set of outcome tokens and also allowing others to trade with them. When a market resolves, only one outcome token retains any value. When traders take a position by trading for the liquidity provider’s tokens and the trader is correct, the liquidity provider experiences a loss. 
 
By way of example, if a liquidity provider adds 10 DAI of liquidity to a binary market, they will have liquidity tokens representing 10 A tokens and 10 B tokens. If no trading happens and the market resolves to A, then the liquidity provider breaks even. However, say before market close traders become confident in the likelihood that A will be the outcome and they make enough trades that there are 2 A tokens and 50 B tokens in the market when the market closes. When the market resolves with A as the outcome, the liquidity provider has experienced an 80% loss, receiving only 2 DAI back. 
 
## Where can I learn more about the Conditional Token Framework? 
 
Please refer to the [developer portal](https://docs.gnosis.io/conditionaltokens/) around conditional tokens. 
 
