---
title: Sections
parent: Navigation
---

# Sections

Sections can be used to disambiguate duplicated parts of the navigation. The value of `section_id` identifies a new section, and the value of `in_section` restricts references to parents in the corresponding section. Specifying a new `section_id` in a section opens a sub-section.

The following pages test replication of navigation patterns, using sections for disambiguation.

- [S 1](s1/) opens section `1`.
  - [P 1](p11/) is in section `1`.
    - [Q](q11/)  is in section `1`, and opens section `11`.
      - [R](r11/) is in section `11`.
  - [P 2](p12/) is in section `1`.
    - [Q](q12/)  is in section `1`, and opens section `12`.
      - [R](r12/) is in section `12`.
- [S 2](s1/) opens section `2`.
  - [P 1](p21/) is in section `2`.
    - [Q](q21/)  is in section `2`, and opens section `21`.
      - [R](r21/) is in section `21`.
  - [P 2](p22/) is in section `2`.
    - [Q](q22/)  is in section `2`, and opens section `22`.
      - [R](r22/) is in section `22`.
