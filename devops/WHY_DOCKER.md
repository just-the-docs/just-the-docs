# Why Docker?
---
layout: default
parent: DevOps
---

**Purpose**

To explain why we are a Docker shop, and how it enables us to have a
smoother more adaptable approach to deploying our projects.

**Scope**

Currently combines two former internal articles, "The Allure of Docker"
and "A Pure Docker Workflow for Django."

## What Do We Mean By "Pure Docker"

The goal of a "Pure Docker" workflow is to use Docker (and
docker-compose) to manage as many aspects as possible of both your
development environment and production environment. (And CI, staging,
test, etc)

It should be possible to get a new dev environment up and running (with
very few exceptions), using just a single command “docker-compose up”

## Why Docker?

Developers use GIT to encourage consistency inside their project tree,
but outside that tree is a black box. Docker can help control this
“outer” environment to avoid mistakes and wasted time caused by
unnecessary differences there.

One way to think of this is that your Dockerfile serves as a cleaner,
more rigorous, and more automated version of your projects README file.
To summarize the resulting benefits:

  - Docker can simplify dev environments, avoiding several other tools
    such as PyEnv, virtualenv, BASH setup scripts.
  - Reduce the setup time for new developers. With this process, I’ve
    even had less technical users like designers and managers run a
    local copy of the project in KiteMatic with nearly zero assistance.
  - By abstracting away the development environment.
  - Prevents issues which may arise from differences between your team’s
    development environments, since Docker essentially promises a
    similar server platform everywhere.
  - Enforces maximum similarity between dev environments and production
    (and others), which improves the efficacy of testing (closer
    simulation). Because of this similarity, developers (and other
    contributors) will find more bugs that might eventually appear in
    production instead. This also allows developers to design and test
    production deployment scenarios on their own machines.
  - Encourages that settings and configuration that are local to one’s
    development environment comprise the minimal possible set. For
    example, there’s no reason for each developer to set up a database
    with a different name in their environment. There should be no
    application-level configuration that changes between development
    environments.

## Is Docker Actually Useful For Developers?

This is a post about Docker for programmers, since most of what’s out
there is geared more towards so-called “operations” and not actual
software development. So, let’s talk about you. You’re a programmer, and
you also use GIT for source control. If that’s not you, some analogies
below might be lost. I look forward to your comments\!

As a topic, Docker can be a can of worms. It’s suffered its share of
broad, sweeping statements, sucked into a gale of hype, where they are
repeated and debated until the emerging message isn’t especially
helpful.

You see posts about how Docker changes everything, what you can do with
Docker, what you should and shouldn’t do, and lots of pictures of crates
on whale shaped container ships. To make things even harder to
understand, many of these articles are written by and for “operations”
folks, which can be quite a different world from actual software
development.

As a result, many brilliant technical folks I run into have a strange
combination of strong opinions, and wide gaps in understanding of what
Docker is actually useful for. The purpose of this post is to share ways
in which real programmers can use Docker to solve real problems, maybe
even some you didn’t know you had\!

Here’s a short list of these, before we dive in:

1.  Automate your README - A Dockerfile can be used like a setup shell
    script that actually works in every environment. And, it’s way more
    rigorous than a README with setup instructions/commands because it
    actually created your environment. A README could have mistakes the
    author missed, or get out of date since it doesn’t actually run the
    commands in it.
2.  You can send someone a working, complicated server, so they don’t
    have to set it up themselves.
3.  In many cases, use it like a VM, except it boots up in 1 second and
    can be recreated almost as quickly if you break it. Generally, no
    need for snapshots anymore\!
4.  Easily create a complicated swarm of servers.
5.  Move, re-create, share, or deploy your dev environment
    automatically. Useful for continuous integration or working on a
    team.
6.  Pack several completely isolated servers onto a single host
    (physical or VM). This lets you avoid paying for tons of small 2GB
    servers with only 100MB of RAM in use. Then, run the whole swarm on
    your laptop with a few keystrokes.
7.  Set up tools servers (GitLab, OwnCloud, Redmine) in literally
    seconds. Sure, you’ll want to spend some time to set up backups at
    some point but if you’re just evaluating a tool server, it’s
    incredible how fast you can get started.
8.  Test your system in many different server permutations, database
    backends, distributions, etc.
9.  Helps you control the modularity of your environment, isolate
    components, and manage upgrades. Run every process in its own
    server, all in a single server, or anything in between. Zealots may
    tell you the former option is the only one, but really it’s up to\!
10. Keep your laptop nice and clean\! Avoid your dev environments making
    a mess of your laptop by installing KiteMatic and using docker with
    isolated dev environments for all your projects. For Windows users,
    you’ll need a VM to run docker at this time, as KiteMatic isn’t
    stable on Windows yet (IMO).

## Docker Reduces Your Total Dependencies

As a Javascript developer, I’ve become relatively tool-averse as a
result of the deluge of “indispensable” libraries (see [Atwood’s
Law](https://blog.codinghorror.com/the-principle-of-least-power/)) which
appear faster than I can try them. Give me some simple but powerful
primitives and I’ll build my own tools and fully understand them when
they break, right?

Why, then, should I promote Docker? Isn’t it just another tool thrown on
the steaming pile? On the contrary, I’m able to use **less** other tools
because of Docker.

On average, I estimate that Docker is -1 additional tools for projects
I’ve added it to. That’s right, I use two fewer other tools, making
Docker contribute negatively tool count. It’s like how buying more
shelves for your apartment doesn’t count as “stuff” since it gives you
more free space… but I digress.

Docker doesn’t replace the following list of tools in every instance,
but there may be cases where you just don’t need these things because
you introduced docker:

1.  python - virtualenv - isolates your python deps - your environment
    is a container already, why bother virtualizing
2.  python - pyenv - allows easily switching python versions - like the
    above, just docker run python:3.4.1 to get an exact version to test
    with.
3.  deployment - supervisord - docker is a process supervisor if your
    needs are simple.
4.  cron - task scheduling - just run each task in a container with a
    simple timer of any kind (I use sleep since I’m not concerned with
    exact run times), it’s easier to monitor than cron when something
    breaks, just docker attach to a job to watch it\!
5.  chroot - jail a process - need i explain?

Again, in some cases you need a more specific tool, but very often you
don’t.

## Common Objections to Docker

\* Docker is just a rebrand / repackaging of some old linux features
like cgroups, aufs, LXC, and some scripts. I never used those, why use
this? Docker is a **very nice** repackaging of those. Those linux
features are great but it can be too much effort to use on their own. No
one really used tablets before ipad…

\* Docker isn’t a silver bullet. You’re right\! But, metaphorical silver
bullets may not even exist. Docker doesn’t solve every dev environment
and deployment issue, but it’s a powerful tool and makes many things
that much easier.

\* Docker lets you do things without understanding them. How can I trust
a server some random person built from Docker Hub? This one’s on you.
Just any 3rd party project on GitHub or anywhere, only pull from
repositories you trust, and when in doubt, review the Dockerfile.
Compared with most software distribution tools, Docker is very
transparent about what you’re getting.

## Think GIT for Dev Environments

Frustrated by the lack of clarity, I just started using Docker and
muddled through a LOT of learning pains. I’d compare this experience to
my first time using GIT. I don’t say this lightly, as it may be the
strongest praise I can possibly bestow on a tool. The best tools don’t
just empower you to do things easier and better, they include a
philosophy with which to think about your work differently so that
previously hard problems become simple.

GIT is one of those tools which can (in cases) transform an ordinary
human into a wizard of the highest order when it comes to tracking your
code. To remind yourself of this, talk to a non-programmer about their
work and realize their work is does doesn’t have a flawless, easily
searchable historical system with everything they’ve ever done that can
be nigh-effortlessly merged with their colleagues’ work, avoids
duplication, the list goes on... and this system even works when the
internet is down\!

It’s easy to take for granted, but think back before GIT. You were
probably happily versioning another tool, but you started hearing about
GIT more and more. Then, due to some event (possibly your curiousity
reaching a tipping point), you tried GIT.

If you’re like me, getting started with GIT, you probably often wondered
if you were doing things the “right” way. Should you make a branch?
Merge or rebase? Use a central repo? And if so, how often do I push?
Many of these concepts were new or different from comparable tools at
the time.

Early on, and more often than I like to admit, I also managed to really
&\!^\# my GIT environment, with no understanding of how it was broken or
how to recover it. But as time went on, things slowly improved, and my
impression of GIT evolved from “esoteric, masochistic and unnecessary”
to “elegant, powerful and indispensable”.

The community and tools around GIT have evolved to the point that it now
feels I can telepathically transmit a program to another developer as
simply as “git push”. This, combined with GIT’s simple (in hindsight)
and transparent design on a content addressable filesystem has made it
hard to imagine going back to another source control tool.

Now, think of Docker as GIT, not for your code, but for the rest of your
development environment. GIT For everything in your source code folder,
Docker to control everything outside of it. And by dev environment,
Docker is a powerful way to simulate any (non-human) elements of the
outside world. This is just an analogy, but it goes pretty far for me.
Other similarities:

1.  GIT has GitHub, Docker has DockerHub, both (relatively) open
    communities for sharing intellectual capital and collaborating.
2.  Both impose a philosophy - A distinct set of conventions and models
    on the way you work. This is where the pain comes from the first
    time you sit down with either, and where the enlightenment comes
    from later on.
3.  Both take a previously unstructured system that was a distraction to
    our core task of programming something of value, (Git: your code,
    Docker: your OS/Environment) and make it disappear through
    convention and automation.

## What is Docker, Actually?

In practice, the term Docker refers to a combination (and even an
ecosystem) of technologies: 1. The Docker CLI binary (program). This is
a command line tool that lets you manage your servers (called
Containers), often similar to how GIT lets you manage your code project.
2. The Docker Daemon, which monitors your containers. 3. Docker, the
company. 4. Docker, the ecosystem.

“Let’s switch to Docker” really refers to changing an entire operations
system including the Docker CLI, daemon and more.

## Utility Containers

You may want a separate container to automate common tasks in your dev
environment, for the same reason as usual - it will let anyone do it
anywhere with no setup. For example, a docker image to manage webpack
for client assets:

<http://www.wolfe.id.au/2015/08/08/development-with-webpack-and-docker/>

This guy gets it, by the way. At the top of his post he’s pointed out
why he’s using docker for something he could easily do elsewhere, citing
some of our favourite things “Portable build environment”, “Simplified
on-boarding of new developers”, “Consistency between development and
continuous integration”. Webpack is one of the worst things ever to
configure, and he’s doing most of that for you using Docker.

### Learning Pains

1.  Permissions - these do not map effectively from inside and outside
    your container.
2.  Container lifecycle - assume your container could be destroyed and
    recreated at any time.
3.  Other Quirks - remembering each container has essentially its’ own
    filesystem, and many other small considerations.

### Getting Stuff In and Out

There are 2 ways to put stuff in your container, ADD it in the
dockerfile (build time), or mount it during run-time via a VOLUME. The
latter is preferable for development environments.

## What's the Big Secret With Docker?

Think of Docker as a powerful tool to do things in a way that is faster,
easier, more organized and reproducible, and more fun\! When someone
says “you’re doing it wrong”, ignore them. Or better, ask “what’s your
actual concern”, and then test that. It’s easy to go back and change
things, so when in doubt, try it out\!

Of course, in the case of a production environment you should always
test before you go live. But it’s **way** too early for dogma. It will
only prevent you from learning, and from discovering new uses for
Docker.
