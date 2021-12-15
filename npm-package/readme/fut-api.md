# fut - FIFA 17 - unofficial

<p>
  <a href="https://www.npmjs.com/package/fut"><img src="https://img.shields.io/npm/dm/fut.svg" alt="npm downloads"></a>
  <a href="https://www.npmjs.com/package/fut"><img src="https://img.shields.io/npm/v/fut.svg" alt="npm version"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="js-standard-style"></a>
</p>

## Usage
### Quick start
```javascript
'use strict'

const readline = require('readline')
const Fut = require('fut')
const Promise = require('bluebird')
const co = require('co')
const storage = require('node-persist')
storage.initSync()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const email = process.env.EMAIL
const password = process.env.PASSWORD
const platform = process.env.PLATFORM
const secret = process.env.SECRET

var fut = new Fut({
  email,
  password,
  secret,
  platform
  loginType: 'web'
  // this is optional and happens rarely
  captchaHandler: (captcha, resolve) => {
    co(function * () {
      yield fs.writeFileAsync('captcha.jpg', captcha)
      // Do something with the captcha file
      resolve(captchaRes.text)
    })
  },
  tfAuthHandler: (send) => {
    return new Promise((resolve, reject) => {
      rl.question('Enter your two factor code:', function (code) {
        return resolve(code)
      })
    })
  },
  // yo can return a simple sync function to save/loadVariable
  saveVariable: (key, val) => {
    console.log('setting item', key)
    storage.setItem(key, val)
  },
  // or a promise if you do something async
  loadVariable: co.wrap(function * (key) {
    var item = storage.getItem(key)
    return item
  })
})

co(function * () {
  yield fut.login()
  let resp = yield fut.getCredits()
  console.log(resp)
}).catch((e) => console.log(e.stack))

```
## Note: All method returns a promise!

##### Options
See source: https://github.com/futjs/fut-api/blob/master/src/index.js#L20

## Login
See quick start, better docs coming soon...
* platform: "ps3","ps4","pc","x360","xone"

## Credits


```javascript
  apiClient.getCredits()
```
* response: Object
    * credits: number
    * bidTokens: ??
    * currencies: []
        * name: string
        * funds: number
        * finalFunds: number
    * unopenedPacks: Object
        * preOrderPacks: number
        * recoveredPacks: number


## Pilesize
```javascript
  apiClient.getPilesize()
```
* response: Object
    * entries: []
        * value: number
        * key: number -> 2 == Tradepile, 4 == Watchlist

## Tradepile
```javascript
  apiClient.getTradepile()
```
* response: Object
    * credits: number
    * currencies: []
        * name: string - values "COINS","POINTS","DRAFT_TOKEN"
        * funds: number
        * finalFunds: number
    * duplicateItemIdList: ??
    * errorState: ??
    * auctionInfo: []
        * bidState: string
        * buyNowPrice: number
        * confidenceValue: number
        * currentBid: number
        * expires: number
        * offers: number
        * sellerEstablished: number
        * sellerId: number
        * sellerName: string
        * startingBid: number
        * tradeId: number
        * tradeOwner: boolean
        * tradeState: string
        * watched: boolean
        * itemData: object
            * assetId: number
            * assists: number
            * attributeList: []
                * index: number
                * value: number
            * cardsubtypeid: number
            * contract: number
            * discardValue: number
            * fitness: number
            * formation: string
            * id: number
            * injuryGames: number
            * injuryType: string
            * itemState: string
            * itemType: string
            * lastSalePrice: number
            * leagueId: number
            * lifetimeAssists: number
            * lifetimeStats: []
                * index: number
                * value: number
            * loyaltyBonus: number
            * morale: number
            * nation: number
            * owners: number
            * pile: number
            * playStyle: number
            * preferredPosition: string
            * rareflag: number
            * rating: number
            * resourceId: number
            * statsList: []
                * index: number
                * value: number
            * suspension: number
            * teamid: number
            * timestamp: number
            * training: number
            * untradeable: boolean

## Relist tradepile
```javascript
  apiClient.relist()
```
* response: Object
    * tradeIdList: []
        * id: number
        
## Watchlist
```javascript
  apiClient.getWatchlist()
```

* response: -> see tradepile response

## Transfermarket
```javascript
  apiClient.search({type: "player", lev: "gold", maskedDefId: 183907, pos: "CB" })
```

* filter 
    * searchFilterBase
        * type: string      -> player, training, development
        * start: number     -> page
        * num: number       -> items per page
        * micr: number      -> min bid
        * macr: number      -> max bid
        * minb: number      -> min buy
        * maxb: number      -> max buy
        * lev: string       -> bronze, silver, gold
        
    * playerSearchFilter extends searchFilterBase
        * maskedDefId: number   -> baseId
        * rare: string      -> SP
        * zone: string      -> defence, midfield, attacker
        * pos: string       -> GK, CB, LB, RB, ...
        * nat: number       -> nationId
        * leag: number      -> leagueId
        * team: number      -> teamId
        * playStyle: number -> playerStyleId
        
    * consumableFilter extends searchFilterBase
        * cat: string       -> playerTraining, GKTraining, position, playStyle, managerLeagueModifier, contract, fitness, healing
        
    * positionChangeSearchFilter extends consumableFilter
        * pos: string       -> LB-LWB (OLD-NEW)
        
    * playerStyleSearchFilter extends consumableFilter
        * playStyle: number -> playerStyleId
    
* response: -> see tradepile response

## Place bid
```javascript
  apiClient.placeBid(tradeId, coins)
```

* tradId: number
* coins: number
* response: -> see tradepile response

## List item
```javascript
  apiClient.listItem(itemDataId, startingBid, buyNowPrice, duration)
```
* itemDataId: number -> itemData.id
* startingBid: number
* buyNowPrice: number
* duration: number -> seconds -> valid values 3600 = 1h, 10800 = 3h, 21600 = 6h, 43200 = 12h, 86400 = 1d, 259200 = 3d

* response: 
    * id: number
    
## Auction status
```javascript
  apiClient.getStatus([tradeIds])
```
* tradeIds: number[] -> tradeId
* response: -> see tradepile response

## Add to watchlist
```javascript
  apiClient.addToWatchlist(tradeId)
```
* tradeId: number -> tradeId

## remove from tradepile
```javascript
  apiClient.removeFromTradepile(tradeId)
```
* tradeId: number -> tradeId

## remove from watchlist
```javascript
  apiClient.removeFromWatchlist(tradeId)
```
* tradeId: number -> tradeId

## send to tradepile
```javascript
  apiClient.sendToTradepile(itemDataId)
```
* itemDataId: number -> itemData.id
* response: Object
    * itemData: []
        * id: number
        * pile: string
        * success: boolean
        
## send to tradepile
```javascript
  apiClient.sendToClub(itemDataId)
```
* itemDataId: number -> itemData.id
* response: Object
    * itemData: []
        * id: number
        * pile: string
        * success: boolean
        
## Quick sell
```javascript
  apiClient.quickSell(itemDataId)
```
* itemDataId: number -> itemData.id
* response: Object
    * items: []
        * id: number
    * totalCredits: number
    
## Functions

### Validate price/coins
```javascript
    futapi.isPriceValid(coins)
```
returns true or false

### Calculate valid price/coins
```javascript
    futapi.calculateValidPrice(coins)
```
returns valid coins amount

### Calculate next lower price/coins
```javascript
    futapi.calculateNextLowerPrice(coins)
```
returns next lower coins after calculating valid price

### Calculate next higher price/coins
```javascript
    futapi.calculateNextHigherPrice(coins)
```
returns next higher coins after calculating valid price