---
layout: default
title: New Wallet Schemes
parent: DXvote
nav_exclude: true
---

# I’ve heard new wallet schemes fix everything - why?
The new wallet schemes take concepts originally from the DAOstack architecture and build on them to give us better tools for governance. Most of the logic here comes from the programming concept “Separation of concerns”, except in relation to governance. 

With new wallet schemes we have the ability to:
- Abstract funds away from avatar treasury
- Each scheme has the ability to send funds only from 
- Configurable vote params mean more specific security for specific use cases
- More configuration
- We can set limits for example on maximum mintable REP per proposal
- More permissions
- We can dial in exactly what permissions to send and interact with contracts we want specific schemes to have

![Wallet architecture](/assets/images/dxgov/architecture.png)

In this image we have a scheme called Master Wallet and one called Quick Wallet, all schemes use the same DXD Voting Machine and Permission Registry. The Master Wallet will have access to funds held in the DXdao avatar and will be able to create/remove other schemes, set the permissions to them and do mostly anything. We can expect this scheme to be slower and have strong security requirements. The Quick Wallet scheme will have access to funds held by the scheme itself, with less funds at risk it can be configured to make decisions faster.

The quick wallet scheme is just an example, there could be any number of these schemes with specific permissions and treasuries for specific functions. 

## Example
We will always have a scheme capable of directly controlling the avatar that has the most control and power over the DAO. This is closest to what legacy schemes looked like and they were always slow due to needing maximal security as every proposal had the potential to access avatar funds. Now we can have even more security for schemes with access to avatar but we can deploy individual schemes designed to move fast and be used for a singular purpose. 

We can deploy schemes meant for specific tasks such as one for Contributor Payments, ENS, SWPR, etc
