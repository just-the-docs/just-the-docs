---
layout: default
title: Tutorials
# parent: UI Components
nav_order: 2
---

# Tutorials

## Futures

A derivative is a financial security which derives its value from an underlying asset or group of assets. The derivative itself is a contract between two parties and its price is driven by fluctuations in the underlying asset.

 Futures is a type of derivative that is essentially an agreement between two parties to buy/ sell an asset (e.g. Ether) at a predetermined future date and price. There is a deterministic but complex relation between the price of the underlying asset and its Futures contract. However, simplistically, we can assume that both spot and Futures price tend to move in the same direction.

  
**Trading Futures vs. the underlying**

Futures offer several advantages over trading the underlying asset directly. Futures .. :

-   enable you to benefit from both price increases (long position) as well as declines (short position)
    
-   provide financial leverage
    
-   can be used to hedge price risk
    
-   tend to incur lower transaction fees
    
**Directional trades**

View on the price of an underlying can be expressed via a Futures contract for it. Going long (buying) futures will generally lead to a profit if the price of the underlying rises. Conversely,

shorting (selling) Futures will generally result in a profit if the price of the underlying declines.

 **Hedging**

A Futures contract can be used to hedge the price risk of the underlying asset. Let’s say you own 1 BTC (Bitcoin). If you want to lock the current BTC price of $8000, then you can short sell 8000 BTC/ USD Futures (assuming each contract size is 1 USD). Once this hedge is in place, regardless of bitcoin price movement, the effective value of your position will remain constant at $8000.

## Math for Futures

The math behind Futures is better illustrated with an example. Let’s say, we would like to trade Ether-Bitcoin (ETH-BTC) Futures. We need to define a few parameters:

 **Underlying:** This is the asset over which a Futures contract is defined. In our example the underlying is Ether.

 **Quote currency:** This is the currency in which the price of the underlying in quoted. In our example, price of Ether is quoted in Bitcoin terms. Hence, quote currency is BTC.

 **Base currency:** This is the currency in which the PnL of a Futures position is calculated. In our example, the base currency is same as the quote currency, i.e. Bitcoin. However, this need not always be true.

**Multiplier:** This refers to the quantity of the underlying that the two parties trading a single Futures contract agree to buy/ sell in future. If our ETH-BTC Futures contract entails agreement to buy/ sell m Ethers at a future date, then m is the multiplier.

Given above, if you buy (or even sell) *n* ETH-BTC Futures contracts at Fut_EntryPrice, then your overall position size (nominal exposure) is:

$$n *m* Fut\_EntryPrice \  (in \ BTC)$$

To understand why this the position size consider this: the buyer of the Futures contract has agreed to buy *n*m* Ethers at contract expiry, with each Ether priced at Fut_EntryPrice Bitcoins. Thus, at the time of settlement, he will need to have n*m*Fut_EntryPrice Bitcoins to honor the agreement.

 However, to be able to enter into a Futures trade, you are not required to have resources equalling the position size. This is where financial leverage kicks in.

 **Margin%:** This is the fraction of your position size that you are required to post as collateral when entering into a Futures trade. So, in our example, to buy/ sell *n* contracts, you need to have only:

$$n*m* Margin\% *  Fut\_EntryPrice \ (in \ BTC)$$

This also means that maximum position size that you can afford is 1/Margin% times the collateral (in BTC) that you have available. Thus,

$$^1/(Margin\%) = Financial\ leverage$$

### PnL Computation

 **Unrealised PnL**
For a **long** position in a Futures contract:

$$PnL = n*m*(Fut\_CurrentPrice - Fut\_EntryPrice) \ (in \  BTC)$$

  For a **short** position in a Futures contract:

$$PnL = - n*m*(Fut\_CurrentPrice - Fut\_EntryPrice) \ (in\  BTC)$$

  It is worth noting that your (realised or unrealised) profits and losses are adjusted from the margin you post. Profit on a Futures position add to the Margin (collateral). Conversely, loss erodes margin and you might need to top it up to continue holding your position.

**Realised PnL**
In case of Futures, PnL can be realised either by exiting the position in market or via settlement process at the maturity of the contract

Exit **long** position in market

$$PnL = n*m*(Fut\_ExitPrice - Fut\_EntryPrice) \ (in \ BTC)$$

Exit **long** position via settlement

$$PnL = n*m*(Fut\_SettlementPrice - Fut\_EntryPrice) \ (in \ BTC)$$

 Exit **short** position in market

$$PnL = -n*m*(Fut\_ExitPrice - Fut\_EntryPrice)\  (in \ BTC)$$

 Exit **short** position via settlement

$$PnL = -n*m*(Fut\_SettlementPrice - Fut\_EntryPrice) \  (in \  BTC) $$

 *Settlement price is determined at the maturity of the contract through a pre-defined method described in the [contract specifications](https://delta.exchange/contracts/) . All open positions at the time of contract maturity are closed at the settlement price.*

## Inverse Futures

The Futures contract discussed above are also known as **Vanilla Futures**. Inverse Futures are similar to Vanilla Futures, but only with one key distinction: the relationship between Futures price and position PnL is sort of inverted.

For a **long** position in an inverse Futures contract

$$PnL = n*m*(1/ Fut\_EntryPrice - 1/ Fut\_CurrentPrice) \ (in \ BTC) $$

 For a **short** position in an inverse Futures contract

$$PnL = - n*m*(1/ Fut\_EntryPrice - 1/ Fut\_CurrentPrice) \ (in \  BTC)$$

## Leverage

Leverage has a multiplier effect on your trading returns. This is best illustrated with an example. Let’s say you have $100, and you think BTC price is likely to go up. Currently, 1 BTC = $10,000

### No Leverage (trade the underlying)

Buy 0.01 BTC using your $100. If after a week, BTC rises by 10% to $11,000 , your position in BTC is now worth $110 and your PnL is $10. And, the return on your equity (RoE), $100 in this case is:

  $$RoE_{NoLeverage} = PnL / Equity$$

$$= \$10/\$100 = 10\%$$

  

### With Leverage (trade the Futures contract)

Long USD - BTC Futures contract using $100 as the margin money. Let’s assume that the contract size is 0.01 BTC and Margin% is 10%. This means that $100 as margin is sufficient for 10 contracts.

 Let’s further assume that the Futures contract price broadly follows BTC price movement. Now, we can approximate the PnL as

 $$PnL = 10 * 0.01 * (11000 - 10000) = \$100$$

  So, in this case, we have generated a PnL of $100 with the an equity of $100.

$$RoE_{Leverage} = \$100/ \$100 = 100\%$$

 It is also easy to see that,

$$RoE_{Leverage} = RoE_{NoLeverage}/ Margin\% $$
$$= RoE_{NoLeverage} *Financial_{Leverage}$$

 Do note that leverage is a double edged sword. Just as it will amplify your profits, it will also have the same multiplier effect on your losses.