---
layout: default
title: Client Data Protection
parent: Clients
grand_parent: Operations
nav_order: 5
---

# Client Data Protection

**Purpose**

Commit our data protection principles and practices to paper. 

**Scope**

Covers principles, policies, endpoint physical protection policy and web app security.

## Client Data Protection

Covers principles, policies, and web app security to identify what we do
to protect client data, and all data in general, at Countable.

### Principles

As an open transparent company, we want to minimize the number of assets
which need protection. Here's a list of those we can't make exceptions
for:

  - Any real financial numbers.
  - Any client's database (particularly their customer data).
  - Any client's intellectual property which is not already open source.

Other associated risks:

  - Availability - minimize any downtime of client web properties.
  - Durability - avoid losing any data stored in clients' databases or
    image assets.

### Policies

  - Only provide team members access as needed. Don't provide access to
    client assets unless necessary to perform the team member's work.
  - During offboarding, destroy all client assets on the contractor's
    computer.
  - Never download any protected information you don't need on your PC.
    When finished work on a project, delete any protected information
    you had to store locally. Never save protected information anywhere
    on the cloud or on storage media other than official company
    channels without first obtaining approval in writing.
  - Laptop disks should be encrypted with the user's password. This
    option can be enabled when installing Ubuntu Linux.
  - Do not share accounts where protected information is present. Each
    user has their own account.

#### Endpoint Physical Protection Policy

  - Any confidential data should reside only on an encrypted disk of
    your computer.
  - Confidential data must not be synced to personal cloud accounts.
  - Do not leave your work computer unattended outside your home.
  - Your work computer must switch to a password lockscreen after waking
    up from sleep mode, and should enter sleep mode within half an hour
    of being idle.

### Web App Security

  - Apply "least privilege". Do not open any ports that aren't needed
    for using the application. If you must open such a port for
    debugging, do so in your .gitignored environment only, so it's not
    shared.
  - Use our DevOps templates so all servers observe a single secured
    provisioning strategy.