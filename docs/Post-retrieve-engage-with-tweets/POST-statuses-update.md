---
layout: default
title: POST statuses/update
parent: Post, retrieve, and engage with tweets
nav_order: 1
---
1.TOC
{:toc}

# POST statuses/update



Updates the authenticating user's current status, also known as Tweeting.

For each update attempt, the update text is compared with the authenticating user's recent Tweets. Any attempt that would result in duplication will be blocked, resulting 403 error. A user cannot submit the same status twice in a row


## Resource URL

```
https://api.twitter.com/1.1/statuses/update.json
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