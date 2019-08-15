---
layout: default
title: postman
nav_order: 4
---


# Introduction

This document is designed as a guide on _test the open integration hub with postman_.


## Prerequisites

In order to use the Open Integration Hub we provided a demo environment and a [postman collection](postman/OIH_Framework_Showcase.postman_collection.json) and a [postman environment](postman/OIH_Framework.postman_environment.json) to test the functionalities of the Open Integration Hub.

We suggest to download and import these files to easily process the steps described in the following.

You can download postman from the [official postman website](https://www.getpostman.com/downloads/).

## SetUp

Before you start using the framework you need a user account (username & passoword). Please request a new account from [@philecs](https://github.com/philecs). E-Mail: <philipp.hoegner@cloudecosystem.org>.

It is necessary to add valid user data in order to perform the requests.
Please process the following steps in order to be able to generate a valid token for the requests:

1. Right click on the `OIH_SHOWCASE_COLLECTION` and click on `edit` OR click on the three dots `...` and click `edit`.
2. Jump to `Pre-request Scripts`
3. Set `username` variable to the username you received
4. Set `password` variable to the password you received
5. Click on `Update`

Here you can see where you should add the username and password:
![usrName_pw](assets/postmanToken.PNG)

Now you can proceed and use the predefined requests.

## Use Cases

### Flows

For further information on the underlying flow repository please visit the [API docs](http://flow-repository.openintegrationhub.com/api-docs/) and [GitHub](https://github.com/openintegrationhub/openintegrationhub/tree/master/services/flow-repository).

#### Get All Flows

![GET](https://img.shields.io/badge/Operation-GET-brightgreen.svg)

**Postman request name:** Get user flows

Steps to perform:

1. Click on `Send`

---

#### Get a Flow by Id

![GET](https://img.shields.io/badge/Operation-GET-brightgreen.svg)

**Postman request name:** Get flow by id

Steps to perform:

1. Replace the `{FLOW_ID}` placeholder with an existing flow id
2. Click on `Send`

---

#### Create a new Flow

![POST](https://img.shields.io/badge/Operation-POST-yellow.svg)

**Postman request name:** Post a new flow

1. Go to the `Body` tab
2. Add a new flow (exemplary flows can be found at the end of this document)
3. Click on `Send`

_Note:_ The property `componentId` must point to an existing component within the component repository (See: [components](#components))

_Hint:_ There is a predefined body that can be used.

---

#### Update a Flow by Id

![PATCH](https://img.shields.io/badge/Operation-PATCH-lightgrey.svg)

**Postman request name:** Update a flow by id

1. Go to the `Body` tab
2. Add a the updated (exemplary flows can be found at the end of this document)
3. Click on `Send`

_Note:_ Partial updates to a flow are possible. If you want to change a property of a flow graph you must provide the whole `flow.graph` property.

_Hint:_ There is a predefined body that can be used.

---

#### Delete a Flow by Id

![DELETE](https://img.shields.io/badge/Operation-DELETE-red.svg)

**Postman request name:** Delete a flow by id

1. Replace the `{FLOW_ID}` placeholder with an existing flow id
2. Click on `Send`

---

#### Start a Flow by Id

![POST](https://img.shields.io/badge/Operation-POST-yellow.svg)

**Postman request name:** Start a flow by id

1. Replace the `{FLOW_ID}` placeholder with an existing flow id
2. Click on `Send`

---

#### Stop a Flow by Id

![POST](https://img.shields.io/badge/Operation-POST-yellow.svg)

**Postman request name:** Stop a flow by id

1. Replace the `{FLOW_ID}` placeholder with an existing flow id
2. Click on `Send`

---

### Components

For further information on the underlying component repository please visit the [API docs](http://component-repository.openintegrationhub.com/api-docs/) and [GitHub](https://github.com/openintegrationhub/openintegrationhub/tree/master/services/component-repository).

#### Get All Components

![GET](https://img.shields.io/badge/Operation-GET-brightgreen.svg)

**Postman request name:** Get user components

Steps to perform:

1. Click on `Send`

---

#### Get a Component by Id

![GET](https://img.shields.io/badge/Operation-GET-brightgreen.svg)

**Postman request name:** Get a component by id

Steps to perform:

1. Replace the `{COMPONENT_ID}` placeholder with an existing component id
2. Click on `Send`

---

#### Create a new Component

![POST](https://img.shields.io/badge/Operation-POST-yellow.svg)

**Postman request name:** Post a new component

1. Go to the `Body` tab
2. Add a new component (exemplary components can be found at the end of this document)
3. Click on `Send`

_Note:_ The image must have a valid _tag_. E.g. openintegrationhub/ms-office-adapter:latest

_Hint:_ There is a predefined body that can be used.

---

#### Update a Component by Id

![PATCH](https://img.shields.io/badge/Operation-PATCH-lightgrey.svg)

**Postman request name:** Update a component by id

1. Replace the `{COMPONENT_ID}` placeholder with an existing component id
2. Go to the `Body` tab
3. Add a the updated component(exemplary components can be found at the end of this document)
4. Click on `Send`

_Hint:_ Partial updates are possible.

_Hint:_ There is a predefined body that can be used.

---

#### Delete a Component by Id

![DELETE](https://img.shields.io/badge/Operation-DELETE-red.svg)

**Postman request name:** Delete a component by id

1. Replace the `{COMPONENT_ID}` placeholder with an existing component id
2. Click on `Send`

---

### Identity and Access Management

**Attention:** IAM operations require admin rights.

For further information on the underlying identity and access management please visit the [API docs](http://iam.openintegrationhub.com/api-docs/) and [GitHub](https://github.com/openintegrationhub/openintegrationhub/tree/master/services/iam).

#### Login

![POST](https://img.shields.io/badge/Operation-POST-yellow.svg)

**Postman request name:** Login

1. Go to the `Params` tab
2. Enter your username as the value for key:`username`
3. Enter your password as the value for key:`password`
4. Click on send

_Note_: As described in the [setup](#setup) section, there is no need to login manually as the pre-request script takes care of receiving and renewing the token.

---

#### Get all Users

![GET](https://img.shields.io/badge/Operation-GET-brightgreen.svg)

**Postman request name:** Get All Users

Steps to perform:

1. Click on `Send`

---

#### Create a new User

![POST](https://img.shields.io/badge/Operation-POST-yellow.svg)

**Postman request name:** Post a new component

1. Go to the `Body` tab
2. Add a new user (exemplary components can be found at the end of this document)
3. Click on `Send`

_Hint:_ There is a predefined body that can be used.

---

#### Delete a User by Id

![DELETE](https://img.shields.io/badge/Operation-DELETE-red.svg)

**Postman request name:** Delete a user

1. Replace the `{USER_ID}` placeholder with an existing user id
2. Click on `Send`

---

#### Update a User by Id

![PATCH](https://img.shields.io/badge/Operation-PATCH-lightgrey.svg)

**Postman request name:** Patch a user

1. Replace the `{USER_ID}` placeholder with an existing component id
2. Go to the `Body` tab
3. Add a the updated user (exemplary components can be found at the end of this document)
4. Click on `Send`

_Hint:_ Partial updates are possible.

---

### Metadata

#### Get all domains

![GET](https://img.shields.io/badge/Operation-GET-brightgreen.svg)

**Postman request name:** Get All Users

Steps to perform:

1. Click on `Send`

---

#### Get a Domain by Id

![GET](https://img.shields.io/badge/Operation-GET-brightgreen.svg)

**Postman request name:** Get a Domain by Id

Steps to perform:

1. Replace the `{Domain_ID}` placeholder with an existing domain id
2. Click on `Send`

---

#### Get Models for specific Domain

![GET](https://img.shields.io/badge/Operation-GET-brightgreen.svg)

**Postman request name:** Get Models for specific Domain

Steps to perform:

1. Replace the `{Domain_ID}` placeholder with an existing domain id
2. Click on `Send`

---

#### Get Model for specific Domain by Uri

![GET](https://img.shields.io/badge/Operation-GET-brightgreen.svg)

**Postman request name:** Get Models for specific Domain by Uri

Steps to perform:

1. Replace the `{Domain_ID}` placeholder with an existing domain id
2. Replace the `{URI}` placeholder with an existing model uri
3. Click on `Send`

---

#### Update a Domain by Id

![PUT](https://img.shields.io/badge/Operation-PUT-blue.svg)

**Postman request name:** Update a Domain by Id

Steps to perform:

1. Replace the `{Domain_ID}` placeholder with an existing domain id
2. Add a valid body
3. Click on `Send`

_Hint: There is a predefined body that can be used._

---

#### Import new Models

![POST](https://img.shields.io/badge/Operation-POST-yellow.svg)

**Postman request name:** Import new Models

Steps to perform:

1. Replace the `{Domain_ID}` placeholder with an existing domain id
2. Add a valid body
3. Click on `Send`

_Hint: There is a predefined body that can be used._

---

#### Update model by Uri

![PUT](https://img.shields.io/badge/Operation-PUT-blue.svg)

**Postman request name:** Update model by Uri
Steps to perform:

1. Replace the `{Domain_ID}` placeholder with an existing domain id
2. Replace the `{URI}` placeholder with an existing model uri
3. Add a valid body
4. Click on `Send`

_Hint: There is a predefined body that can be used._

---

#### Delete a Model by Uri

![DELETE](https://img.shields.io/badge/Operation-DELETE-red.svg)

**Postman request name:** Delete a user

1. Replace the `{Domain_ID}` placeholder with an existing domain id
2. Replace the `{URI}` placeholder with an existing model uri
3. Click on `Send`

---

## Examples

### Flow Examples

This example synchronizes contact data from SnazzyContacts to Wice and to Webhook.Site.

In order to display your data correctly it is necessary that you perform the subsequent steps before you post the flow.

1. Go to webhook.site
2. Copy the link to the clipboard
3. Exchange the predefined uri in the Code-Component with the one you copied to your clipboard
4. Add username and password for the node with id `snazzy`
5. Add username, password and client_name for the node with id `wice_adapter`

_Note:_ If you don't have a test account for one (SnazzyContacts/WiceCRM) or both applications please request one from [hschmidthh](https://github.com/hschmidthh) EMail:<hschmidt@wice.de>

Step3:
![webhookSiteUri](assets/webhookSiteUri.PNG)

Step4:

![snazzyCredentials](assets/snazzyCredentials.PNG)

Step5:

![wiceCredentials](assets/wiceCredentials.PNG)

Flow:

```json
{
   "name":"SnazzyToWiceAndCodeComponent",
   "description":"This flow polls for persons and pushed them to webhook.site and wice crm.",
   "graph":{
      "nodes":[
         {
            "id":"step_1",
            "componentId":"5ce27d453860ff001a034274",
            "name":"",
            "function":"getPersonsPolling",
            "description":"",
            "fields":{
               "username":"",
               "password":""
            }
         },
         {
            "id":"step_2",
            "componentId":"5ce27f4b3860ff001a034277",
            "name":"",
            "function":"transformPersonToOih",
            "description":""
         },
         {
            "id":"step_3",
            "componentId":"5ce27f2d3860ff001a034276",
            "name":"",
            "function":"transformPersonFromOih",
            "description":""
         },
         {
            "id":"step_4",
            "componentId":"5ce27d653860ff001a034275",
            "name":"",
            "function":"upsertPerson",
            "description":"",
            "fields":{
               "username":"",
               "password":"",
               "client_name":""
            }
         },
         {
            "id":"step_5",
            "componentId":"5cde85443860ff001a034273",
            "name":"",
            "function":"execute",
            "description":"",
            "fields":{
               "code":"function* run() {console.log('Calling external URL');yield request.post({uri: 'http://webhook.site/ae17e5b3-1da6-4d2b-b664-4787ad5953d5', body: msg.body, json: true});}"
            }
         }
      ],
      "edges":[
         {
            "source":"step_1",
            "target":"step_2"
         },
         {
            "source":"step_2",
            "target":"step_3"
         },
         {
            "source":"step_3",
            "target":"step_5"
         },
         {
            "source":"step_3",
            "target":"step_4"
         }
      ]
   },
   "type":"ordinary",
   "cron":"*/3 * * * *",
   "owners":[

   ]
}
```

### Component Examples

This is an example microsoft office component that can be used to test the POST endpoint for adding a new component.

```json
{
  "data": {
    "name": "MS Office transformer",
    "description": "MS Office transformer for the OIH",
    "access": "public",
    "descriptor": {},
    "distribution": {
      "type": "docker",
      "image": "openintegrationhub/ms-office-transformer:latest"
    }
  }
}
```
