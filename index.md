---
layout: default
title: Home
nav_order: 1
description: "Just the Docs is a responsive Jekyll theme with built-in search that is easily customizable and hosted on GitHub Pages."
permalink: /
last_modified_date: 2020-04-27T17:54:08+0000
---

# Site NAP
{: .fs-9 }

+ Mission Statement
    + User story
+ Product Portfolio
+ Business Model


---
# Mission and Philosophy
To democratize the development of sustainable and scalable infrastructure.

### Stakeholders: Anybody participating in the blocker ecosystem.

Anybody who contributes to the system has a stake. Design using a modular language for sustainability.

## User Stories

### Category A - The Consuming User: (analagous to a buyer on Amazon)
The user who provisions and ultimately purchases BLOCKs to be provisioned.

### Category B - The Contributor User:  (analagous to a purchaser on Amazon)
These will largely be makers and craftspeople.

For example 



---

# Portfolio

## BlockerHub
+ Dashboard
    + Telemetry
    + Anonymized proximal data  (feedback for module contributors)
+ Builder
+ Browser

## CLI client
+ blockctl  ( our fork of Kubernetes for orchestrating Blockerfiles )
+ Blocker build

###### Reference: Kubernetes to Blockernetes

| Kubernetes | Blockernetes | Description |
|------------|--------------| ----------- |
| Pod        | Mod          | Atomic logical collection of functionality |
| Node       | Abode        | A physical container in which modules are installed |
| Svc        | Svc          | A service rendered by one or more Pods/Mods |
| Deploy     | Deploy       | A deploment is a description |

Get BLOCKs 
```bash
$ blockctl get blocks
```

Get services 
```bash
$ blockctl get svc
```





{: .fs-6 .fw-300 }

[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/pmarsceill/just-the-docs){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Business Model

#### Commisions on Sales - payment for service rendered of Logistics solving.
The core service that the Blocker ecosystem (including Core Engine API server, Clients i.e. BlockerHub)
Provides is massive logistical optimization.  The profits there are passed down to the User categories -
Consumers (provisioners), and Contributors (craftspeople).



### License

Decide which parts of the system are public and open for community PRs?
 
 Which licenses for which parts?  [MIT license](https://github.com/pmarsceill/just-the-docs/tree/master/LICENSE.txt).

### Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. Read more about becoming a contributor in [our GitHub repo](https://github.com/pmarsceill/just-the-docs#contributing).

#### Thank you to the contributors of Just the Docs!

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"/></a>
  </li>
{% endfor %}
</ul>

### Code of Conduct

Just the Docs is committed to fostering a welcoming community.

[View our Code of Conduct](https://github.com/pmarsceill/just-the-docs/tree/master/CODE_OF_CONDUCT.md) on our GitHub repository.
