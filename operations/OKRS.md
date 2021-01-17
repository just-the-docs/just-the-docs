---
layout: default
parent: Operations
title: OKRs
---

# OKRs

**Purpose**

Teams who write down individual goals and regularly report progress to team members are 43% more likely to complete them. OKRs are a structured form of goal-setting.

**Scope**

Define how we implement OKRs at Countable.

## OKR Basics

Each team should have at least one *objective* or what they want to accomplish together in the short term. It's their strategic focus. 

Each objective has a few *key results* which are measurable, sufficient conditions for the objective to be met.

## OKR Process

#TODO update and link to eightmeters

At the beginning of each month, in project or team sprints or Slack:

  - Each *team* should identify their top objective.
  - It should be ambitious but possible.
  - Ask, "why" is this your objective? Why not something else?
  - Following that, indicate what (about 3) measurable Key Results would
    tell you if you met the objective. These are *sufficient* conditions
    for the objective to be met.

During your sprint meetings, review your Objective and Key Results for 5
minutes.

  - What percent done are the key results?
  - Is your sprint getting you closer?

At the beginning of the next month:

  - If designed well, it should be possible to objectively measure your
    Key Result as a percentage done.

## Examples (HTML Comment Box)

Objective: Help more people receive comments on their websites.

The best Key Results quantify our objective with strong evidence:

  - 50% more traffic on our homepage (which should lead to 50% more
    installs, all other things being equal).
  - 30% increase in the percentage of users who receive at least one
    comment. (More users should mean more people helped.)

When we can't do that, the next best thing is to ensure we get feedback
and increase evidence on what will meet the objective:

  - Publish a guide to help users get comments, and interview 3 users to
    see if it helped them.
  - Perform 2 usability tests of a new user trying to get comments on
    their site and report to the team on the highest impact usability
    problems.

Poor Key Results:

  - Publish some blog articles (How many? Also, we don't have any
    evidence this will work)
  - Release 3 new features (How do we know the chosen features will help
    people get comments?)

## Practical Implementation at Countable

### How To Make Good Objectives

  - The objective should be the most valuable "wish" the team and client
    can articulate, that can be accomplished most quickly.
  - Choose objectives that will have the most postivie impact in the
    shorted time.
  - It should (when possible) answer the question: What would success
    look like?
  - It should (when possible) solve the biggest problem for your
    project's persona.
  - It should be challenging but possible to accomplish in the allotted
    time. If it's too easy, just keep adding more objectives, or expand
    them until they are collectively challenging but still possible to
    achieve.

### How To Make Good Key Results

They should:

  - Be objectively measurable (on a scale of zero to one). Anyone who
    measures independently should get the same number.
  - Be sufficient to meet the objective.
  - Measure the transaction where value is created for real users as
    closely as possible. Do not measure task completion, measure "number
    of people helped", "amount of money made/saved", or a worst "amount
    of actionable information gained".
  - It's helpful to include a mix of qualitative and quantitative KRs
    for your objective.

### Our OKR Spreadsheet

Each month's OKRs are captured in Eightmeters.

### Committed OKRs

The OKRs in our spreadsheet have strategic "one-off" objectives, that
represent what we want to change in the world. However, there are also
many things that we don't want to change. These "committed OKRs" are
things we should.

#### Objective: Availability

Our web apps should never lose core functionality for more than a few
minutes.

  - Key Result: Ensure test e2e coverage of core workflows OR you must
    test core workflows manually each release.
  - Key Result: Don't push code that fails tests. If you do, fix it
    within an hour or roll back.

#### Objective: Responsiveness to Clients

Clients should perceive us as responsive, reliable and rigorous.

  - Key Result: No client inquiry takes more than one business day to
    receive a response.
  - Key Result: No regression (bug introduced) should exist in
    production for more than one business day.
