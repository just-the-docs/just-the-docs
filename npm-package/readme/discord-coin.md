# Discord Coin

Framework to facilitate the economy system for bot discord.

## Installation

```
npm i discord-coin
```

## Examples

### Lunch of the module

```js
const Discord = require("discord.js"),
client = new Discord.Client(),
settings = {
    prefix: "c!",
    token: "Your Discord Token"
};

const CoinManager = require("discord-coin")
const manager = new CoinManager(client, {
  storage: "money.json"
})

client.coinManager = manager;

client.on("ready", () => {
    console.log("I'm ready !");
});

client.login(settings.token);
```

### Add Money
```js
client.on("message", (message) => {

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "add-money"){
      client.coinManager.addMoney(message.author.id,{
        guildID: message.guild.id,
        money: 100
      })
    }
})
```

### Remove Money

```js
client.on("message", (message) => {

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "remove-money"){
      client.coinManager.removeMoney(message.author.id,{
        guildID: message.guild.id,
        money: 100
      })
    }
})
```

### Pay

```js

client.on("message", (message) => {

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "pay"){
      const money = args[0]
      const user = message.mentions.users.first();
      if(client.coinManager.getUser(message.author.id, { guildID: message.guild.id }).money > money){
      client.coinManager.addMoney(user.id, { guildID: message.guild.id, money: money })
      client.coinManager.removeMoney(message.author.id, { guildID: message.guild.id, money: money })
      }
    }
})

```

### getUser

```js

client.on("message", (message) => {

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "get-user"){
      client.coinManager.getUser(message.author.id,{
        guildID: message.guild.id
      })
    }
})

```

## Events

### moneyCreated

When a user sends his first message.

```js
client.coinManager.on('moneyCreated',(member, guild) => {
  console.log(`Money created for ${member.user.username} in the guild ${guild.name}`)
})
```

### moneyAdded

When a user gets money

```js
client.coinManager.on('moneyAdded',(member, guild, data) => {
  console.log(`The member ${member.user.tag} in the guild ${guild.name} get ${data.money}$`)
})
```

### moneyRemoved

When a user lost money

```js
client.coinManager.on('moneyRemoved',(member, guild, data) => {
  console.log(`The member ${member.user.tag} in the guild ${guild.name} lost ${data.money}$`)
})
```
