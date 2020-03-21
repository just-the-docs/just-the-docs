---
layout: default
title: Standard Search API
nav_order: 103
permalink: /docs/standard-search-api
---

## Standard Search API

This api returns a collection of relevant tweets matching the specific query.

## Resource URL

```
https://api.twitter.com/1.1/search/tweets.json

```

## Resource Information

|Resource|Information|
|:-------|:----------|
|Response formats|JSON|
|Requires authenctication?| Yes|
|Rate limited?|Yes|
| Requests / 15-min window (user auth)|180|
|Requests / 15-min window (app auth)|450|

## Parameters

|Name|Required|Description|Default Value| Example|
|:---|:-------|:----------|:------------|:-------|
|q|required|A UTF-8, URL-encoded search query of 500 characters maximum, including operators. Queries may additionally be limited by complexity.||`@narodio`|
|lang|optional|Restricts tweets to the given language, given by an ISO 639-1 code. Language detection is best-effort.||`eu`|
|count|optional| The number of tweets to return per page, up to a maximum of 100. Defaults to 15. This was formerly the "rpp" parameter in the old Search API.||`100`|
|until|optional|Returns tweets created before the given date. Date should be formatted as YYYY-MM-DD. Keep in mind that the search index has a 7-day limit. In other words, no tweets will be found for a date older than one week.||`2015-07-19`|
|max_id|optional|Returns results with an ID less than (that is, older than) or equal to the specified ID.||`54321`|

## Exapmle Request

Request made to this API look like this:

```
$ curl --request GET 
 --url 'https://api.twitter.com/1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2' 
 --header 'authorization: OAuth oauth_consumer_key="consumer-key-for-app", 
 oauth_nonce="generated-nonce", oauth_signature="generated-signature", 
 oauth_signature_method="HMAC-SHA1", oauth_timestamp="generated-timestamp", 
 oauth_token="access-token-for-authed-user", oauth_version="1.0"'

```

## Example Response

```
{
  "statuses": [
    {
      "created_at": "Mon May 06 20:01:29 +0000 2019",
      "id": 1125490788736032770,
      "id_str": "1125490788736032770",
      "text": "Today's new update means that you can finally add Pizza Cat to your Retweet with comments! Learn more about this ne… https://t.co/Rbc9TF2s5X",
      "truncated": true,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https://t.co/Rbc9TF2s5X",
            "expanded_url": "https://twitter.com/i/web/status/1125490788736032770",
            "display_url": "twitter.com/i/web/status/1…",
            "indices": [
              117,
              140
            ]
          }
        ]
      },
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "source": "<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 2244994945,
        "id_str": "2244994945",
        "name": "Twitter Dev",
        "screen_name": "TwitterDev",
        "location": "Internet",
        "description": "Your official source for Twitter Platform news, updates & events. Need technical help? Visit https://t.co/mGHnxZU8c1 ⌨️ #TapIntoTwitter",
        "url": "https://t.co/FGl7VOULyL",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/FGl7VOULyL",
                "expanded_url": "https://developer.twitter.com/",
                "display_url": "developer.twitter.com",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": [
              {
                "url": "https://t.co/mGHnxZU8c1",
                "expanded_url": "https://twittercommunity.com/",
                "display_url": "twittercommunity.com",
                "indices": [
                  93,
                  116
                ]
              }
            ]
          }
        },
        "protected": false,
        "followers_count": 501947,
        "friends_count": 1473,
        "listed_count": 1507,
        "created_at": "Sat Dec 14 04:35:55 +0000 2013",
        "favourites_count": 2186,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": true,
        "verified": true,
        "statuses_count": 3389,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": null,
        "profile_background_color": "null",
        "profile_background_image_url": "null",
        "profile_background_image_url_https": "null",
        "profile_background_tile": null,
        "profile_image_url": "null",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/880136122604507136/xHrnqf1T_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/2244994945/1498675817",
        "profile_link_color": "null",
        "profile_sidebar_border_color": "null",
        "profile_sidebar_fill_color": "null",
        "profile_text_color": "null",
        "profile_use_background_image": null,
        "has_extended_profile": null,
        "default_profile": false,
        "default_profile_image": false,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "null"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": true,
      "quoted_status_id": 1125479034513645569,
      "quoted_status_id_str": "1125479034513645569",
      "quoted_status": {
        "created_at": "Mon May 06 19:14:46 +0000 2019",
        "id": 1125479034513645569,
        "id_str": "1125479034513645569",
        "text": "It's easy to express yourself by Retweeting with a comment. What if you could take it a step further and include me… https://t.co/YTqpNZZ8M9",
        "truncated": true,
        "entities": {
          "hashtags": [],
          "symbols": [],
          "user_mentions": [],
          "urls": [
            {
              "url": "https://t.co/YTqpNZZ8M9",
              "expanded_url": "https://twitter.com/i/web/status/1125479034513645569",
              "display_url": "twitter.com/i/web/status/1…",
              "indices": [
                117,
                140
              ]
            }
          ]
        },
        "metadata": {
          "iso_language_code": "en",
          "result_type": "recent"
        },
        "source": "<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
          "id": 17874544,
          "id_str": "17874544",
          "name": "Twitter Support",
          "screen_name": "TwitterSupport",
          "location": "Twitter HQ",
          "description": "Your official source for Twitter Support. We're available 24/7 via Direct Message to answer account questions. Follow us for tips, tricks, and announcements.",
          "url": "https://t.co/heEvRrl4yN",
          "entities": {
            "url": {
              "urls": [
                {
                  "url": "https://t.co/heEvRrl4yN",
                  "expanded_url": "https://help.twitter.com",
                  "display_url": "help.twitter.com",
                  "indices": [
                    0,
                    23
                  ]
                }
              ]
            },
            "description": {
              "urls": []
            }
          },
          "protected": false,
          "followers_count": 5861908,
          "friends_count": 17,
          "listed_count": 15129,
          "created_at": "Thu Dec 04 18:51:57 +0000 2008",
          "favourites_count": 313,
          "utc_offset": null,
          "time_zone": null,
          "geo_enabled": true,
          "verified": true,
          "statuses_count": 27955,
          "lang": "en",
          "contributors_enabled": false,
          "is_translator": false,
          "is_translation_enabled": null,
          "profile_background_color": "null",
          "profile_background_image_url": "null",
          "profile_background_image_url_https": "null",
          "profile_background_tile": null,
          "profile_image_url": "null",
          "profile_image_url_https": "https://pbs.twimg.com/profile_images/941807338171777025/PRP6vwDq_normal.jpg",
          "profile_banner_url": "https://pbs.twimg.com/profile_banners/17874544/1499274456",
          "profile_link_color": "null",
          "profile_sidebar_border_color": "null",
          "profile_sidebar_fill_color": "null",
          "profile_text_color": "null",
          "profile_use_background_image": null,
          "has_extended_profile": null,
          "default_profile": false,
          "default_profile_image": false,
          "following": false,
          "follow_request_sent": false,
          "notifications": false,
          "translator_type": "null"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 1466,
        "favorite_count": 3990,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "lang": "en"
      },
      "retweet_count": 20,
      "favorite_count": 44,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    },
    {
      "created_at": "Sat May 04 15:00:33 +0000 2019",
      "id": 1124690280777699328,
      "id_str": "1124690280777699328",
      "text": "If you're at #Pycon2019 and you use Twitter data or the Twitter API with your code, we are running an Open Space in… https://t.co/mVLIzEr9Gx",
      "truncated": true,
      "entities": {
        "hashtags": [
          {
            "text": "Pycon2019",
            "indices": [
              13,
              23
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https://t.co/mVLIzEr9Gx",
            "expanded_url": "https://twitter.com/i/web/status/1124690280777699328",
            "display_url": "twitter.com/i/web/status/1…",
            "indices": [
              117,
              140
            ]
          }
        ]
      },
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "source": "<a href="http://twitter.com" rel="nofollow">Twitter for  iPhone</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 2244994945,
        "id_str": "2244994945",
        "name": "Twitter Dev",
        "screen_name": "TwitterDev",
        "location": "Internet",
        "description": "Your official source for Twitter Platform news, updates & events. Need technical help? Visit https://t.co/mGHnxZU8c1 ⌨️ #TapIntoTwitter",
        "url": "https://t.co/FGl7VOULyL",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/FGl7VOULyL",
                "expanded_url": "https://developer.twitter.com/",
                "display_url": "developer.twitter.com",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": [
              {
                "url": "https://t.co/mGHnxZU8c1",
                "expanded_url": "https://twittercommunity.com/",
                "display_url": "twittercommunity.com",
                "indices": [
                  93,
                  116
                ]
              }
            ]
          }
        },
        "protected": false,
        "followers_count": 501947,
        "friends_count": 1473,
        "listed_count": 1507,
        "created_at": "Sat Dec 14 04:35:55 +0000 2013",
        "favourites_count": 2186,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": true,
        "verified": true,
        "statuses_count": 3389,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": null,
        "profile_background_color": "null",
        "profile_background_image_url": "null",
        "profile_background_image_url_https": "null",
        "profile_background_tile": null,
        "profile_image_url": "null",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/880136122604507136/xHrnqf1T_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/2244994945/1498675817",
        "profile_link_color": "null",
        "profile_sidebar_border_color": "null",
        "profile_sidebar_fill_color": "null",
        "profile_text_color": "null",
        "profile_use_background_image": null,
        "has_extended_profile": null,
        "default_profile": false,
        "default_profile_image": false,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "null"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 12,
      "favorite_count": 27,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    }
  ],
  "search_metadata": {
    "completed_in": 0.047,
    "max_id": 1125490788736032770,
    "max_id_str": "1125490788736032770",
    "next_results": "?max_id=1124690280777699327&q=from%3Atwitterdev&count=2&include_entities=1&result_type=mixed",
    "query": "from%3Atwitterdev",
    "refresh_url": "?since_id=1125490788736032770&q=from%3Atwitterdev&result_type=mixed&include_entities=1",
    "count": 2,
    "since_id": 0,
    "since_id_str": "0"
  }
}

```