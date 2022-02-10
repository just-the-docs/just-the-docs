---
layout: default
title: Setting Pinata
parent: DXvote
grand_parent: Governance
nav_order: 3

---

# Setting your pinata key to ensure IPFS uploading
## Explanation 
We currently rely mostly on pinata to upload our proposal metadata so for best and most consistent results we ask you to use your own pinata keys so you have less reliance on us.

We will soon have added resiliency via web3.storage which will make this unnecessary but for now setting your pinata keys helps ensure you can make proposals with proper titles and descriptions hosted on IPFS.

## Instructions
- Sign up for free at https://www.pinata.cloud/
![Pinata sign up](/assets/images/dxgov/pinataSignUp.png)
- Go to top right profile icon and select "API Keys"
![Pinata menu](/assets/images/dxgov/pinataMenu.png)
- New key
- Select admin and give it a name
![API key setup](/assets/images/dxgov/pinataApiKeySetting.png)
- Copy the largest key labelled "JWT"
![API key setup](/assets/images/dxgov/pinataCopyKey.png)
- Click the top right settings icon in DXvote OR this <a href="https://dxvote.eth.link/#/config" target="_blank">DXvote config</a>
- Enter KWT key in pinata input and save
![API key setup](/assets/images/dxgov/inputApiKey.png)
