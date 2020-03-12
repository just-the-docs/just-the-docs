---
layout: default
title: Creating our Express app
parent: Configuration
nav_order: 1
permalink: /docs/Configuration/ExpressSetup.md
---
1.TOC
{:toc}

# Setting up our NodeJs and Express
We will create a simple, boiler plate Node Js server, using ExpressJs. We will be required to provide the URL of the app in the developer dashboard.

## Boilerplate Express
Let's start with making a directory for our project and adding a server.js file.


```
mkdir TwitterAPI
cd TwitterAPI
ls
touch server.js
npm init -y
```
![Creating the boiler plate app](/assets/images/config9.png"Create app")

Then, let's install Express from npm
```
npm i express
```
Once Express is installed, we can go to our server.js file and create our server.

In our server.js file, we'll add our "/" endpoint.
```
const express = require('express')
const app = express()
 
app.get('/', (req, res) => {
  res.send('Twitter API')
})
 
app.listen(3000 , () => console.log("The server is listening on port 3000"))

```
Now if we run the server.js file we will see the message printed in the terminal; and, the word will be shown, if we go to our browser and go to "localhost:3000".
![Server is running in terminal](/assets/images/config10.png"Terminal")
![App is shown in the browser](/assets/images/config11.png"Browser shows the app")

## Adding a callback endpoint
The user will be sent to Twitter, to login to their account. After being authentication, the user will be sent back to our callback, by Twitter. We will be expecting them  in our callback page. For now, though, we will just show them a message.
Let's add the endpoint to our server.js

```

app.get('/returned' , (req,res) => {
    res.send('Welcome back')
})

```

![Returned endpoint is shown in the browser](/assets/images/config12.png"Returned endpoint is shown in the browser")

We will revisit and mofidy our app, later on; But, now let's deploy our app to heroku.

### Setting up an app
Twitter will email you a link, to confirm your email, for the developer account. After following the link email to you, you will be taken to your developer dashboard, where you can set up new apps, get API keys and set up your end points.

In the dashboard, click on Create an app

![Create an app](/assets/images/config7.png"Create an app in the website")

Click on the button to create an app, on the top corner of your page.

![Create an app link](/assets/images/config8.png"Create an app button")

### Preparing your URL endpoints

Twitter will require a set of URL's from you. Those URL's will tell Twitter where to expect the requests to come from, and where to send them back. If requests are sent from any other URL, twitter will not authorize your program, even if the currect API key and token are used.
> Twitter will not accept local URL's(i.e. localhost/ ) as the URL for app.

We will need to set up and deploy our app, in order to have the URL's that twitter is expecting from us. We will make a simple Express app and we will deploy it to Heorku, to provide Twitter with the ened points it needs.
