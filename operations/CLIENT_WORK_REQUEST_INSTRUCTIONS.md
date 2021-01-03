---
layout: default
parent: Operations
title: Client Work Request Instructions
---

<div class="toctree" data-maxdepth="2" data-caption="Contents:" hidden="">

</div>

**Purpose**

This is a client-facing process intended to open useful channels of
communication and collaboration.

**Scope**

It covers the details of the linked process diagram, and what to expect
after submitting a work request.

## Content

This process is designed to help us do great work for you, as
transparently as possible. If at any point you sense something's not
working or not right for you, don't hesitate to [tell
us](mailto:everyone@countable.ca) and we'll improve it\!

If you're a visual person, check out the process diagram
[here](https://docs.google.com/drawings/d/1UkPeGGzKYWkCsZpkwWB_UJ3JjWJcoT4t8qSU8A0tsy4/edit?usp=sharing).

## Submitting Work Requests to Countable

We use Trello to communicate work items with our clients.

1.  Go to the Trello Board we've set up for you. You'll see a number of
    columns containing cards.
2.  Create a new Card in the "Requested" column.
3.  Click your card to create a description. If it's a bug, include the
    URL you observed it on and steps to reproduce it. If it's a feature,
    document the rationale.
4.  Add any file attachments with any examples, templates, screenshots
    or other specification files.
5.  If you want a specific person's attention, mention them in a comment
    under the card or add them as a "member". Otherwise, it may be some
    time before someone sees your card.

For more information on how we use Trello, see [here](../TRELLO).

## How We Process Your Work Request

1.  New requests go into the *Requested* column and from there we triage
    them (confirm they're clear). If so, they're moved to "Backlog".
2.  Each Monday, we move items from Backlog column into the the Sprint
    column (meaning it's planned for completion this week). This way we
    can plan our week and it's clear to clients approximately when
    things will be done.

Please let us know if there's an issue with how your work items are
handled. If you're in a rush to get something done, let us know and
we'll try to include it in the earliest possible sprint. Otherwise,
we're assuming cards at the top of the Backlog column in Trello are
higher priority.

## Frequently Asked Questions

### How do I budget my work, estimate cost, and estimate timelines?

First of all, the below method takes a little practice, so just ask us
to provide an estimate at any time and we'll walk you through it.

We suggest using the `velocity` method to always have an up-to-date
timeline and cost, and to respond quickly when off course.

1.  Look at your Backlog (list of work to be done), and identify what
    you need done by what date (we'll call this the `project`
    parameters)
2.  This allows estimating how many hours per week (and per month) we
    need, which in turn gives a cost estimate.
3.  Each week (or two) check in and determine whether the volume of
    tasks completed so far is on course. This will indicate a `velocity`
    or number of tasks per week. Ask, how can we improve the velocity?
    Do we need to adjust resources allocated?
4.  The `velocity` also provides a constantly updating estimate of the
    final project completion and cost. It's simply:

<!-- end list -->

    remaining_weeks = number_of_tasks_in_project / tasks_per_week
    total_cost = dollars_per_hour * remaining_weeks / hours_per_week
