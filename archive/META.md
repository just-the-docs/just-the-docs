---
layout: default
parent: Operations
title: Meta
---

Read the [RST Primer](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics)

## Tips and Tricks for Formatting

Link to other documents (3 formats provided):

``` rst
:doc:`CRITICAL_PATH`
:doc:`../operations/CRITICAL_PATH`
:doc:`/operations/CRITICAL_PATH`
```

External links:

``` rest
`Anchor Text <https://example.com>`_
```

Embedding images:

``` rst
|Alt Text of Choice|

.. |Alt Text of Choice| image:: imagename.png
```

### Header Formatting Tips

Whatever formatting marks you use to first underline a header in RST in
Sphinx, that will be set as "Heading 1" formatting.

Same follows for second and third level headers: they are uniquely
determined per-page.

## Writing Ops Manual Pages

This is a *draft*. Please take these as a rough guide for now, and let
me (cvo) know what works and what doesn't. You can add sections not
documented here.

  - An Ops Manual page **MUST**:
    
      - be written to help employees achieve our mission and create
        value for our customers.
      - have a "Purpose" heading which concisely summarizes why the
        document exists, because we want to ensure the area is important
        to our mission. This SHOULD indicate how we can measure success.

  - An Ops Manual page **SHOULD**:
    
      - Have a "Scope" section that identifies what area of work is
        being discussed, and any definitions to clarify what follows,
        because we want each process document to be focused on a
        specific area of work.
      - Contain bulleted lists of process steps, rules and guidelines.
      - Be concise, becasue it's easier for employees to understand.
      - Clearly state the logical purpose, evidence or citation that
        indicates how the rules help our mission because we want each
        rule to justify its existence. Use the word 'because' (explain
        why the step exists) as needed.

## Processes

  - Documenting processes allows your team to improve together at their
    work. You can talk about how you do things, and how each person can
    do it better. It also sets you up for automation.
    
      - Reach out to your team and make sure they know about, and buy
        into, the process. The best way is to get their help developing
        the process.
      - Test the documented processes with other people. They should
        tell you if it's clear, actionable and effective, and how to
        improve it.

### Inspiration

Here are some more resources to look to for RST/Sphinx, and
documentation approaches in general:

  - [Write the Docs Beginners
    Guide](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/)
  - [Readme Driven
    Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development)
  - [Getting Started with
    Sphinx](https://docs.readthedocs.io/en/stable/intro/getting-started-with-sphinx)
  - [Sphinx
    Extensibility](https://www.sphinx-doc.org/en/master/usage/extensions/index)
