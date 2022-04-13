---
layout: default
title: Information Security
parent: Programming
nav_order: 6
---

# Information Security

**Purpose**

To define the base level information security policies at Countable and identify specific processes.

**Scope** 

Currently a stub; will first include baseline principles to keep in mind, then a more formal set of processes and checklists.

TODO
{: .label .label-yellow }

move actual policies we defined into here from Docs

# General Information Security Practices

  * Passwords should have [44 bits of entropy](https://xkcd.com/936/). Use a short phrase or 12+ random characters.
  * With regard to sensitive information, observe the principle of least privilege. This means provide as little access as possible, but enough as necessary to get work done.
  * Avoid storing sensitive information on disk. Keep it in cloud based accounts.
  * For laptops - please encrypt your disk if you have sensitiive information or access credentials for sensitive information stored there. DevOps staff must have encrypted disks with passphrase (entropy as above)
  * Working from WiFi outside your home network? Use a VPN.
