---
layout: default
parent: DevOps
title: Docker Troubleshooting
---

# Docker Troubleshooting

## Purpose

Help with common issues when working in Docker.

## Scope

Document common problems in Docker encountered in the wild.

### 1. Confusion about Volumes

If you are unsure about what volume is mapped inside and outside containers, `touch` a file inside the volume and look at it from inside `docker exec` and outside.
