---
layout: default
title: Sending our first request
nav_order: 4
permalink: /docs/sending-a-request
---
# Setting our endpoints in developer dashboard
Now that we created our `/` and `/returned` endpoints, we will have to submit those to Twitter, so that they know where to send the user off, once they have logged into their account.
## Dashboard
Go back to your dashboard at [developer.twitter.com](https://developer.twitter.com/), and Log-in if you need to.
### Going to apps page
Under your name, click on the "Apps" option.
![Apps option in the menu](../assets/images/config18.png)
### Create an app
Click on the button to create an app, on the top corner of your page.
![Create an app link](../assets/images/config8.png)

## Entering the app information
You will have to lay out some information about the app that will be using Twitter's Basic API. This information will help Twitter trust your application and supply it with the information you will need. Make sure you write your responses consise and clear.
### Application name and description
Provide your application name and a breif description of what it will be aiming to accomplish.
![Application Name and Description](../assets/images/config19.png)
### Base URL
Enter the URL for the root of your application. This will be the URL that Heorku has given us, when deploying.
![Base URL](../assets/images/config20.png)

### Callback URL
This is the endpoint, at which we will be expecting the user to be redirected back from Twitter to our application. In our app, this is our `/returned` endpoint.
![Returned URL](../assets/images/config21.png)
> Make sure you include the entire URL concatinated with the endpoint inside the field( i.e. `https://glacial-wildwood-37970.herokuapp.com/returned`)

### Further Description
We will have to enter more description on how our app will be using the API. Write a more in depth explanation of how the app will work and what it aims to do.
![Description](../assets/images/config22.png)

### Create the app
Press create to submit the information.
![Submit](../assets/images/config23.png)

Review the information in the confirmation page.
![conficonfirmation](../assets/images/config24.png)

