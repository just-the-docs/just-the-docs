```
npm install discord-ban-list
```
Use this module to check whether a certain Discord user ID has been listed in the [Ban List](http://discord.shoutwiki.com/wiki/Ban_List)/[DiscordList bans](https://bans.discordlist.net/) or not.
```js
var dbl = require("discord-ban-list");
dbl("1234567890").then(isBanned => {
    console.log(isBanned);
}).catch(console.log);
// If listed on either website then return true, else return false

dbl.wiki("1234567890").then(isBanned => {
    console.log(isBanned);
}).catch(console.log);
// If listed on http://discord.shoutwiki.com/wiki/Ban_List then return true, else return false

dbl.list("1234567890").then(isBanned => {
    console.log(isBanned);
}).catch(console.log);
// If listed on http://bans.discordlist.net then return true, else return false
```
