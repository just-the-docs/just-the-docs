---
layout: default
title: Training
parent: Programming
nav_order: 13
---

# Training

**Purpose**

Lay the groundwork for continuous learning at Countable, demonstrating how to pursue active learning and providing resources to dive into.

**Scope**

Currently covers "how to learn" and recommends dev-specific resources.

## How To Learn

  - Peer review - Reviewing the work of others in your field, and getting their feedback on your work is an effective way to learn.
    \[1\]
  - There is an open invitation to suggest training initiatives such as conferences at the Company's expense, use this.
  - Code reviews - Your feature work should go through pull requests and be reviewed by at least one person. Use this time to learn from each other. It's ok to merge if you're in a hurry and review after merging, we can always go back and change things. The purpose of code reviews is to improve and learn, not to catch bugs. That's what tests are for.

The best way to learn something is by doing it: use it for a project and put in the time tinkering with it. 

The goal of accomplishing something with the technology will keep you focused on learning what matters.

Once you tinker for a while playing with the basics of what you know, you'll start to feel more confident and familiar, have questions about things that you can't resolve through playing around, and want to move on. 

At this point, find a good tutorial on the next material you want to study.

For this training, be sure to follow the practices
[here](PROGRAMMING.md).

All training materials here are pre-approved to do on company time.

## Core Training

All developers should do the Kick Off, and any additional sections where you need training.

### Kick Off

1.  Clone this repository (our operations manual).
    `git clone https://github.com/countable-web/ops-manual.git`
2.  Install a code editor. We recommend Sublime Text, VS Code, or GitHub Atom. PyCharm can also work well if you prefer an IDE. We'll reimburse a license if you want Sublime to PyCharm.
3.  Find a mistake, or something that could be more clear or useful in this repository. Edit the corresponding markdown file you've cloned.
4.  Make a pull request to this repository.

### Docker Training

If you're new to Docker, do this. We use Docker for everything so you should get familiar with the basic concepts of running containers from images, and docker-compose which runs multiple containers at once.

[Watch this 12 minute video](https://hackr.io/tutorial/learn-docker-in-12-minutes).

[Do this tutorial](https://docs.docker.com/compose/django/).

To set up a new Django environment in Docker.

[More on Docker](../../devops/DOCKER/)

### Django Training

If you’re new to Django, [do this](https://docs.djangoproject.com/en/4.2/intro/tutorial01/). 

Most of our back end projects are Django and it's good to know how to structure a back end MVC anyway for any project.

[Use this method of setting up Django](https://docs.docker.com/compose/django/)

## Further Training

These are optional based on what specific gaps you need to fill.

I'm starting with a list of resources I've found helpful myself, or have found and can imagine being helpful for our work.

To provide a feedback loop on training efficacy, copy [this Trello Ticket](https://trello.com/c/rUsXiFoO/3-training-session-tracker-replace-title)
for each section you begin below.

### Javascript Training

  - *intermediate* [Functional programming intro](http://reactivex.io/learnrx/)
  - *intermediate* Read "Javascript, The Good Parts"
  - *advanced* [Watch Hey Underscore You're Doing it Wrong](https://www.youtube.com/watch?v=m3svKOdZijA/)

### Linux

From [linuxjourney.com](http://www.linuxjourney.com) - this site's quite a good overall resource of concise, useful and modular lessons. 

I've listed the chapters and sections (in parens) that are most useful for our work at Countable here.

*The key is to do these exercises while following along and trying out the commands in your own linux terminal.* If you just read, you won't retain very well. 

These exercise assume you're using `bash`, but some computers may use `zsh` by defualt. To remedy this, just open your shell and type `bash` to be sure the shell matches that in the exercises.

  - [Command Line Interface](https://linuxjourney.com/lesson/the-shell)
  - [Permissions](https://linuxjourney.com/lesson/file-permissions)
    (1,2,3,4)
  - [Text](https://linuxjourney.com/lesson/stdout-standard-out-redirect#)
    (1,2,3,4,5,9,16)
  - [Users](https://linuxjourney.com/lesson/users-and-groups) (1,2)
  - [Processes](https://linuxjourney.com/lesson/monitor-processes-ps-command)
    (1,7)
  - [File System](https://linuxjourney.com/lesson/filesystem-hierarchy)
    (1, 9)
  - [Networking](https://linuxjourney.com/lesson/network-basics) (1, 2,
    3, 4) - this one's not great, no explanation of ports.
  - [Domain Name System](https://linuxjourney.com/lesson/what-is-dns)
    (all) - not great, a bit wordy.

TODO
{: .label .label-yellow }

If someone is feeling energetic, please create an interactive tutorial bash script with key points from the above linuxjourney.com chapters.

From learnshell.org - Good concept but a bit slow and poor choice of material mostly. This page is ok:

  - [Variables](https://www.learnshell.org/en/Variables)

If you want to learn Linux deeply after doing the above, it's hard to beat compiling your own kernel and assembling your own userland.

  - [LFS The Book](http://www.linuxfromscratch.org/lfs/view/stable/)

### Startup School Videos

These apply quite generally to the kind of product development we take on. 

[Latest Startup School Videos](https://www.startupschool.org/latest). 

You must take notes and share them with the team.

## References

\[1\]
[Originals](https://www.amazon.ca/Originals-How-Non-Conformists-Move-World/dp/0525429565)
