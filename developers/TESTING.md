---
layout: default
title: Testing
parent: Programming
nav_order: 8
---

# Testing

**Purpose**

To establish how and why we do testing at Countable.

**Scope**

Currently covers basic testing principles and bug reporting procedures.

## Testing Principles
  - When you add a new API or page, write a test in the same commit right away. Or even consider TDD.
  - We want our tests to run fast so we are encouraged to run them often.
  - Write tests to increase confidence that our customers' experience will be good.
  - To exercise important flows like signing up, purchasing, core product experience.
  - Aim to have full coverage of all API endpoints and pages with e2e tests, which are quick to write and are closest to real customer behaviour.
  - Tie test cases to unchanging real world business logic and inputs, not implementation. This prevents their need to be rewritten during refactors.
  - Keep your test scenarios and code as similar as possible to real usage. Your tests should run the backend server, load actual client pages (like selenium would), and flip a switch to trigger test mode in your front end template.

## Bug Reporting Checklist

These are the required steps for reportings bugs at Countable. Make one Trello Card per bug.

*Your job when reporting a bug is to make it clear to the developer how to see the bug*

1.  Briefly describe the current behaviour and how it differs from the desired behaviour.
2.  Include the exact URL where the issue can be observed.
3.  Note what browser/device you are using unless it is Google Chrome (this is assumed otherwise).
4.  List any further steps (specific clicks, etc.) to observe the issue.
5.  For aesthetic problems, take a screenshot and circle the problem in red.
6.  For text problems, quote the problematic text.
7.  Use a red "bug" label in Trello to mark bugs.
8.  Assign the bug to someone who can either fix or triage it.

The developer will spend 2 minutes with your instructions trying to see your bug. If they can't, they'll comment in the card with what they tried, and archive your bug.
