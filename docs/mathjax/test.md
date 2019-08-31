---
layout: default
title: Mathjax test
parent: Mathjax
mathjax: true
---

$$x$$ math at the start of the document

Nested: $$M = \text{while e^2 $e^2$ do $c^2$ end}$$

**Numbered equations**

$$
\begin{equation}
\int_0^x \sin(x) dx
\label{eq:test}
\end{equation}
$$

$$\eqref{eq:test}$$

**Blockquotes**

> 1.  A block quote
> 2.  With a list inside
> 3.  With $$math$$

**Math environment Syntax testing**

Inline Math should work with `$$`  $$\frac{x+y}{y}$$
but not `\(` \(\frac{x+y}{y}\)

Use `$$` on separate lines:

$$
\int_{-\infty}^\infty e^{-x^2} = \sqrt{\pi}
$$


Use `$$` on the same line:
$$ \frac{-b \pm \sqrt{b^2-4ac}}{2a} $$

Use `$$` on separate lines:

$$
a+b
$$

Use `$$` on the same line: $$E=mc^2$$

----

**Some Tex Functions**

$$k \times k$$, $$n \times 2$$, $$2 \times n$$, $$\times$$

$$x \cdot y$$, $$\cdot$$

$$\sqrt{x^2+y^2+z^2}$$

$$\alpha \beta \gamma$$

$$
\begin{aligned}
x\ &= y\\
mc^2\ &= E
\end{aligned}
$$

----

**Escaped Math environments**

In the following examples no math environments should render:

a $5, a $10 and a \$100 Bill.

All McScrooge sees

\$$

and even more:

\$$

\\[x+y\]
\\(x+y\)

```
$x
```

```
\$
```

`\$`, `\[ \]`, `$x$`

----

**Testing `\newcommand`**

For all $$x$$ and $$y$$ in $$\mathbb{R}^k$$ it is true that
$$
\newcommand{sca}[1]{\langle #1 \rangle}
|\sca{x,y}|^2 \le \sca{x,x} \cdot \sca{y,y},
$$

<!-- newcommand not in environment-->
\newcommand{\scalong}[1]{(#1_1,\dots,#1_k)}

where $$\sca{\cdot,\cdot}$$ denotes the inner product $$\sca{\scalong{x}, \scalong{x}} = \sum_{i=1}^k x_i y_i$$.

----

**Testing several math fonts**
$$
p(\mathbf{m}) \sim \mathcal{N}(\mathbf{m}) e^{-\sum_{i} \beta_i m_i}
$$

$$
\langle \vec{m} \rangle =
\frac{1}{Z(\vec{\beta})}\vec{m}(\mu)
\sum_{\mu\in\mathcal{G}}
e^{-\vec{\beta}\cdot\vec{m}(\mu)}
$$

----

Notice below that the `$$`-separated display math doesn't have a blank line before and after (i.e. in an actual $$\LaTeX$$ document it wouldn't be placed in a separate paragraph):

The _characteristic polynomial_ $$\chi(\lambda)$$ of the
$$3 \times 3$$ matrix  
    $$
\left( \begin{array}{ccc}
a & b & c \\
d & e & f \\
g & h & i \end{array} \right)
$$  
is given by the formula  
    $$
\chi(\lambda) = \left| \begin{array}{ccc}
\lambda - a & -b & -c \\
-d & \lambda - e & -f \\
-g & -h & \lambda - i \end{array} \right|.
$$

This is a long line: $$\chi(\lambda) = a e i-a e \lambda -a f h-a i \lambda +a \lambda ^2-b d i+b d \lambda +b f g+c d h-c e g+c g \lambda -e i \lambda +e \lambda ^2+f h \lambda +i \lambda ^2-\lambda ^3$$

----

**Does it work in different MD elements?**

# Math $$x^2$$ in heading 1

## Math $$x^2$$ in heading 2

### Math $$x^2$$ in heading 3

#### Math $$x^2$$ in heading 4

$$x_1, x_2, \dots, x_N$$ should not conflict with `_` _italics_?

$$(f*g*h)(x)$$ should not conflict with `*` *syn***tax**?

$$[a+b](c+d)$$ should not conflict link [syntax](#)?

_math $$x^2$$ in emphasis_

**math $$x^2$$ in bold**

[math $$x^2$$ in link](http://www.mathjax.org/)

`math $$x^2$$ in code`

~~math $$x^2$$ in strikethrough~~ (doesn't strike through the math)

**In Tables**

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| $$a+b$$       | some wordy text | $1600 |
| $$a+b$$       | some wordy text | $1600 |
| $$a+b$$       | some wordy text | $1600 |

The following doesn't work (it only works with Pandoc)

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| $$a+b$$       | some wordy text | $1600 |
|               | $$
A=\mathbf{A}=\underline{A}=\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots &        & \vdots\\
a_{m1} & a_{m2} & \cdots & a_{mn}\\
\end{pmatrix} = (a_{ij})
$$                                |   $12 |
|               |                 |    $1 |


**In Image Captions**

The `alt` string doesn't work

![$$a^2+b^2=c^2$$](https://raw.githubusercontent.com/atom-community/markdown-preview-plus/master/imgs/mpp-full-res-invert.png)
