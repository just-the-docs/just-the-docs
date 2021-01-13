---
layout: lesson
title: Geometric Sequences
author: Jae Gwan Park
parent: Sequences and Series
grand_parent: Algebra
---

1. TOC
{:toc}

**A geometric sequence is a sequence with a common ratio between consecutive terms.**

In this lesson we explain three of the most important subtopics of geometric sequences.

## 1. The General Term

In a geometric sequence, the $$n$$'th term or general term is:

$$
t_n= ar^{n-1}
$$

where $a$ is the first term in our sequence, and the common ratio is $r$. 

> **Note:** sequences are discrete functions, so $$n \in \mathbb{N} = \{1,2,3,\ldots \}$$.

To familiarize ourselves with this definition, let's do 2 *easy* examples. Try them on your own first, and then read the intended solution.

### Example 1

In a geometric sequence, $$t_3=20$$ and $$t_6=1280$$. What is the first term?

<details>
    <summary> Solution </summary>
    <p>
        $$
        \begin{align*}
        t_3 &= ar^2 = 20\\
        t_6 &= ar^5 = 1280 
        \end{align*}
        $$
		Dividing $t_6$ by $t_3$ gets rid of $a$, and we are left with:
        $$
        r^3 = \frac{1280}{20} = 64 = 4^3
        $$
        $$
        \therefore r = 4
        $$
        Plugging in $r = 4$ into $ar^2 = 20$:
        $$
        \begin{align*}
          16a &=20\\
          \therefore a &=5/4
        \end{align*}
        $$
        $$\therefore$$ the first term is 5/4.
    </p>
    <b>QED</b>
    <hr>
</details>

### Example 2
Find the first term and common ratio of each geometric sequence with the following general terms $t_n$.
{% raw %}
1. $3 \cdot 2^{2n+1}$ 

2. $3^{-n}$
{% endraw %}
   
<details>
    <summary> Solution </summary>
    <p>
    Let the first term be $a$ and the common ration be $r$ for both solutions.
    </p>
    <p>
    1. $t_n = 3 \cdot 2^{2n+1} = 6 \cdot 2^{2n} = 6 \cdot 4^n = (6 \cdot 4) \cdot 4^{n-1} = 24 \cdot 4^{n-1}$
        $\therefore a = 24$ and $r=4$.
    </p>
    <p>
    2. $t_n=3^{-n} = 3^{-(n-1)} \cdot \frac{1}{3} = \frac{1}{3} \cdot (\frac{1}{3})^{n-1}$
    $\therefore a = \frac{1}{3}$ and $r=\frac{1}{3}$.
    </p>
    <b>QED</b>
    <hr>
</details>

## 2. Geometric Mean

The geometric mean is **the middle number $m$ when $a, m,$ and $b$ form a geometric sequence in that order.**

Consequently we can derive:

$$
\frac{m}{a}=\frac{b}{m} = r\\
$$

$$
\therefore m^2 = ab
$$

In fact, we can extend this theorem. Since all terms are evenly spaced by a ratio $r$, 

$t_a \cdot t_b = t_c \cdot t_d$, if $a+b = c+d$.

### Example 1
Find integer(s) $x$ so that $x, x+4,$ and $4x+10$ form a geometric sequence.

<details>
    <summary> Solution </summary>
    <p>
    Applying the geometric mean, $(x+4)^2 = x(4x+10)$.
    </p>
    <p>
    We can simply solve for this quadratic for $x=-\frac{8}{3}$ or $x=2$.
    Since $x$ must be integer, $\therefore x=2$.
    </p>
    <b>QED</b>
    <hr>
</details>

## 3. Recursive Formula

Geometric sequences can also be written through a recursive formula, where the $n$th term is a product of the $(n-1)$th term and the common ratio. 
In recursive form, the first term must be defined.

Comparing the explicit (general) and recursive forms:

Explicit:
$$
t_n=ar^{n-1}
$$


Recursive:
$$
t_1=a, \; t_n = t_{n-1} \cdot r, (n=2,3,4,\ldots)
$$

## Worked Contest Problems

Below we work through notable problems that have appeared on past contests. 
Attempt these on your own first, and only reference the solutions if you're really stuck.

### Euclid 

##### 2015 7b

The numbers $a_1, a_2, a_3,\ldots$ form an arithmetic sequence with $a_1 \neq a_2$. 
The three numbers $a_1, a_2, a_6$ form a geometric sequence in that order. 
Determine all possible positive integers $k$ for which the three numbers $a_1$, $a_4$, $a_k$ also form a geometric sequence in that order.

<details>
    <summary> Solution </summary>
    <p>
    Since $a1, a2, a6$ form a geometric sequence, we can apply the geometric mean:
    $$
    \begin{align*}
        \frac{a_2}{a_1}&=\frac{a_6}{a_2} \\
        (a_2)^2 &= a_1 a_6
    \end{align*}
    $$
    </p>
</details>


##### 2014 6b

The geometric sequence with $n$ terms $t_1, t_2, \ldots, t_{n-1}, t_n$, has $t_1 t_n = 3$. 
Also, the product of all $n$ terms equals $59049$. Determine the values of $n$.

<details>
    <summary> Solution </summary>
    <p>
    Here's a scenarion where I'd say brute forcing actually works. 
    <br>
    Evaluating: 
    $$
    \begin{align*}
        t_1 \cdot t_2 \cdot \ldots \cdot t_{n-1} \cdot t_n &=59049\\
        a \cdot ar \cdot \ldots ar^{n-2} \cdot ar^{n-1} &= 59049\\
        (a)^n \cdot (r \cdot r^2 \ldots r^{n-1}) &= 59049\\
        a^n \cdot r^{\frac{1}{2}n(n-1)} &= 59049 \; \; (1)
    \end{align*}
    $$
    </p>
    <p>
    Now let's look at what else we were given. From $t_1 t_n = 3$, 
    $$
    \begin{align*}
        (a)(ar^{n-1}) &=3\\
        a^2 r^{n-1} &=3 \; \; \; \; \; \; (2)
    \end{align*}
    $$
    </p>
    <p>
    Note that $(1)$ and $(2)$ are close to each other. We can raise $(2)$ to the $n$th power, getting;
    $$
    \begin{align*}
        (a^2 r^{n-1})^n &= 3^n\\
        a^{2n} r^{n(n-1)} &= 3^n
    \end{align*}
    $$
    We can further raise both sides to the $\frac{1}{2}$ power, getting;
    $$
    \begin{align*}
        (a^{2n} r^{n(n-1)})^{\frac{1}{2}} &= (3^n)^\frac{1}{2}\\
        (a^n r^{\frac{1}{2}(n)(n-1)} &= 3^{\frac{n}{2}} \;\;\; (3)
    \end{align*}
    $$
    Since $(3) = (1)$, we can conclude $3^\frac{n}{2} = 59049 = 3^10$
    $$
    \therefore n = 2 \cdot 10 = 20.
    $$
    <b>QED</b>
    </p>
</details>

##### 2010 5b

A geometric sequence has 20 terms. 

The sum of its first two terms is 40.

The sum of its first three terms is 76.

The sum of its first four terms is 130.

Determine how many of the terms in the sequence are integers.

<details>
    <summary> Solution </summary>
    <p>
        
    </p>
</details>

##### 2009 9a

### AMC 10

##### 2004 AMC 10A P18

##### 2010 AMC 10B P16