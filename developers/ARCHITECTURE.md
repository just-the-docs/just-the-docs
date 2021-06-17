---
layout: default
parent: Programming
title: Architecture
---

# Architecture

**Purpose**

This is a guideline on architecture for web applications, with the goal
of minimizing technical debt, saving time and making our programming
work more enjoyable.

**Scope**

This document provides many starting points for deep research: please
give it an initial broad read-through, then feel free to explore
particular links or topics within in greater detail.

## Getting Started

One practical way to learn about architecture in your domain is to
consider the architecture of existing apps. What works best in some, and
what works worst in others? What parts of the code are easy versus hard
to work on, and why? The architecture should create a domain language
and API that lets you do common new feature work with minimal code and
complexity, essentially specifying a pure declarative specification of
the feature in the domain language, flowing as if spoken as a list of
clear and logical requirements.

## Components

  - Consider modularity of your application. Django has good conventions
    built in for this, study those. Use "fat models" and "skinny views"
    (from 2 Scoops of Django)
  - Separate components by interface and responsibility. ie) all the
    dashboard routes should be in one file. All the dashboard utilities
    should be in another file. All the shared utilities (used by more
    than one other file) should be stored together according to
    function.

## Architecture Models

Here are some bodies of literature for thinking about architecture of
interest. Many of these are focused in the Java world, since that
ecosystem is both very mature (preceeded more modern languages). Java
also both has more cultural awareness of software architecture and the
language itself imposes more weight than modern languages on developers
so necessitates considering macrostructure and strategy earlier than
(say) you can get away with using Python.

  - [Microservices](https://dwmkerr.com/the-death-of-microservice-madness-in-2018/)
    . This model had many drawbacks if overused. It proposes a bias
    towards breaking up your application at the HTTP level (at least for
    our purposes). At Countable, the decision to split off an HTTP
    service is made with a full consideration of the costs of doing so.
    A new HTTP service is usually not our first choice for adding a new
    function to an application.

  - [Domain Driven Design](https://dddcommunity.org/book/evans_2003/)
    
    \- A set of models for thinking about software architecture in a
    business context, and therefore quite appropriate for practitioners
    who deliver real systems day to day.

  - MVC - The convention Django uses to separate modules. This (and its
    relatives) appear frequently throughout web development.

### Dependencies

1.  See any dependency as a cost. The marginal benefit (so, minus
    opportunity cost of using no dependency) must be positive, ideally
    large.
2.  When adding a new dependency, try to use one we've used in another
    project before.
3.  Failing that, choose a popular dependency with lots of github stars,
    ad test coverage. When adding a new dependency, share it in the
    \#tech slack channel (or ask another dev on your team directly) to
    see if anyone knows of a better option. Indicate what you need the
    dependency for.
4.  Avoid dependencies that themselves depend on other optional
    dependencies where possible. ie) django-celery-tags depends on
    django AND celery which increases the risk of support blackout
    periods for new versions of Django and Celery.
5.  If you must use a dependency, in general you should use the one that
    does the least additional things you're not going to use. Prefer
    micro-libraries which provide a small number of tools to accomplish
    a lot in your application's domain.

### Data Model

Spend a lot of time getting the right data model (data structures and DB
schema) as all your other application layers tend to have deeper
dependencies on this.

[Normalize](https://en.wikipedia.org/wiki/Database_normalization) your
databases. It's better to have a single source of truth by default, and
then duplicate storage if and only if you need to for performance
reasons

### Interfaces and Indirection

Interfaces occur when we create a new abstraction which messages others,
rather than a single abstraction. Strategy and tactics:

1.  Generally, function boundary interfaces are the most efficient to
    use.
2.  They should be used whenever it eliminates code duplication unless
    this would substantially reduce the overall clarity.
3.  Functions should include as few arguments as possible (loose
    coupling)

## Implementation Level Stuff

### API Views and HTTP

APIs should be designed as CRUD(L) (Create, Read, Update, Delete, List)
by default using Django Rest Framework (DRF) ModelViewSets and
serializers. Then, custom APIs that don't fit into CRUD can be added as
custom actions.

`` ` class UserViewSet(viewsets.ModelViewSet): """ A viewset for viewing
and editing user instances. """ serializer_class = UserSerializer
queryset = User.objects.all() ``\`

API calls should make one query to the database ideally, or at most a
constant number of queries. Never "N" queries. Be careful to ensure
you're not doing an additonal query for each record.
<https://drive.google.com/file/d/163h6MyqSLvaOhZ8geeDfkKmvp4lX5Zq1/view>

ie, if your DRF Serializer has a User inlined, like
<span class="title-ref">{user: {id: 1, first\_name: "Darth"}, hours:
1}</span> be sure to use <span class="title-ref">select\_related</span>
or <span class="title-ref">prefetch\_related</span> `` ` #GOOD: queryset
= TimeEntry.objects.filter(user=user.id).select_related('user') #BAD:
queryset = TimeEntry.objects.filter(user=user.id) ``\`

API Views and other server side views should take care to return the
correct [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). At a
high level:

  - Codes that start with "2" (like 200) mean the request succeeded.
  - Codes that start with "4" (like 400) mean the request is invalid, a
    problem on the client's side.
  - Codes that start with "5" (like 500) mean a problem on our end. We
    should be notified by Sentry so we know we have to look into it.

### Python

  - Never use a bare try:except block. Always name specific exceptions.
  - In web apps, keep views' code small, and include more code in models
    and service classes.
  - Use `TODO:` comments liberally.
  - Use docstrings to define the business requirements (user stories)
    associated with functions/classes.
  - Learn list comprehensions.
  - Use `dict` and the slice operator a lot.

### Unix Philosophy

To some degree, great architecture comes from experience. A great condensed resource of these lessons, mostly still relevant today, is the [Unix Philosophy](https://homepage.cs.uri.edu/~thenry/resources/unix_art/ch01s06.html). This is highly recommended reading and will help you become better at designing systems.
