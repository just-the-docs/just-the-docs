
<p>
  
<img src="https://github.com/druv5319/Sneaks-API/blob/master/Screenshots/Sneaks_Logo.png?raw=true" width=250>
  
  </p>
  
<p>
  
   <a href="https://www.npmjs.com/package/sneaks-api" alt="Version">
        <img src="https://img.shields.io/npm/v/sneaks-api" /></a>
<a href="https://www.npmjs.com/package/sneaks-api" alt="Downloads">
        <img src="https://img.shields.io/npm/dt/sneaks-api " /></a>


 </p>

A StockX API, FlightClub API, Goat API, and Stadium Goods API all in one.

Sneaks API is a sneaker API built using Node.JS, Express, and Got. The Sneaks API allows users to get essential sneaker content such as images, product links and even prices from resell sites while also collecting data and storing it within a database. This API mainly scrapes StockX for sneaker information and then asynchronously scrapes Stadium Goods, Goat, and Flight Club for additional sneaker information such as images and its respective resell price. This API outputs a sneaker object of the following variables:

**UPDATE 1.2.3**: Updated and fixed the Goat API to reflect their API changes. Removed the web server (localhost:4000) the package creates.

  - Sneaker Name
  - Colorway
  - Description
  - Release Date
  - Retail Price
  - Style ID
  - Image Links
  - Product links from each of the resell sites
  - Price map (of shoe size to price) from each of the resell sites
  - And more
  
  
  

I built this API so sneaker heads and developers are able to create sneaker based programs, trackers and websites without having to fumble with scrapping information on all 4 resell websites. Feel free to fork, edit and submit a pull request for this API for any changes or improvements. If you have any questions or issues regarding this feel free to create an issue and I will try to answer them as soon as I can.

## Demo
### Sneaks App - [Github](https://github.com/druv5319/sneaks-app)
<img src="https://github.com/druv5319/Sneaks-API/blob/master/Screenshots/demo.gif" width=700 >

### [Twilio Blog Tutorial](https://www.twilio.com/blog/build-price-tracker-twilio-programmable-sms-node): Build a Sneaker Price Tracker with Twilio Programmable SMS
  <img src="https://github.com/druv5319/Sneaks-API/blob/master/Screenshots/euCdtWvMESTjo9_Smd_wRpoNvhk6XOr3n3QlnHYNRAHHU.width-1000_RWrysBn-2.png" width="350"> <img src="https://github.com/druv5319/Sneaks-API/blob/master/Screenshots/syHg2FzA1dcFjpp6XlqNq_ZRNDXJPcdWCJzGhBcU2PPXv.width-1000_VZzgt9G.png" width="350">


## Technologies Used
  - Node.JS
  - Express
  - Got
  - Request
  - Mongoose
  

  
## Installation
To use this API you will need to have [node.js](https://nodejs.org/en/) installed.
Once installed, use this line on the terminal within your Node.js project directory
```
npm install sneaks-api
```
and place this line at the top of your main file
```js
const SneaksAPI = require('sneaks-api');
```
## How to Use
```js
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

//getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array 
sneaks.getProducts("Yeezy Cinder", 10, function(err, products){
    console.log(products)
})

//Product object includes styleID where you input it in the getProductPrices function
//getProductPrices(styleID, callback) takes in a style ID and returns sneaker info including a price map and more images of the product
sneaks.getProductPrices("FY2903", function(err, product){
    console.log(product)
})
//getMostPopular(limit, callback) takes in a limit and returns an array of the current popular products curated by StockX
sneaks.getMostPopular(10, function(err, products){
    console.log(products)
})
```
[Console log](https://github.com/druv5319/Sneaks-API/blob/master/Screenshots/exampleSearchScreenshot%231.png) of sneaks.getProducts("Yeezy Cinder", ...)           
[Console log](https://github.com/druv5319/Sneaks-API/blob/master/Screenshots/exampleSearchScreenshot%232.png) of sneaks.getProductPrices("FY2903", ...)

