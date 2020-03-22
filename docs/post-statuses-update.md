---
layout: default
title: POST statuses/update
nav_order: 6
permalink: /docs/post-status-update
---
1.TOC
{:toc}

# POST statuses/update



Updates the authenticating user's current status, also known as Tweeting.

We can use `oauth_token` obtained in Authentication to update the status on the user's behalf.


## Resource URL

```
https://api.twitter.com/1.1/statuses/update.json
```

## End point for status update 

In this end point, we are going to use `axios` library to send the request to twitter api and `express.json()` middleware to parse the json data in the request.

```
const axios = require('axios')
const express = require('express')

const app = express()

app.use(express.json())

app.post('./statusUpdate',(req,res) => {
  const status = req.body.status
  const data = {
    'status': 'Hello'
  }
  const url = 'https://api.twitter.com/1.1/statuses/update.json'
  axios.post(url, {
      headers: {
          'Authorization': 'oauth',
          'oauth_consumer_key':'cChZNFj6T5R0TigYB9yd1w',
          'oauth_token':'7588892-kagSNqWge8gB1WwE3plnFsJHAZVfxWD7Vb57p0b4',
      },
      data
  }) 
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
      console.log(error)
  })
})
```
## Resource Information

| Resource | Information |
|:----------------|:----|
|Response formats | JSON|
|Requires authentication?|Yes(user context only)|
|Rate limited?|Yes|
|Requests/3-hour window| 300 per user/300 per app|

## Parameters

|Name|Required|Description|Default Value|Example|
|:---|:-------|:----------|:------------|:------|
|status|required| The text of the status update.| | |
|in_reply_to_status_id|optional|The ID od an existing status that the update is in reply to.|||
|attachment_url|optional|In order for a URl to not be counted in the status body of an extended tweet, provide a URL as a Tweet attachment.|| `https://twitter.com/andypiper/status/903615884664725505`|
|media_ids|optional|A comma delimited of media_ids to associate with the tweet ||`	471592 142565 957632`|
## Example Request

You can use any REST tool such Postman and Insomnia for request to api. Sample Request look like this:

```
curl -XPOST 
  --url 'https://api.twitter.com/1.1/statuses/update.json?status=hello' 
  --header 'authorization: OAuth
  oauth_consumer_key="oauth_customer_key",
  oauth_nonce="generated_oauth_nonce",
  oauth_signature="generated_oauth_signature",
  oauth_signature_method="HMAC-SHA1",
  oauth_timestamp="generated_timestamp",
  oauth_token="oauth_token",
  oauth_version="1.0"'

```

You may want to change the status from 'hello' to something differnt.

## Example Response

After you post the request succesfully, you should get back something that look like this:

```
{
  "created_at": "Wed Oct 10 20:19:24 +0000 2018",
  "id": 1050118621198921700,
  "id_str": "1050118621198921728",
  "text": "To make room for more expression, we will now count all emojis as equal—including those with gender‍‍‍ ‍‍and skin t… https://t.co/MkGjXf9aXm",
  "source": "<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>",
  "truncated": true,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 6253282,
    "id_str": "6253282",
    "name": "Twitter API",
    "screen_name": "TwitterAPI",
    "location": "San Francisco, CA",
    "url": "https://developer.twitter.com",
    "description": "The Real Twitter API. Tweets about API changes, service issues and our Developer Platform. Don't get an answer? It's on my website.",
    "translator_type": "null",
    "derived": {
      "locations": [
        {
          "country": "United States",
          "country_code": "US",
          "locality": "San Francisco",
          "region": "California",
          "sub_region": "San Francisco County",
          "full_name": "San Francisco, California, United States",
          "geo": {
            "coordinates": [
              -122.41942,
              37.77493
            ],
            "type": "point"
          }
        }
      ]
    },
    "protected": false,
    "verified": true,
    "followers_count": 6172196,
    "friends_count": 12,
    "listed_count": 13003,
    "favourites_count": 31,
    "statuses_count": 3650,
    "created_at": "Wed May 23 06:01:13 +0000 2007",
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": false,
    "lang": "en",
    "contributors_enabled": false,
    "is_translator": null,
    "profile_background_color": "null",
    "profile_background_image_url": "null",
    "profile_background_image_url_https": "null",
    "profile_background_tile": null,
    "profile_link_color": "null",
    "profile_sidebar_border_color": "null",
    "profile_sidebar_fill_color": "null",
    "profile_text_color": "null",
    "profile_use_background_image": null,
    "profile_image_url": "null",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/942858479592554497/BbazLO9L_normal.jpg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/6253282/1497491515",
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "is_quote_status": false,
  "extended_tweet": {
    "full_text": "To make room for more expression, we will now count all emojis as equal—including those with gender‍‍‍ ‍‍and skin tone modifiers 👍🏻👍🏽👍🏿. This is now reflected in Twitter-Text, our Open Source library. nnUsing Twitter-Text? See the forum post for detail: https://t.co/Nx1XZmRCXA",
    "display_text_range": [
      0,
      277
    ],
    "entities": {
      "hashtags": [],
      "urls": [
        {
          "url": "https://t.co/Nx1XZmRCXA",
          "expanded_url": "https://twittercommunity.com/t/new-update-to-the-twitter-text-library-emoji-character-count/114607",
          "display_url": "twittercommunity.com/t/new-update-t…",
          "unwound": {
            "url": "https://twittercommunity.com/t/new-update-to-the-twitter-text-library-emoji-character-count/114607",
            "status": 200,
            "title": "New update to the Twitter-Text library: Emoji character count",
            "description": "Over the years, we have made several updates to the way that people can communicate on Twitter. One of the more notable changes made last year was to increase the number of characters per Tweet from 140 to 280 characters. Today, we continue to expand people’s ability to express themselves by announcing a change to the way that we count emojis. Due to the differences in the way written text and emojis are encoded, many emojis (including emojis where you can apply gender and skin tone) have count..."
          },
          "indices": [
            254,
            277
          ]
        }
      ],
      "user_mentions": [],
      "symbols": []
    }
  },
  "quote_count": 0,
  "reply_count": 0,
  "retweet_count": 0,
  "favorite_count": 0,
  "entities": {
    "hashtags": [],
    "urls": [
      {
        "url": "https://t.co/MkGjXf9aXm",
        "expanded_url": "https://twitter.com/i/web/status/1050118621198921728",
        "display_url": "twitter.com/i/web/status/1…",
        "indices": [
          117,
          140
        ]
      }
    ],
    "user_mentions": [],
    "symbols": []
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false,
  "filter_level": "low",
  "lang": "en"
}
```
