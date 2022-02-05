---
layout: default
title: Guilds vs DAO vs Governance 2.0
parent: Guilds
grand_parent: DXgov
nav_order: 3

---

# Guilds vs DAO vs Governance 2.0?

## Short answer: 
Guilds are a small tool and stepping stone to governance 2.0 where governance 2.0 is the larger step forward it’s name suggests it is making a much more extensive DAO framework. 

![Governance evolution map](/assets/images/dxgov/governanceEvolution.png)

## Longer answer: 
### Current state of governance
There are few DAOs capable of claiming over two years of on-chain governance in a maximally decentralized way. Due to this DXdao has a slightly different view of DAOs than most. To understand our governance platforms its worth taking a look at the current state of governance in the web3 space. The go to standard of governance is a liquid token governance model, it can almost be guaranteed that most defi coins fit into this form of governance. And for good reason, its the most simple and easy solution available due to the existing distribution and understanding of ERC20 tokens. But it’s main problem is that it creates plutocracies. Its fair to call this governance 1.0

#### Side note on delegation
Recently delegation has become a popular stop gap to improve liquid token voting by making the liquid token part only a vote for delegatees who then use that power collectively. This is not unlike current governance in nation-state level politics, however that doesn't mean it s a great solution. Although it can work in specific cases, for the most part delegation turns into a closed circle of decision makers who gained their position by popularity or campaigning. Instead of addressing issues of current politics, this brings politics into governance creating very indirect cumbrous political channels for all types of change. 

### The past two years at DXdao
We have been using the DAOstack framework for our DAO for over 2 years. Now unsupported this way of governance was a completely fresh take on what governance could be. Combining non-transferable [**reputation based voting power**]({% link docs/Governance/REP/index.md %}) and [**holographic consensus**]({% link docs/Products/dxgov/DXvote/holo.md %}) this architecture was worlds apart from standard DAOs. Its tempting to call this Governance 1.5 as an iteration on liquid token governance models, however as can be seen from the diagram it may be better to think of it as an offshoot, something like “Governance Experiment X”. 

### Guilds - extending liquid token voting
As can be seen from the diagram above, guilds exist very much within the definition of liquid token governance. It is most easily understood by looking at the direction the space went with this form of governance. The current most popular option is via a platform called “Snapshot” in combination with “Gnosis safe" multisigs improves the user experience (UX) of governance with some key features like free signed voting, simplified actions and close integration with multisigs. However in return it sacrifices decentralization by utilizing centralized database systems and multisigs controlled by a few select individuals. 
Guilds are a simple liquid token based governance tool that addresses many of the centralized issues plaguing current governance without over complicating things. We developed it as a tool for governing individual applications inside our DAO and it has grown to become a general tool which we even view as a stepping stone to governance 2.0.
Augur (link) is using a guild to launch an initial DAO to learn and grow their DAO before aiming to take the next steps into Governance 2.0.
On a technical level guilds offer simple governance contracts but with the ability to manage their own funds on chain as we believe any real DAO should. The guild itself can also act, so we have not only signal proposals that rely on trust of ms signers but instead, if a proposal passes certain actions will be executed by the guild. We also manage free signed voting but in a far more open and transparent way. We also have many growing implementations which add specific features to the base ERC20Guild.
So TLDR; guilds are a simple improved liquid token governance tool 

![DXvote-Guilds Venn diagram](/assets/images/dxgov/venn.png)


### Governance 2.0
This wont be a full explanation of gov 2.0, thats a little beyond this high level overview’s scope. Governance 2.0 takes the best parts of the DAOstack architecture and combines it with the standard liquid token voting to form what we view as the next generation of governance. This means we have voting power calculated from multiple metrics (mainly reputation and liquid token voting), holographic consensus and more. 
The main difference here is that full DAOs using governance 2.0 have a much more complex system with many configurations to govern. With new wallet schemes we can have individual treasuries inside the DAO for specific purposes that have their own configurations to move faster or more securely. 
So TLDR; Gov 2.0 and by extension DXvote is a much larger framework of lots of contracts for more involved governance. 
