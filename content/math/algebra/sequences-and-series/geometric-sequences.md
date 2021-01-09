---
layout: lesson
title: Geometric Sequences
author: Jae Gwan Park
---


This lesson is a brief overview on the most important concepts of geometric sequences. 

---

**A geometric sequence is a sequence with a common ratio between consecutive terms.**

This is a popular subject amongst all math contests, and the difficulty of problems can be vastly different depending on what you know. In this lesson we explain three of the most important subtopics of geometric sequences.

## The General Term

In a geometric sequence, the $$n$$'th term or general term is:


$$
t_n= ar^{n-1}
$$




where <span>$a$</span> is the first term and the common ratio is $r$. 

> **Note:** sequences are discrete functions, so $$n \in \mathbb{N} = \{1,2,3,\ldots \}$$.

To familiarize ourselves with this definition, let's do 2 *easy* examples.

#### Example 1

In a geometric sequence, $$t_3=20$$ and $$t_6=1280$$. What is the first term?

---

<details>
    <summary> Solution </summary>
    <p>
        $$
        \begin{align*}
        t_3 &= ar^2 = 20\\
        t_6 &= ar^5 = 1280 
        \end{align*}
        $$

		Dividing $t_6$ by $$t_3$$ gets rid of $$a$$, and we are left with:


        $$
        r^3 = \frac{1280}{20} = 64 = 4^3
        $$
    
        $$
        \therefore r = 4
        $$



        Plugging in $$r = 4$$ into $$ar^2 = 20$$:


        $$
        \begin{align*}
        16a &=20\\
          \therefore a &=5/4
        \end{align*}
        $$



        $$\therefore$$ the first term is 5/4.
    </p>
</details>





##### Solution

Let the first term be $$a$$ and the common ratio be $$r$$. Then,

$$
\begin{align*}
t_3 &= ar^2 = 20\\
t_6 &= ar^5 = 1280 
\end{align*}
$$

Dividing $$t_6$$ by $$t_3$$ gets rid of $$a$$, and we are left with:


$$
r^3 = \frac{1280}{20} = 64 = 4^3
$$

$$
\therefore r = 4
$$



Plugging in $$r = 4$$ into $$ar^2 = 20$$:


$$
\begin{align*}
16a &=20\\
  \therefore a &=5/4
\end{align*}
$$




$$\therefore$$ the first term is 5/4.



#### Example 2

Find the first term and common ratio of a geometric sequence which has the following general tern $$t_n$$.

1. $$3 \cdot 2^{2n+1}$$ 
2. $$3^{-n}$$ 

------

<u>Solution</u>:

Let the first term be $$a$$ and the common ratio be $$r$$.  

1. $$t_n = 3 \cdot 2^{2n+1} = 6 \cdot 2^{2n} = 6 \cdot 4^n = (6 \cdot 4) \cdot 4^{n-1} = 24 \cdot 4^{n-1}$$

$$\therefore a = 24 $$ and $$r=4$$.

2. $$t_n=3^{-n} = 3^{-(n-1)} \cdot \frac{1}{3} = \frac{1}{3} \cdot (\frac{1}{3})^{n-1}$$

$$\therefore a = \frac{1}{3}$$ and $$r=\frac{1}{3}$$.

## Geometric Mean

Another vital concept popularly used. 

The geometric mean is **the middle number $$m$$ when $$a, m,$$ and $$b$$ form a geometric sequence in that order.**

Consequently,
$$
\frac{m}{a}=\frac{b}{m} = r\\
m^2 = ab
$$
This is our theorem (1).

#### Example 1

Find integer(s) $$x$$ so that $$x, x+4,$$ and $$4x+10$$ form a geometric sequence.

------

<u>Solution</u>:

Using theorem (1),  $$(x+4)^2 = x(4x+10)$$.

We can simply solve for this quadratic for $$x=-\frac{8}{3}$$ or $$x=2$$

Since $$x$$ must be integer, $$x=2$$.



## Recursive Formula

A rare but important notation, geometric sequences can be rewritten as a recursive formula, where the $$n$$th term is a product of the $$(n-1)$$th term and the common ratio. In the recursive case, the first term must be defined.

Comparing the explicit (general) and recursive forms:

Explicit:
$$
t_n=ar^{n-1}
$$


Recursive:
$$
t_1=a\\
t_n = t_{n-1} \cdot r, (n=2,3,4,\ldots)
$$

## Worked Contest Problems

### Euclid 

#### 2015 7b

The numbers $$a_1, a_2, a_3,\ldots $$ form an arithmetic sequence with $$a_1 \neq a_2$$. The three numbers $$a_1, a_2, a_6$$ form a geometric sequence in that order. Determine all possible positive integers $$k$$ for which the three numbers $$a_1$$, $$a_4$$, $$a_k$$ also form a geometric sequence in that order.

<details>
    <summary> Solution </summary>
    Since $$a1, a2, a6$$ form a geometric sequence, we can apply the geometric mean: 
    $$
    \begin{align*}
        \frac{a_2}{a_1}&=\frac{a6}{a2} \\\\
        (a_2)^2 &= a_1 a_6
    \end{align*}
    $$
</details>
​       







#### 2014 6b

#### 2010 5b

#### 2009 9a

### AMC 10

2004 AMC 10A P18

2010 AMC 10B P16