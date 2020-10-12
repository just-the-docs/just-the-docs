---
layout: default
title: Description lists
parent: Styling
grand_parent: Tests
---

# Description lists

The first child element of each `dd` element in a `dl` list should be aligned with the preceding `dt` element in the following examples.

term

: paragraph text

  paragraph text

term

: ### Header

  paragraph text

term

: > block quote

  paragraph text

term

: ```sh
  fenced code block
  ```

  paragraph text

term

: + unordered list item
  + unordered list item

  paragraph text

term

: 1. ordered list item
  2. ordered list item

  paragraph text

term

: sub-term
  : sub-description
  
  sub-term
  : sub-description

  paragraph text

term

: |-----------------+------------+-----------------+----------------|
  | Default aligned |Left aligned| Center aligned  | Right aligned  |
  |-----------------|:-----------|:---------------:|---------------:|
  | First body part |Second cell | Third cell      | fourth cell    |
  | Second line     |foo         | **strong**      | baz            |
  | Third line      |quux        | baz             | bar            |
  |-----------------+------------+-----------------+----------------|
  | Second body     |            |                 |                |
  | 2 line          |            |                 |                |
  |=================+============+=================+================|
  | Footer row      |            |                 |                |
  |-----------------+------------+-----------------+----------------|

  paragraph text

term

: ***

  paragraph text
