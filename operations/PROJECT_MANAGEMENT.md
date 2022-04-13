---
layout: default
parent: Operations
title: Project Management
has_children: true
nav_order: 2
---

# Project Management

{: .no_toc }

## Table of Contents

{: .no_toc .text-delta }

- TOC
   {:toc}

**Purpose**

Set conventions for communication between project stakeholders to
maximize our velocity towards objectives.

**Scope**

This document summarizes project management tooling and practices at
Countable to assist with onboarding.

## Project Management Process

  - Every project has a "Purpose" which must be documented and visible.
  - Every project has at least one [Objective and Key Result](/peopleops/OKRS/) every month.
  - We use Scrum like [this](SCRUM.md).
  - Every day, try to get some
    [feedback](/processes/FEEDBACK_LOOPS/) on your work.
  - Every day, coordinate with team mates on slack and prioritize.
  - Work together to minimize the amount of time anyone is blocked or
    waiting for someone's output as their input. The list of items in
    which people depend on each other's work is called the
    [Critical Path](CRITICAL_PATH.md).
  - Keep in mind that every project has slightly different needs, and thus will require 
    different processes, based on the working preferences of our clients.

## Project Management Objectives

  - Increase transparency of our work to clients, team mates, managers.
  - Dashboard for client.
  - Performance metrics, data for retrospectives.
  - Automate timesheets, and invoices using Trello card data.
  - Automate moving trello cards based on commits.
  - Simple to explain to new people. Mostly automated. Avoid slowing
    down developers who are less oriented to PM process.
  - Link bitbuckets commits.
  - Easy for clients to submit a ticket. Bug or Feature, URL,
    screenshot.
  - Provide our customers with a constant feedback loop, updating them
    upon a new feature release or any significant changes on their
    current project.

## Tools - GIT

For developers - We follow the [git flow](https://datasift.github.io/gitflow/IntroducingGitFlow)
branching conventions loosely. All projects should have a master
(production) branch which releases are made from, and a develop (stable)
branch for developers as a foundation to build features on. Feature
branches are created from develop and merged back in via pull request
when ready. Here are some [examples](/developers/GIT/) of how we'd
use GIT in different cases.

## Tools - Trello

Check out our page on [how we use Trello](TRELLO.md).

## Tools - Screencastify

Check out our page on [recording short screencast videos](/processes/onboarding/SCREENCASTIFY/).

## Tools - Transferwise

Transferwise makes paying our international team easier and 5x cheaper than banks. If you sign up, use this [Affiliate link](https://wise.com/invite/spu/clarkv4) to avoid fees on the first $800.
