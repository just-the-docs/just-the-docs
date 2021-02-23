---
layout: default
parent: Programming
title: Dependencies
---

# Dependencies

**Purpose**

This page covers dependency and framework selection and management. See
also [here](https://web.archive.org/web/20180223065908/http://discuss.joelonsoftware.com/default.asp?joel.3.219431).

**Scope**

Currently the page gives overall guidance on picking dependencies, and
provides more specific deep guidance on Javascript frameworks in
particular.

## How to Pick Dependencies

  - Dependencies have a maintenance cost. Use as few as possible.
  - Pick dependencies that do what you need, and expect to need, and no
    more.
  - Pick dependencies with active support (\> 5000 GitHub stars, recent
    commits)
  - If you really need a dependency with under 5000 GitHub stars, assume
    you may need to fork it in the future. These kinds of projects are
    at very high risk of becoming abandoned.
  - Be wary of sub-dependencies (jquery-cors). It's better to use a
    dependency with fewer upstreams (node-cors).
  - Minimize the size of the entire dependency tree. Dependencies closer
    to the underlying language or browser are better, and more likely to
    have a reasonable upgrade path because they are higher in the tree.

## Javascript Frameworks

Javascript frameworks are a big discussion and there isn't a nice answer
IMO. The problem is our projects often live for 5 to 10 years.
*Javascript frameworks do not.*

The problem of using the "framework of the day" is that Javascript
frameworks only grow for about 3 years and then they always slowly die.

jQuery is slowly fading away now, Angular has peaked and is losing
market share to React. React is close to peaking and is starting to lose
to Vue. By next year, Vue will be more popular than either Angular and
React and it's a better framework so the answer is to use Vue, right?

The problem is, we build 5 apps in Vue, and then something else replaces
it in 2 to 3 years, and we now have to support old apps in so many
frameworks with dying communities. here are Pros and Cons of the major
frameworks we consider:

  - jQuery is kind of unique since it's really a DOM library and not a
    framework. It's largely unnecessary now except as a plugin
    dependency and for animations. Otherwise, document.querySelector has
    replaced it (along with other modern dom methods, and fetch()).
    jQuery is also quite unprescriptive and so relatively harmless as a
    dependency compared to other libraries.
  - Angular is currently a bit of a mess because it's split into 2
    communities, Angular and AngularJS which are diverging frameworks.
    It also prescribes a lot of things like how to do Ajax, for no
    reason. However, we have it in several projects and it does the 2
    way dom binding well making complex UI interactions simple.
  - React is nicely scoped to just a single purpose, the view. And it's
    not split up like Angular is into 2 communities. However, while it
    doesn't over-prescribe in your application architecture, it does
    want you to use Webpack and require based architecture, which is
    awkward to work into existing projects. This (like angular) makes it
    tend towards an all or nothing approach. We also don't currently use
    React so it seems better not to throw it on the pile. Preact seems
    strictly better since it's identical but faster, with less plugin
    support.
  - Vue suffers none of the above issues and is an easy to learn,
    succinct 2 way binding lib. But, do we want to start using yet
    another lib that does the same thing?
  - Riot is like Vue or React, but simpler and less popular. Riot works
    well with Django because it has a powerful interoperability
    mechanism (observer pattern), and doesn't really prescribe much of
    anything so it's easy to add in at any time. However, Riot also has
    some fragmentation in its community, as v4 was a complete rewrite
    and introduced breaking changes from v3. Our projects still use Riot
    v3.

So, **this is the policy for now**, open to discussion of course:

1.  For projects already using jQuery, you can use it, but ideally also
    slowly migrate away from it.
2.  For projects already using Angular, we'll probably stay with it for
    quite some time.
3.  For a new "single page app", you could use (in order of descending
    preference) Riot, Vue, Preact, React or Angular.
4.  Avoid framework-specific sub-dependencies like react-hamburger-menu
    or angularstrap. Framework plugins are the first thing to die when
    the framework dies. Use dependency-free, specific purpose plugins if
    you need any.
5.  For a new Django project, use vanilla Javascript with maybe some
    Riot tags. For small interactive front end pieces, something like
    Preact or Riot is pretty ideal because they're tiny. They're so
    small that if they go out of support we can fork them. Also, they're
    so simple that a much smaller portion of your app needs to be
    coupled strongly to the framework. It's easier to port out of them.
    The only really helpful feature in React and Angular is the 2 way
    dom binding. The rest of their features are of very dubious value.
    So, by using a library like Riot that only has just that, a 2 way
    dom binding, you have way less risk associated with the dependency.
    Less of your app depends on it. Lastly, you get better performance
    since they're small, as a nice bonus.
