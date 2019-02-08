---
layout: default
title: Trade Lifecycle
parent: Trading Guide
nav_order: 1
---

# Trading Guide

## Trade lifecycle

### Funding exchange wallet

Bitcoin is the currency of transactions on Delta. This means that margins and PnL on Delta are denominated in Bitcoins. Before you are able to trade, you need to fund your exchange wallet with Bitcoins. You can see detail on how to deposit/ withdraw Bitcoins from your Delta wallet on the **Account Details** page.

 ### Placing an order

Orders can be placed in Place Order Panel in the trading dashboard. We currently support three types of order:

  -   **Limit order:** is an order to buy or sell a specified number of derivative contracts at a specified price. A limit order will only ever fill at the specified price or better price.
    
-   **Market order:** is an order to buy or sell a specified number of derivative contracts at the best available price available in the order book. There is no guarantee that a market order will fill at the price specified. A market order may fill at a number of different prices, based on the quantity of the market order and the quantities of the existing orders on the order book at the time.
- **Stop order:** write text here
    
### Margin & PnL Calculations

A new order is allowed to be submitted to the exchange only if the trader has sufficient balance available to reserve the order margin. Order margin computation happens in one of the two ways:

-   Trader doesn’t have an existing position in the contract: the system computes the initial margin that would be required if this position is acquired. This is the amount that is blocked as order margin.
    
-   Trader has an existing position in the contract: in this case, the system computes the margin required for the updated overall position after the placed order has been executed. The difference between this computed margin requirement and the current position margin is what is additionally needed for this order. This is the amount that is block as order margin. [fair price](#fpm)
    
Details on the various types of margins and their calculations are available [here](#marginexplain).

Existing positions on Delta are marked at [fair Price](#fpm). This means that your unrealised PnL and hence the current value of margin allocated to a particular position are a function of the marked price. PnL calculations are illustrated with example in the [PnL Math](#pnlmath) section.

### Settlement

You can square off a position in a derivatives contract in the exchange. Position that are held till maturity are cash settled at a price that is computed using the settlement method described in the [contract specifications](https://delta.exchange/contracts).

  