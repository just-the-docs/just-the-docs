---
layout: default
title: Hashing 
parent: DXvote
nav_order: 4
has_children: true
---

# Hashing

Since we access our frontends via ENS and store them on ipfs we use hashes to uniquely identify data and code.

Download ipfs cli tool from here: https://docs.ipfs.io/install/command-line/



## FE release hashing
Ensure a fresh checkout from origin/master and that you are using the correct node version
- `yarn`
- `rm -r build && yarn build && ipfs add build -r -n`
- Check the final output (the string behind `build`) is what others get or what the github hash build outputs (https://github.com/DXgovernance/dxvote/actions/workflows/hash-build.yml)
- Update ENS
  - Resolver: 0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41
  - Node: 0x1b78f0d3ab2b6566c5adf84daff9bd2009734272fa207a1b0dbafa5e103052a8
  - New content hash: Convert ipfs hash from above commands to content hash and add `Ox` to the start

## Cache update hashing
- Create a new branch 
- Update `buildConfig` object in `scripts/buildCache.ts` to the most recent block number for each chain
  - Mainnet (https://etherscan.io/blocks)
  - Gnosis chain (https://blockscout.com/xdai/mainnet/blocks)
  - Arbitrum (https://arbiscan.io/blocks)
- Set reset to `true` for each chain you want to fully reset (takes a long time)
- Push block number changes to github
- `yarn`
- `rm -r cache && yarn build-cache`
- Upload to pinata and save the files
- Compare the final output to what someone else running the same command on the same block numbers gets
- Update ENS subdomain
  - Resolver: 0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41
  - Node: 0x331cd7edaf3b957429977bd70caeec3e325661ef642c3d06255445f2c4051bc3
  - New content hash: New content hash: Convert ipfs hash from above commands to content hash and add `Ox` to the start

## IPFS hash -> Content hash
- Go to https://content-hash.surge.sh/
- Add ipfs hash to first input
- Press "Encode"
- Output is your content hash

![Content hash](/assets/images/dxgov/contentHash.png)