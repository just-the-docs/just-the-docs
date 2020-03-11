---
layout: default
title: Configuration
nav_order: 1
has_children: true
# permalink: /docs/Configuration/Configuration.md
---
# configuration
Twitter Standard API requires the developers to create a developer account and set up an Oauth 1.0 on your app before you can access the users' data. 
In the following steps, we walk through how we can set up our account and integrate our app with Twitter Standard API, using Oauth 1.0.
## Developer Portal
A developer account will give you access to the developer portal which lets us set up apps and the developer environment. The portal is where we ask Twitter for permission to use their API and give them the information they need, about the app.
### Applying for a developer account
Sign in with your Twitter account. If you don't have one, go to [Sign up for Twitter](https://twitter.com/i/flow/signup) to create an account.


In order to apply for a developer account, go to [Apply for a developer account](https://developer.twitter.com/en/apply).
We will choose a student account for the purposes of this tutorial. 

![Twitter API Docs](/assets/images/config1.png"ChooseAccountType")

Once you click on next, you will have to choose your country of residance and a name, by which you will be called. Click next.
![Choose country and name](/assets/images/config3.png"Name")

Next, you will be required to write about the app you will connect to the api. Based on the features you will use, you are required to write different paragraphs, mostly describing how you will use the feature.
![Describe what you will do with the API](/assets/images/config4.png"Description")

You will be asked to confirm your information. Makes sure they're correct and click on the "Looks Good" button.

![Data Confirmation](/assets/images/config5.png"Confirm")

Lastly, you will be requiried   Terms of use.
> note that you will be have to have confirmed your email address before you can compelete this step.

Once done, you will be shown a message, to confirm that you applied for a Twitter Developer Account.
![Confirmed](/assets/images/config6.png"Confirm")

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
