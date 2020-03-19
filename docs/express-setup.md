---
layout: default
title: Creating our Express app
nav_order: 100
permalink: /docs/express-setup
---
1.TOC
{:toc}

# Deploying our app to Heorku
To deploy our app, we will use [Heroku Cloud Application Platform](https://www.heroku.com/). [Heroku](https://www.heroku.com/) will allow us to deploy our NodeJs app quickly and without having to pay.
![Heroku Cloud Application Platform](../assets/images/config13.png)
Create an account with [Heroku](https://www.heroku.com/), if you havn't already.
Once logged in, Heroku will take you to your apps page, where you can find the apps that are currently running on Heroku.
## Installing Heroku CLI
Heroku CLI will allow us to deploy our app, from our termianl. Using the CLI is a quick and effective way to continuously deploy your web apps.
>Make sure you have Git installed, before you install Heroku CLI.
Download and install Heorku CLI:

- [MacOs:](https://cli-assets.heroku.com/heroku.pkg "Heorku CLI Donwload for MacOS")
- [Windows:](https://cli-assets.heroku.com/heroku-x64.exe "Heorku CLI Donwload for Windows")
- Ubuntu: Run `sudo snap install --classic heroku`

After installing the CLI, open terminal in your project directory.
run `rm -rf node_modules; npm install --production`
This will ensure that you only have the packages you need for production on you project, before you deploy your app.
![npm init](/assets/images/config15.png"Running npm init")
This will generate a package.json file in our project.
`rm -rf node_modules; npm install --production`

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
