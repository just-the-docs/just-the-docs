---
title: Ancestry
parent: Main Navigation
nav_order: 4
---

# Ancestry

If no two pages on your website have the same `title`, you only need to set the `parent` titles to fix the hierarchy. You can also have the same `title` on pages that have no children, provided that they have different parent pages.

If two parents have the same `title`, but different grandparents, you can set their `grand_parent` titles to distinguish between their parents. The `grand_parent` title needs to be the same as the `parent` of the `parent`.

## Example: distinguishing parents with `grand_parent`
{: .text-delta }

```yaml
---
title: T
parent: S
grand_parent: X
---
```

```yaml
---
title: T
parent: S
grand_parent: Y
---
```

The `ancestor` field of a page generalizes `grand_parent` to higher levels.

The following pages illustrate `parent` disambiguation using `grand_parent` and `ancestor` titles. Some descendants of both [Page X][X] and [Page Y][Y] have the same title, so references to those descendants as `parent` always require disambiguation.

- [X][X] is a parent page
- [S][XS] is the only child of [X][X]. The `parent` reference to [X][X] is unambiguous.
- [T][XT] is the only child of [S][XS]. Its `parent` is disambiguated by its `grand_parent`.
- [U][XU] is the only child of [T][XT]. Its `parent` is disambiguated by its `ancestor`.
- [Y][Y] is a sibling of [X][X].
- [S][YS] is the only child of [Y][Y]. The `parent` reference to [Y][Y] is unambiguous.
- [T][YT] is the only child of [S][YS]. Its `parent` is disambiguated by its `ancestor`
- [U][YU] is the only child of [T][YT]. Its `parent` is disambiguated by its `ancestor`.

[X]: {% link docs/navigation/main/x.md %}
[XS]: {% link docs/navigation/main/xs.md %}
[XT]: {% link docs/navigation/main/xt.md %}
[XU]: {% link docs/navigation/main/xu.md %}
[Y]: {% link docs/navigation/main/y.md %}
[YS]: {% link docs/navigation/main/ys.md %}
[YT]: {% link docs/navigation/main/yt.md %}
[YU]: {% link docs/navigation/main/yu.md %}
