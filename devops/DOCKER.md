---
layout: default
parent: DevOps
title: Docker
---

**Purpose**

This page introduces Docker and how we use it at Countable. 

**Scope**

Patterns of our use of Docker are at the start for easy reference, followed by full coverage of our Docker learning materials. 

## Docker Patterns

>   - Move as much work as possible to earliest stage:

1.  Prep: create things to “ADD in image”. (may also be dockerized)
2.  <span class="title-ref">docker build</span> - everything in
    Dockerfile
3.  entrypoint script
4.  mount as volume
5.  during container runtime

>   - You can control whether Docker builds or downloads using both the
>     <span class="title-ref">image:</span> and
>     <span class="title-ref">build:</span> directives together in
>     docker-compose.
>   - Run your own Docker registry if you need to reply on images being
>     identical each run.
>   - Store services in docker-compose.yml and one-off tasks/jobs in
>     another docker-compose.admin.yml file.

## Docker AntiPatterns

>   - Injecting env vars from host. Generally, settings on the host can
>     be shared by accident. Not obvious to operator that it’s pulling
>     info from host. Unless done for specific environment purpose, aka
>     pass Jenkins env.
>   - Relying on DockerHub to never change images even when they have a
>     3 part semver. eg) Python:3.5.1
>   - Changing things at runtime, and losing track of changes.

## Docker Training

This explains the basics of using Docker, specifically written for Countable devs. 

If you want to know WHY we use Docker, see [Why Docker?](WHY_DOCKER.md)

Basic docker for new devs. It assumes you did [these exercises on Linux](../../programming/TRAINING/).

Check out [Docker 101](DOCKER_101.md) to learn more.