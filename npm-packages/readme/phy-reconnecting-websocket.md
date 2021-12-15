# ReconnectingWebSocket

 ReconnectingWebSocket is a simple WebSocket client that decorates the WebSocket API to provide a WebSocket connection that will automatically reconnect if the connection is dropped.
 It has a number of extra event that can.
 
 ## Events
 
  * ``open`` Fired when the first connection with a WebSocket is opened.
  
  * ``close`` Fired when a connection with a WebSocket is closed and no further reconnects will be tried.
  
  * ``error`` Fired when a connection with a WebSocket has been closed because of an error.
  
  * ``message`` Fired when data is received through a WebSocket.
  
  * ``reconnect`` Fired on a successful reconnection of a WebSocket.
  
  * ``disconnect`` Fired when a connection with a WebSocket is disconnect but further reconnects are to be tried.
  
  * ``connectionretry`` Fired before attempting it to reconnect a WebSocket
  
  * ``connectiontimeout`` Fired after a WebSocket connection times out.

 ## Installing
 
 ```npm i @phylite/phy-reconnecting-websocket```
 
  ## Example
  
  ```js
const ReconnectingWebSocket = require("@phylite/phy-reconnecting-websocket");
     
     // reconnect: true, will just return the default WebSocket ( return new  WebSocket(...) )
     let ws = new ReconnectingWebSocket("wss://echo.websocket.org", { reconnect: true });
     
     
     ws.on("message", (event) => {
         let message = event.data || event;
         console.log(`Received message: ${message}`) // Hello World!
     });
     
     ws.on("open", (event) => {
         console.log("WebSocket is open!");
     
         ws.send("Hello World!");
     });
```
  
  ## License
  
  [ISC](LICENSE.txt)
