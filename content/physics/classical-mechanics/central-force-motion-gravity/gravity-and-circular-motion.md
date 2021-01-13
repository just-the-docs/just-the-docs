---
layout: lesson
title: Gravity and Circular Motion
author: Peter Lin
parent: Central Force Motion and Gravity
grand_parent: Classical Mechanics
---

## Circular Motion

Just like linear motion, circular motion has very similar quantities that describe similar things.

For position, velocity, and acceleration $x,\ v,\ a$, we have angle, angular velocity, and angular acceleration $\theta,\ \omega,\ \alpha$.
There is also the rotational counterpart to mass, the moment of inertia, denoted with $I$.

All kinematics equations for linear and angular motion are the same, although some angular formulas have different forms due to rewriting the expression for moment of inertia.

Circular motion can be analyzed with both a linear and angular view.
Considering a uniform circular motion of radius $r$ and period $T$,
we can derive expressions for velocity and frequency:

$$
\begin{equation}
    v = \frac{x}{T} = \frac{2 \pi r}{T}
\end{equation}
$$

$$
\begin{equation}
    f = \frac{1}{T}
\end{equation}
$$

Noting that $x = \theta r$, we can derive expressions for angular velocity and angular frequency:

$$
\begin{equation}
    \omega = \frac{2 \pi}{T}
\end{equation}
$$

Observe that converting both equations (1) and (2) produce the same equation (3).
This shows how angular velocity and angular frequency are closely related, in particular, angular frequency is the scalar of angular velocity.


## Kepler's Laws of Planetary Motion

Gravitational motion was first described as non-circular with Kepler's Laws of Planetary Motion. Kepler's Laws state:
<!--- TODO: find a replacement for enumerate)
$$
\begin{enumerate}
    \item The orbit of a planet is an ellipse.
    \item The line segment connecting a planet and the Sun sweeps out equal areas in equal intervals of time.
    \item The square of a planet's orbital period is proportional to the cube of the length of its semi-major axis.
\end{enumerate}
$$
-->

We will prove Kepler's 2nd law using conservation of angular momentum.
In a small interval of time $dt$ the area swept out by the line is a triangle with area:

$$
\begin{equation}
    A = \frac{1}{2} r \cdot v \cdot dt
\end{equation}
$$

Conservation of angular momentum states that:

$$
\begin{equation}
    mr \varDelta v = 0
\end{equation}
$$

Substituting (5) into (4), we get:

$$
\begin{equation}
    \varDelta A = \frac{1}{2} r \cdot \varDelta v \cdot dt
\end{equation}
$$

$$
\begin{equation}
    \varDelta A = 0
\end{equation}
$$

## Gravitational Motion

Consider a uniform circular gravitational orbit around the origin with radius $r$ and frequency $f$, where $p(0) = (0, r)$.

We split the motion into 2 parametric equations of $x$ and $y$:

$$
\begin{equation}
    x = rcos(2\pi f \cdot t)
\end{equation}
$$

$$
\begin{equation}
    y = rsin(2\pi f \cdot t)
\end{equation}
$$

Recalling that $\omega = 2\pi f$, we can rewrite this as:

$$
\begin{equation}
    x = rcos(\omega t)
\end{equation}
$$

$$
\begin{equation}
    y = rsin(\omega t)
\end{equation}
$$

To find the velocity and acceleration, we take the derivative:

$$
\begin{equation}
    v_x = -r\omega sin(\omega t)
\end{equation}
$$

$$
\begin{equation}
    v_y = r\omega cos(\omega t)
\end{equation}
$$

$$
\begin{equation}
    a_x = -r\omega^2 cos(\omega t)
\end{equation}
$$

$$
\begin{equation}
    a_y = -r\omega^2 sin(\omega t)
\end{equation}
$$

Using equations (14) and (15), we can derive an equation for centripetal acceleration:

$$
\begin{equation}
    a_c = \sqrt{a_x^2 + a_y^2} = \omega^2r
\end{equation}
$$

The majority of orbital problems can be solved by equating centripetal force to gravitational force.

$$
\begin{equation}
    \frac{GMm}{r^2} = m\omega^2 r
\end{equation}
$$

$$
\begin{equation}
    GM = \omega^2 r^3
\end{equation}
$$

$$
\begin{equation}
    GM = (2\pi f)^2 r^3
\end{equation}
$$

$$
\begin{equation}
    T^2 = \frac{4\pi^2}{GM} r^3
\end{equation}
$$

Notice the relation to Kepler's 3rd Law.

