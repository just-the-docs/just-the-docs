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

For more check out the
[Scrum Guide](https://www.scrumguides.org/scrum-guide.html).

When does Countable use Scrum? Projects with at least 2 staff assigned, working at least half-time each, and longer than 1 month in length, which has external stakeholders (outside Countable), should use Scrum and have a Scrum master assigned. Other projects can still borrow from Scrum methodology (ie, meet weekly) but do not need a Scrum Master (or PM role of any kind) assignmed. On these, devs should be directly accountable to the client or product owner.

## Principles

1.  Ship work to real users and get feedback *every sprint*. Don't allow
    "work in progress" to remain unreleased. Instead, plan your work so it
    can be released every 2 weeks or *ideally, every day*. You can do this via feature flagging, having a stage site, or just planning work in small, releasable chunks.
2.  Reflect weekly and share openly about how we can work better together.
3.  See also the official Scrum values at https://agilemanifesto.org/

## User Stories

User Stories (while not technically part of Scrum) serve as the central planning document for any given
project. The purpose of User Stories is to ensure all stakeholders can
understand what we're trying to accomplish, no matter their level of
technical expertise. Check out the [User Stories](../USER_STORIES/) page for more detail and how
to compose User Stories.

## SCRUM Process

### Sprint

A sprint is a period (1 week to 1 month) punctuated by a Sprint meeting with the following 3 sections.

#### Sprint Review

Each team member explains (or ideally, shows), their work the past week to the Product Owner and team. The Scrum master reviews tickets in the "Done" columns, and asks each dev to share their associated work.

Note: Instead of just talking about what did you do this week, try to
use a screen share feature to walk along all of your "done" trello
tickets, explaining one by one. This helps the team to better understand
all of your work. Please prepare something so it can be shown quickly.

#### Sprint Plan

The Product Owner articulates the overall goal of the sprint. Team members may want to discuss how the goal relates to (or conflicts with) their [OKRs](../OKRS/).
Prior to the sprint plan, the Product Owner should ensure the backlog is refined, meaning it's already ordered by priority and the items (User Stories) explain who they are for, what is needed, and why it's needed. For each item in the "Requests" column, the PO ensures they are sufficiently detailed, and moves them to Backlog.

The Scrum master reviews items and moves them to the Sprint. The Product Owner determines what order the items are reviewed in, and the developers determine to how much they can finish that week. For each item, the SM asks "When can we do this?".

#### Sprint Retrospective

Each team member shares their ideas for what problems we have, and how we could improve. The team evaluates tha last sprint performance, and brainstorms ideas to try next sprint.

#### Stand-up Meetings

Countable usually doesn't hold synchronous stand-up meetings. Instead, every
day, each developer shares something on your team's public slack channel
regarding the work you did. It's best to show a screenshot of your work
for feedback. They also share the number one thing that's blocking them, or would help accelerate their work.
Team members manage dependencies, hand off staged work, coordinate code reviews and learnings, and
figure out logistics to ship their work every sprint.

### SCRUM Roles

These are the duties we must assigned when doing Scrum.

#### Product Owner
  - Represents the User/Customer, and maximizes the product's value to them
  - Articulates the product vision to the team
  - Owns the Backlog, and keeps it clear and prioritized
  - Is available and accessible to the team
  - Triage the Trello Requests column into an Ordered Backlog of work
  - Hepls the developers get feedback from real users (with the help of any UX developers)

#### Scrum Master

  - Chair the sprint meeting, ensuring we follow the process
  - Trains the team on Scrum and makes sure we're following the rules of
    scrum effectively (shipping each week, continuously learning, making
    tickets clear)
  - Nudge team to identify problems (impediments) in workflow and make them visible
  - Is a Coach, Experimenter and Facilitator

#### Developers (and other technicians)

  - Ensures they have a challenging yet doable amount of work each sprint
  - Ensure they understand items in their sprint, and complain otherwise
  - Takes responsibility for shipping work to real users, and getting feedback
  - Are cross-functional, and communicate with each other about work details
  - Decide how work is done (make informed technical choices, based on discussions, outside data/ best practices and company conventions)


### Backlog

The Backlog is a list of all the actions we current believe will
accomplish the goal of our project. This should be ordered by impact to
effort ratio. That is, items which make the biggest difference in the
least time should be done first.

For a visual aid of how our work is processed, see this [Business Process Diagram](https://drive.google.com/open?id=1VrniT1lRqVu9sJr0ZMK1aQLnFwEuFIQD).


