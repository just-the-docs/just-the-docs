---
layout: default
parent: Operations
---

Check out our [Delivery Workflow Documentation for
clients](../CLIENT_WORK_REQUEST_INSTRUCTIONS)

## Communicating With Clients

### Reporting on Work

  - Use Trello for quick updates, mention all relevant parties so they
    get a notification.
  - Email may be appropriate as well for more substantial updates that
    deal with several Trello cards.
  - Show the clients you work for something at least once a week. You
    can use **Screencastify chrome extension** for it ([More
    details](../PROJECT_MANAGEMENT)).
  - Keep it visual. Use screenshots, mockups, videos, and links to
    staged apps as the primary way to demonstrate work to clients.
  - Try to anticipate what problems they will have when using the app,
    and test the ways you expect them to use it in order to make a
    seamless experience.
  - When reporting on work to clients, re-state what your commitments
    were and how much is done.
  - Indicate anything that's currently overdue or other unmet
    commitments as early as possible, indicate how you're fixing it.

### General Client Communication Guidelines

  - If something's unclear to you, as very specific (not open ended)
    questions and state your assumptions so far so they can point out
    any miscommunication.
  - Be *concise*. Most clients get a *lot* of email so stick to key
    points that will matter to them. Be respectful of their time, and
    avoid asking for something if you've not made an effort to solve it
    yourself.
  - Show appreciation for the client's time, and anything they've done
    to help the project along.
  - Send the communication to only the people who will find it relevant,
    and copy all team members who have been involved in the project.

### Priorities for Client Communication

This is an ordered list of priorities when doing work for clients.

1.  Critical downtime events or other urgent bugs. If a service has a
    serious loss of function the top priority is to restore it, keeping
    the client updated as you go. When the issue is resolved, discuss
    with your team how it should have been prevented (staging process,
    automated test, etc)
2.  Communicating with clients. Check emails and Trello at least twice
    per day (I recommend exactly twice). Prefer Trello for all task
    related communication. Respond to emails from clients addressing
    their concerns. If you don't know how, CC the appropriate person
    (your manager if unsure) in your response asking for their input. In
    your response, indicate the time which you expect technical items
    addressed (e.g. "This will be done by Thursday") and set that date
    in the Trello ticket if you need a reminder.
3.  Fixing high impact bugs. Things which affect other team members' or
    your own work, or are highly visible to the client.
4.  Communicate with your team. Unblock others. Is any team member
    actively waiting for an output of yours? Do that before other work.
5.  Get feedback on your work. At least once every 24 hours, share
    something with team members, end-users or clients (a code review,
    screenshot on slack, little text update on what you're working on,
    shared a link). Keep trying to improve the frequency and quality of
    feedback you're getting on your work.
6.  Work on cards that have the most impact on your Key Results.
7.  Implement cards top to bottom in your Sprint columns of your trello
    boards, to minimize how much work ends up being late.
8.  Go back and make things a little better than you found them. Improve
    your work so you can be proud of it. Can we improve test coverage,
    user experience or anything else we forgot to cover in our cards?
9.  Grab more cards from your Backlog (top to bottom).

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

## Working With Government (Requirements)

Here is a high-level summary of requirements when working in the public
sector.

When working for the Ministry of the Attorney General:

  - Do not make public announcements of unreleased work in progress
    (post to instagram, etc) without approval.
  - Observe our IT Security Policy.
  - Do not promote the Province of BC being our customer in marketing
    materials (promotional purposes) without prior written consent.
  - You need to go through a process for accessing protected information
    from the Province, including a criminal background check.
  - We cannot have a terms of use agreement with anyone regarding the
    work we produce for the Province (6.7, SI Contract).
  - Do not use production data in development, test or training
    environments without consent from the Province.
  - Use CloudFlare infront of all services deployed, as it provides
    various security requirements.
  - Automatic security patching must be enabled on all production
    servers.
  - Use GitHub's CVE detection system and patch any detected
    vulnerabilities prior to launch (use a CD gate).
