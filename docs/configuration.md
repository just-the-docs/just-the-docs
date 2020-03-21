---
layout: default
title: Configuration
nav_order: 99
permalink: /docs/configuration
---
# Account Configuration
Twitter Standard API requires the developers to create a developer account and set up an Oauth 1.0 on your app before you can access the users' data. 
In the following steps, we walk through how we can set up our account and integrate our app with Twitter Standard API, using Oauth 1.0.
***
## Developer Portal
A developer account will give you access to the developer portal which lets us set up apps and the developer environment. The portal is where we ask Twitter for permission to use their API and give them the information they need, about the app.
### Applying for a developer account
Sign in with your Twitter account. If you don't have one, go to [Sign up for Twitter](https://twitter.com/i/flow/signup) to create an account.


In order to apply for a developer account, go to [Apply for a developer account](https://developer.twitter.com/en/apply).
We will choose a student account for the purposes of this tutorial. 

![Twitter API Docs](../assets/images/config1.png)

Once you click on next, you will have to choose your country of residance and a name, by which you will be called. Click next.
![Choose country and name](../assets/images/config3.png)

Next, you will be required to write about the app you will connect to the api. Based on the features you will use, you are required to write different paragraphs, mostly describing how you will use the feature.
![Describe what you will do with the API](../assets/images/config4.png)

You will be asked to confirm your information. Makes sure they're correct and click on the "Looks Good" button.

![Data Confirmation](../assets/images/config5.png)

Lastly, you will be requiried   Terms of use.
> note that you will be have to have confirmed your email address before you can compelete this step.

Once done, you will be shown a message, to confirm that you applied for a Twitter Developer Account.
![Confirmed](../assets/images/config6.png)


### Setting up an app
Twitter will email you a link, to confirm your email, for the developer account. After following the link email to you, you will be taken to your developer dashboard, where you can set up new apps, get API keys and set up your end points.

In the dashboard, click on Create an app

![Create an app](../assets/images/config7.png)

Click on the button to create an app, on the top corner of your page.

![Create an app link](../assets/images/config8.png)

### Preparing your URL endpoints

Twitter will require a set of URL's from you. Those URL's will tell Twitter where to expect the requests to come from, and where to send them back. If requests are sent from any other URL, twitter will not authorize your program, even if the currect API key and token are used.
>Twitter will not accept local URL's(i.e. localhost/ ) as the URL for app.

We will need to set up and deploy our app, in order to have the URL's that twitter is expecting from us. We will make a simple Express app and we will deploy it to Heorku, to provide Twitter with the ened points it needs.

<!-- We will come back to the developer dashboard to set up our app and introduce our URL. -->


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
![Creating the boiler plate app](../assets/images/config9.png)

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
 
app.listen(process.env.PORT || 3000 , () => console.log("The server is listening on port 3000"))

```
Now if we run the server.js file we will see the message printed in the terminal; and, the word will be shown, if we go to our browser and go to "localhost:3000".
![Server is running in terminal](../assets/images/config10.png)
![App is shown in the browser](../assets/images/config11.png)
> process.env.PORT is an enviroment variable that will be provided by Heorku, when we upload app. The || operator will indicate that if the enviroment variable does not exist( i.e. when running locally) the port will alternatively be 3000.

## Adding a callback endpoint
The user will be sent to Twitter, to login to their account. After being authentication, the user will be sent back to our callback, by Twitter. We will be expecting them  in our callback page. For now, though, we will just show them a message.
Let's add the endpoint to our server.js

```

app.get('/returned' , (req,res) => {
    res.send('Welcome back')
})

```

![Returned endpoint is shown in the browser](../assets/images/config12.png)

We will revisit and mofidy our app, later on; But, now let's deploy our app to heroku.

