---
layout: default
title: Mathjax
nav_order: 8
has_children: true
mathjax: true
---

# Mathjax

To use [Mathjax] on a just-the-docs page:

- include `mathjax: true` in the YAML preamble

- enclose $$ \LaTeX $$ code in [kramdown math blocks]

The default Mathjax options in `_config.yml` are:

```yaml
compress_html:
  blanklines: true # required for Mathjax
mathjax:
  source: https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-AMS_CHTML
  config: 'MathJax.Hub.Config({ TeX: { equationNumbers: { autoNumber: "AMS" } } })'
``` 

Here is an example:

$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$

For further examples, see [this test page](test), adapted from a [test]
in [markdown-preview-plus].

[Mathjax]: https://www.mathjax.org 
  "Mathjax home page"

[kramdown math blocks]: https://kramdown.gettalong.org/syntax.html#math-blocks
  "kramdown math blocks documentation"

[test]: https://github.com/atom-community/markdown-preview-plus/blob/master/EXAMPLE.md
  "Markdown-preview-plus test file"

[markdown-preview-plus]: https://atom.io/packages/markdown-preview-plus
  "Markdown-preview-plus package page"
