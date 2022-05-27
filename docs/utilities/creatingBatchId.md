---
layout: default
title: Create BatchId
parent: Creating Flowcode
nav_order: 2
---

# Create BatchId
{: .no_toc }

After creating the studioConfigId for designed flowcode , we need to create batchid using that studioConfigId to create and register the flowcode at Flowcode.com

Creating batchId is similar process of creating studioConfigId because both are graphql api just parameters are different.

The parameters are given bellow
 
 - active: Boolean = true
 - anonymousSessionId: UUID
- assetLabels: [String]
- campaignName: CombinedGeneratorCampaigns
- creationSource: CreationSource
- isCollectible: Boolean = false
- isStaticCode: Boolean = false
- nickname: String = ""
- partialIds: [UUID] = []
- redirectDomain: String
- redirectType: RedirectType!
- studioConfigId: UUID
- url: String!
- userId: ID

A snippet of the query and response are given bellow.

```graphql
### createBatch request
mutation createBatch {
  createBatch(studioConfigId: "ca947a21-9a81-4fa8-9b60-dd47c66e695c", redirectType: URL, url: "test.com", creationSource: VIDEO_TOOL) {
    ok
    batch{
      id
    }
  }
}
### result
{
  "data": {
    "createBatch": {
      "ok": true,
      "batch": {
        "id": "QmF0Y2hEamFuZ29UeXBlOmVSWHFH"
      }
    }
  }
}
```
Use This batch Id the identify the flowcode in flowcode analytics page.
we can see the how many scans are made, when it is created, which user etc in tha analytics
