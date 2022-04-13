---
layout: default
title: Meta
parent: Processes
grand_parent: Operations
nav_order: 1
---

# Contributing to the Ops Manual

**Purpose**

This page outlines how to contribute to the Countable Ops Manual in both a technical sense (using Github-flavoured Markdown in a Jekyll Github Pages site, using Just-the-Docs theme and some experimental bidirectional linking) and a stylistic sense (how pages should be structured and what they should contain).

**Scope**

Currently holds content on linking best practices, a draft on Writing Ops Manual Pages (stylistically) and the first attempt at outlining the basics of formatting and structure.

## How to Add Links

Best convention for linking to other files: `../devops/DEVOPS` or `/devops/DEVOPS/`

You can link directly to a single file within the same folder by using `DEVOPS.md`. From preliminary testing, in this use the .md *is* needed.

## How to Add Colored Labels

The jekyll template we use, [just-the-docs](https://pmarsceill.github.io/just-the-docs/), allows us to set some custom colored labels. Here are the tagging norms we've set:

TODO
{: .label .label-yellow }
Something you want to remember to write later.

```
TODO
{: .label .label-yellow }
Something you want to remember to write later.
```

DRAFT
{: .label .label-green }
An idea you want to share with the team in this manual, but it needs more work.

CONVENTION
{: .label .label-blue }
Something that the team normally does a certain way.

PROCESS
{: .label .label-purple }
Something people should make an effort to follow.

REQUIRED PRACTICE
{: .label .label-red }
Something that is critical and we want to draw special attention to it. (Safety, privacy, legal)


## Data Headers for New Pages

When you create a new page in the ops manual, you will need to include a few lines of simple information at the very top of the page. (If there is a space or line before it, the header will not be parsed correctly.)

There are two primary page scenarios for header templates:

##### Headers for New Sub-Pages

If you are creating a page within an existing folder (99% of the time), you will include the following header content: 

```
---
layout: default
parent: Operations
title: Contributing to the Ops Manual
---
```

##### Headers for New Collections

If you are creating a new collection (*very* rare, please consult with ops guild before doing so), you will include the following header content: 

```
---
layout: default
title: Operations
has_children: true
---
```

Note that any child pages created "below" that collection page will have to reference its title in their own data headers, so please choose a succinct title for these.

## Writing Ops Manual Pages

This is a *draft*. Please take these as a rough guide for now, and let me (cvo) know what works and what doesn't. You can add sections not
documented here.

  - An Ops Manual page **MUST**:
    
      - be written to help employees achieve our mission and create value for our customers.
      - have a **Purpose** heading concisely summarizing why the document exists, because we want to ensure the area is important to our mission. This SHOULD indicate how we can measure success.

  - An Ops Manual page **SHOULD**:
    
      - Have a **Scope** section identifying what area of work is being discussed, and any definitions to clarify what follows, because we want each process document to be focused on a specific area of work.
      - Contain bulleted lists of process steps, rules and guidelines.
      - Be concise, because it's easier for employees to understand.
      - Clearly state the logical purpose, evidence or citation that indicates how the rules help our mission because we want each rule to justify its existence.
      - Use the word 'because' (explain *why* the step exists) as needed.

## Guidelines

  - Documenting guidelines allows your team to improve together at their work. You can talk about how you do things, and how each person can do it better. It also sets you up for automation.
  - Reach out to your team and make sure they know about, and buy into, the guideline. The best way is to get their help developing the guideline.
  - Test the documented guideline with other people. They should tell you if it's clear, actionable and effective, and how to improve it.
  - [More details](OPERATIONS.md)
