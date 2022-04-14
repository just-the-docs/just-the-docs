---
layout: default
title: Release Management
parent: DevOps
---

# Release Management

**Purpose**

This lays out the release management process for projects at Countable.

**Scope**

This document touches upon first our ideal release management process, then some concrete processes to follow to pursue that ideal.

### Ideal Release Management Process

Each project may have some differences by the ideal release management process should aspire to these goals:

  - Allow developers to efficiently commit code knowing it will be tested all at once before release.
  - Implement automated end-to-end (puppeteer) testing of core user flows is first, then other tests as desired.
  - Be able to confidently release every sprint (every week usually).

### Specific processes that help with the above:

  - Developers work on `feature-branch` named branches (see [GIT](../../developers/GIT/)) and commit and push often. Atomic commits increase developer happiness by 10% according to the 2017 StackOverflow survey.
  - Developers take responsibility for cleaning up their code, testing, and then making a Pull Reqeust.
  - The pull request should be reviewed by a peer to adhere to our [code standards](../../developers/CODING_STANDARDS/), ensure the code is readable and self-documenting, and to help us learn from each other.
  - When approved, anyone may merge the Pull Request into `develop` (never `master` directly)
  - The `develop` branch is automatically staged so we can review the product together and report any bugs prior to it being released.
  - Ideally once per week, `develop` is auto-merged into `master` which triggers a release.
  - Critical bugfixes may bypass the above process by pushing [hotfixes](../../developers/GIT/) to `master`. Do this sparingly.

### Servers

Standardize setting up new servers. These steps are generic to AWS, Digital Ocean, and Scaleway currently.

### Process For Troubleshooting Production Servers

Nodes are typically accessible directly with a `direct` prefix the following forms.

  - cryptsend.io can open a shell on direct.cryptsend.io (add initial `direct.` to access the server IP)
  - kmc.countable.ca can open a shell on kmc-direct.countable.ca (for domains under our TLD, use the `-direct` suffix on the first token)

To access the node:

    ssh direct.cryptsend.io

You can sign directly into our production nodes with SSH. 

We recommend using SSH keys, so if you don't have one already, do this for example.

    ssh-copy-id direct.cryptsend.io

You can now SSH in from this device without a password.

### Process For Creating Nodes

#### Providers

To choose a hosting provider:

1.  Determine if the client is providing servers. If so, work with them to accomodate their process and needs.
2.  If we are providing servers, and there are special needs only provided by AWS, use them (ie, Cognito or RDS).
3.  Otherwise, if the server must be in Canada, use Digital Ocean (Toronto region)
4.  If there are no restrictions, use Scaleway.

#### Node Creation

  - For Digital Ocean, choose "create-\>Droplet".
  - Choose the latest LTS Ubuntu as the OS.
  - Choose an amount of RAM and Disk space by consulting the developers of the system you are installing. For a Django application with low traffic (under 1000 visits/day, and no special compute tasks like video transcoding) 2GB of RAM is ok. For most systems about 50GB of disk space is recommended.
  - Choose a name for the node that uses the project slug (e.g. `cortico`) as the name. If the Node is only used in a subset of cases, indicate that, e.g. `cortico-clientname`.

#### Bootstrapping

  - Log in as root (or ec2-user on AWS), and create a user for yourself in the `sudo`, `dev`, and `docker` groups.

<!-- end list -->

    ssh root@IP.ADDRESS
    adduser myname
    
    # create groups if they don't exist
    groupadd dev
    
    usermod -aG dev myname
    usermod -aG sudo myname

  - Add your SSH key to `/home/[myname]/.ssh/authorized_keys` of the user you just created (create the file if it doesn't exist)
  - Install [dotfiles](https://github.com/countable-web/dotfiles)
  - Set up [Jenkins](../JENKINS/) if needed.
  - Create an account for any team member who needs access, and add them to the `dev` `sudo` and `docker` groups.

Run your Jenkins job to test the software works.

Note, command history is stored on servers, and is not private. It's useful to debug problems so any administrator can review others' history.

#### Migrations

We may sometimes want to move docker networks across different hardware infrastructure. Here's the suggested process.

1. Spin up the new environment.
2. Sync the database (and any other assets like file uploads if not in S3) to the new system.
3. Update DNS to point to the new system.
4. As quickly as possible, redirect the old system to the new (ie, via HAPROXY on the old one).
5. Shut down the old system. It's best to just `docker-compose down` but wait a week before deleting it completely. Keep an offline snapshot of the old system, if in doubt.

#### Future Work

TODO
{: .label .label-yellow }

  -  Document IAS usage (Terraform + Ansible for example)
