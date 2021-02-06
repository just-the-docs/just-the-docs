---
layout: default
parent: Operations
title: Scrum
---

# Scrum

**Purpose**

Countable uses
[Scrum](https://en.wikipedia.org/wiki/Scrum_\(software_development\)) to
to collaborate with clients on work delivery and to optimize for learning.

**Scope**

This page briefly summarizes SCRUM principles, then focuses on how we
actually put it into action at Countable.

For more, check out the guide book from the inventor of Scrum
[here](https://www.scrumguides.org/scrum-guide.html).

When does Countable use Scrum? Projects with at least 2 staff assigned, working at least half-time each, and longer than 1 month in length, and have external stakeholders (outside Countable), should use Scrum and have a Scrum master assigned. Other projects can still borrow from Scrum methodology (ie, meet weekly) but do not need a Scrum Master (or PM role of any kind) assignmed. On these, devs should be directly accountable to the client or product owner.

## Principles

1.  Ship work to real users and get feedback *every sprint*. Don't allow
    "work in progress" to remain unreleased. Instead, plan your work so it
    can be released every 2 weeks or *ideally, every day*. You can do this via feature flagging, having a stage site, or just planning work in small, releasable chunks.
2.  Reflect weekly and share openly about how we can work better together.
3.  See also https://agilemanifesto.org/

## User Stories

User Stories serve as the central planning document for any given
project. The purpose of User Stories is to ensure all stakeholders can
understand what we're trying to accomplish, no matter their level of
technical expertise. Check out the [User Stories](operations/USER_STORIES/) page for more detail and how
to compose User Stories.

## SCRUM Process

### Project Objective and Key Results

Every team should have one or more [Objectives](operations/OKRS/). This is a written goal discussed with the team to ensure clarity, and is used by the **Product Owner** toorder the **Backlog**. An objective may be to meet a  particular [UserStory](operations/USER_STORIES/).
 
### Sprint

A sprint is a period (1 week to 1 month) punctuated by a Sprint meeting with the following 3 sections.

#### Sprint Review

Each team member explains (or ideally, shows), their work the past week to the Product Owner and team. The Scrum master reviews tickets in the "Done" columns, and asks each dev to share their associated work.

#### Sprint Plan

The Scrum Master:
1. goes through each item in Requests column
1. asks who should be assigned
1. asks that person if the card is clear
1. moves the card to Backlog in priority order (based on Product Owner's input)

The Product owner lists the top priority cards in Backlog, and developers determine to how much they can finish that week. Move those items from Backlog to Sprint.

The above 2 steps can be done concurrnetly (move directly from Requests to Sprint) if all parties agree.

#### Sprint Retrospective

Each team member shares their ideas for what problems we have, and how we could improve. The team evaluates tha last sprint performance, and brainstorms ideas to try next sprint.

#### Stand-up Meetings

Countable doesn't hold synchronous stand-up meetings. Instead, every
day, please share something on your team's public slack channel
regarding the work you did. It's best to show a screenshot of your work
for feedback.

### SCRUM Roles

These are the duties we must assigned when doing Scrum.

#### Product Owner

  - Develops User Stories by talking to real users and ensures those
    users' needs are being met by the team.
  - Triage the Trello Requests column into an Ordered Backlog of work.

#### Scrum Master

  - Chair the sprint meeting, ensuring we follow the process.
  - Trains the team on Scrum and makes sure we're following the rules of
    scrum effectively (shipping each week, continuously learning, making
    tickets clear)
  - Verifies work items in the backlog are clear to developers. The product
    owner is typically our client.
  - Nudge team to identify problems in workflow and make them visible to
    work together.

#### Developers (and other technicians)

  - Ensures they have a challenging yet doable amount of work each
    sprint.
  - Ensure they understand items in their sprint, an complain otherwise.
  - Takes responsibility for completing KRs, and shipping work to real
    users, clients, and team members (depending on output)

### Backlog

The Backlog is a list of all the actions we current believe will
accomplish the goal of our project. This should be ordered by impact to
effort ratio. That is, items which make the biggest difference in the
least time should be done first.

We do not have daily stand-up meetings since our team works in different
timezones. Instead, we have a slack channel where people should
communicate about what they're working on, coordinate code reviews, and
figure out logistics to ship their work every week, and generate ideas
for the sprint plan meeting.

For a visual aid of how our work is processed, see this [Business Process Diagram](https://drive.google.com/open?id=1VrniT1lRqVu9sJr0ZMK1aQLnFwEuFIQD).

Note: Instead of just talking about what did you do this week, try to
use a screen share feature to walk along all of your "done" trello
tickets, explaining one by one. This helps the team to better understand
all of your work.
