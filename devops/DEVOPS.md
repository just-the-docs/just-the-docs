---
layout: default
title: DevOps
has_children: true
---
# DevOps

**Purpose**

The purpose of DevOps is to ensure that software is always deployed and
tested reliably and automatically in a way that helps us and our
customers.

DevOps is the practice of writing code and configurations to accomplish
this.

## Goals of DevOps

1.  Every code project should be deployed automatically, reliably and
    predictably (by the devs and clients) to production.
2.  Every code project should automatically be tested whenever the code
    is changes, and the results should be sent to the team (on Slack).
3.  We want to minimize the effort in setting up a new environment (dev,
    prod, CI, stage). These should be as automatic as possible.
4.  Every code project should be "staged" automatically whenever the
    code changes (in the `develop` branch) so anyone can see the
    bleeding edge version in order to discuss, test, and understand
    ongoing work.
5.  Setting up a new server or developer laptop should be quick and
    painless.
6.  We should have a collecting of shared scripts that automate any
    tedious task developers need to accomplish.

<!-- end list -->

  - Subscribe to the [12 factor methodology](https://12factor.net/)
  - Automate operations to make our work more efficient, secure,
    consistent, predictable and reliable.
  - When something breaks, make it as transparent as possible (easy to
    see what happened)
  - When something breaks, find the root cause and prevent it next time.
  - Save as much time for developers as possible, by automating their
    deployments, dev env setup, and testing.
  - Eliminate unnecessary differences between projects, and have
    everything follow convention when there's no reason for deviations.
  - Reduce and simplify the steps needed to start a new project and
    integrate with everything (slack, jenkins, sentry)
  - minimize what's on the host server. Dockerize it all so it can be
    tested fully locally, and host as minimal state. ie, backup jobs are
    currently done wrong as they use the host's CRON.

### More specific goals (draft, may change)

  - It would be ideal to bring up a project environment with one short
    command. (currently, it's `git clone <repo>`, `docker-compose up`,
    and then you often need to get some test data, so 2 or more
    commands, which is a good start). The easier this is, the more our
    front end people will be able to work the same way as everyone else.
  - Committing to the master branch should run tests, and if those
    succeed, deploy to production.
  - Committing to develop should deploy to a staging environment, and
    run the tests, spamming the comitter of any errors.
  - All deployment configs should be centralized in the source
    repository. (ie, `dc.prod.yml`, `dc.stage.yml`)
  - Sentry.countable.ca should have a project for every production
    environment, and spam slack with any errors.
  - TODO: It should be fully automated to create a new jenkins slave
    server.

**Scope**

This page introduces the areas we call DevOps at Countable, from
standards and conventions, to specific tools, release management, and
information security.

## Standards and Conventions

### Servers

Each client typically has a different server environment, and Docker
mostly prevents us from caring about the differences.

### Jenkins

See the Jenkins section of this DevOps document for how we use jenkins
to automate many environment instances.

### Docker

See the Docker section of this DevOps document for how we use Docker to
manage project environments.

## Cloudflare

We use cloudflare as an SSL proxy and DNS server. Your project should
have an A record for its primary domain `project.com` which is proxied
through Cloudflare's CDN. You should have a second CNAME record which is
NOT proxied for directly accessing the server. `direct.project.com` .

## CI/CD

For every project, we should typically have 3 jenkins jobs, a
`<projectname>-stage`, `<projectname>-prod`, and `<projectname>-test`.
These use docker-compose configs from the project repo, `dc.stage.yml`,
`dc.prod.yml` and `dc.test.yml` respectively. Here is a [video on
Countable standard project
structure](https://www.youtube.com/watch?v=8ms2YQtURXM) that explains
these compose templates.

Ideally, each Jenkins job simply clones the appropriate branch onto a
node and runs `cp dc.<env>.yml && docker-compose up`, but in practice
there may be a few extra steps. One day we may be able to have every
environment just use these two commands in order to deploy.

1.  The "stage" environment automatically deploys the `develop` branch.
2.  The "prod" environment automatically deploys the `master` branch.
3.  The "test" environment automatically runs the tests on any change in
    the `develop` branch and posts the results in Slack.
4.  dc.dev.yml is intended for use by developers directly, not Jenkins,
    to manually bootstrap environments.

Tips for debugging CI/CD jobs.

  - First, look at the `console` section of your jenkins job to
    indentify the failure.
  - Try reproducing it locally `cp dc.prod.yml
    docker-compose.override.yml`, and `docker-compose up` (including any
    other steps the jenkins job does).

## Docker

Docker is vital to our dev workflow, so this section covers the basics
and getting set up, as well as providing resources further down for more
in-depth learning.

### Docker Basics

We have some training materials on Docker [here](DOCKER) and we
explain why we like to use it [here](WHY_DOCKER).

We use Docker to manage dev, test, stage and prod environments. Specific
conventions we follow:

  - It should be as easy and quick as possible to set up a new
    environment.
  - production and development environments should be as similar as
    possible (or, as practical anyway).
  - Base your Dockerfiles on official dockerhub.com images where they
    exist.
  - `docker-compose.yml` contains the Docker config which is the same
    between every environment.
  - A file called `dc.dev.yml` should exist with any settings that vary
    between environments. In a dev environment, to set up you would copy
    it and modify it locally with `cp dc.dev.yml
    docker-compose.override.yml`. Similar for `dc.stage.yml` and
    `dc.prod.yml` for other environments respectively. Our CI testing
    environments can use `dc.dev.yml`. `docker-compose.override.yml`
    should be in `.gitignore`
  - The docker-compose.override.yml file should only contain differences
    between dev and prod and other environments. This includes the
    ports, restart policy, secrets, and normally not much else. If a
    line doesn't need to be in the overrides for a specific reason, move
    it to the main docker-compose.yml instead.

### Setting Up An Environment

1.  [Install Docker on your
    machine](https://docs.docker.com/engine/installation/)
2.  Clone one of our beautiful apps. `git clone <repo>`
3.  Copy the docker override template: `cp dc.dev.yml
    docker-compose.override.yml`
4.  Run docker-compose: `docker-compose up`
5.  Navigate to [localhost](http://localhost). Ensure only one project
    is running at a time if you're using port 80 (as we do here)

### Editing the Dockerfiles

When you change something about the operating system environment your
container exposes, such as installing a new package, this is often done
in the Dockerfile itself. This will result in changes being propagated
to other environments including production when you commit the modified
Dockerfile, triggering a Docker build there. However, if you modify a
file used during the build step such as requirements.txt , other
environments won't be updated by default. To force environments to
rebuild, commit a small change to the Dockerfile. Our convention is:

    RUN echo "bust cache 33 (version)"

Bumping this version will trigger the rebuild as desired.

### Troubleshooting

When starting with Docker there are a few common issues:

  - A port you need is blocked. Typically our apps run on port 80. To
    see if something's running there, `sudo lsof -n -i :80 | grep
    LISTEN` on Linux, Mac.
  - Make sure you have a docker-compose.override.yml with port 80 mapped
    to your application.

## Jenkins

  - Changes to `develop` (branch in bitbucket) are detected and Jenkins
    automatically runs our tests and notifies us in slack of status. If
    they pass they should be deployed to a staging area.
  - Changes to `master` are deployed to the production website.

### Setting up a new project

  - Items in Jenkins (jobs) are named after their repository name. Each
    repo gets 2 items in jenkins. For a repo called wizards, the Jenkins
    items are wizards-test and wizards-deploy.
  - Create a new "item" and choose the option to clone an existing item
    called and -deploy.
  - Restrict the job to run on a specific node.
  - Change the repo URL and name of the item to match your repository.
  - Edit the job's commands to run your tests properly.
  - Configure slack to [post job status to the project
    channel](https://github.com/jenkinsci/slack-plugin#install-instructions-for-slack).

### Troubleshooting Jenkins

  - Note: If you are ever logging into a jenkins slave with SSH, and
    touching anything in the /home/jenkins/workspace folder, please
    switch to the jenkins user first with <span class="title-ref">sudo
    su jenkins</span>. This will prevent permission problems when the
    jenkins job runs again, and will prevent you from being tempted to
    run commands with <span class="title-ref">sudo</span> which is a bad
    idea in this folder due to the aforementioned permission warning.
  - Look at the console log from your Jenkins Job
  - Test that a fresh clone of your project works with the commands your
    Jenkins job runs.

### Setting up a Jenkins node & project

Create a [new
server](https://countable-ops-manual.readthedocs.io/devops/DEVOPS#id6)
first.

1.  Bootstrap the slave [using
    dotfiles](https://github.com/countable-web/dotfiles/blob/master/README.md#set-up-a-jenkins-slave).
2.  Create a Node In Jenkins, click [Build Executor
    Status](https://jenkins.countable.ca/computer/new) -\> New Node.
    Give this node a name and select Copy From Existing Node. Choose any
    existing one. Update the Node IP to your new physical node's public
    IP. This node is now what wil be used to deploy project of your
    choice.
3.  Create a Build Project In Jenkins, click new Item. Refer to existing
    projects for the configurations. Make sure the node you just created
    is being used\!

### Discussion on Usage of Jenkins

  - Jenkins is pretty great but also has a lot of shortcomings. The big
    one is you bury all this important config info in GUI menus instead
    of in a versionable place like code. Travis is better that way, but
    they're less flexible in some other ways.
  - If you find yourself building complicated scripts as Jenkins
    commands, instead script them into a bash file and just call that
    from Jenkins instead.

## Provisioning (Terraform, Ansible)

We are currently using these tools in some projects to set up nodes to
run our software on.

## DNS

On Ubuntu 18.04 and later, you can't directly edit `/etc/resolv.conf`
since Ubuntu now uses the `systemd-resolved` service by default. If DNS
is broken and you need to override DNS servers in a pinch, disable
`systemd-resolved` and edit `/etc/resolv.conf` as follows:

    sudo systemctl stop systemd-resolved
    sudo systemctl disable systemd-resolved
    sudo vim /etc/resolv.conf

(It is fine to leave `systemd-resolved` disabled and use the "old"
`/etc/resolv.conf` config directly.)

See this [Ask Ubuntu answer](https://askubuntu.com/a/1205689) for more
information.

## Backups

*ALL* production data of ours and clients' must be backed up. We must
have reasonable evidence that backups can actually be restored. For
example, periodically update your development environment's database
using a backup from production.

Backups mostly go to S3 for projects we manage hosting for. To get a
backup:

1.  Ask your manager for an AWS IAM account. [Sign in
    here](https://413528927365.signin.aws.amazon.com/console/) using
    your new credentials.
2.  Then, make yourself a token
    [here](https://console.aws.amazon.com/iam/home). Go to your username
    -\> Security credentials -\> Create access key .
3.  To download a backup, you have to install [aws
    cli](https://docs.aws.amazon.com/cli/latest/userguide/installing).
    You'll be prompted for some information:
4.  Enter your creds you generated in \#2 above. The region is
    us-east-1.
5.  Use the aws cli tools to get a backup.

<!-- end list -->

    aws s3 ls countable/backups/
    aws s3 cp s3://countable/backups/<project>/<date>.tar.lrz .

6.  Backups are archived with lrzip, so you'll have to install that (or
    7zip)

Ubuntu:

    sudo apt-get install lrzip
    lrzip -d $filename

Mac OSX: (assumes you already have [brew](https://brew.sh/) installed)

    brew install lrzip
    lrzip -d $filename

## Databases

We use postgres and occasionally mongodb. You can restore a postgres DB
in our projects as follows. Include this portion `-T template_postgis`
if you have a postgis (as opposed to plain postgres) db image in your
docker definitions. Ylotou may need to stop your other containers to
abort their connections to the db first.

    docker cp <sql filename> <project slug>_db_1:/tmp/
    docker-compose exec db dropdb -U postgres postgres
    docker-compose exec db createdb -U postgres [-T template_postgis postgres
    docker-compose exec db psql -f /tmp/<sql filename> -U postgres postgres

Never expose the db management port, it should only be accessible via
Docker.

### Migrations

Migrations should be run as a part of a startup script, so the DB schema
is always up to date with the currently running code.

Note: migration conflicts should be resolved when merging `develop` into
your working branch and not as part of operations work.

### Deploying Updates To Projects

While everything uses Docker as described above, every project is
basically a unique unicorn in terms of hosting. We use Jenkins for CI,
with 3 automated jobs.

1.  Automatically test any change to the `develop` branch
2.  Automatically deploy any change to the `master` branch
3.  Automatically run tests on any change to `develop` branch.

Generally, deploying involves updating the code from the known stable
branch

    git checkout master
    git merge develop
    git push origin master

Some projects use Jenkins to automatically test and deploy new commits.

### Static Files

An nginx container may as well always serve all static files in all
environments. This prevents us needing to worry about differences in
static file serving in various dev environments. To prevent the need to
run `collectstatic` constantly in Django projects, static files should
be served from a single directory, so that only 3rd party static files
need collected. `python manage.py collectstatic --noprompt` should be
run as part of the startup script for any Django project.

### Moving sites to a new server

Move the "stage" version of any site, first.

1.  Update the jenkins job to point to the new node. Run it, and test
    the site runs on its custom HTTP port (used by the nginx/haproxy on
    that node).

The following steps should be done as quickly as possible because your
service will be down in between these steps. Test the process on the
stage instance to ensure it goes smoothly first. It should only take a
few minutes.

1.  Set the old instance database in read-only mode if possible. For
    small sites, skip this step, and just shut it down at this time,
    resulting in some downtime.
2.  Dump the database from the old instance, and restore it to the new
    instance.
3.  Update the proxy of the old site to point to the new one to avoid
    clients with old DNS records accessing the old version, because it
    could result in DB conflicts or data loss.
4.  Set up haproxy on the new host if needed to point to your
    applicaton's production port.
5.  Update DNS to point to the new instance.
6.  Turn off the old service on the old server, to guarantee it cannot
    be accessed.
7.  Clear the cloudflare cache (purge everything) for your domain.

For some legacy sites, we store local filesystem data. This must be
moved manually to match the old server, on the new server. Ask the devs
to refactor this away where possible, and use things like S3 for
permanent file storage.

### Hosting Choices

The benefits of bare metal:

1.  lower cost per unit of RAM.
2.  serviceability in Vancouver (I can drive there in 20 minutes)
3.  faster ping for us in Vancouver
4.  much higher burstable hardware specs than any of our other hosts, so
    everything will run faster in general in production and devops tasks
5.  60ms faster ping from Davao, too.

The benefits of VM/cloud instances:

1.  Can easily replace the host if we break it.
2.  More isolation between services in most cases (this is a mixed bag
    really, and depends on many things).
3.  Ability to deploy new hardware automatically such as via Terraform

## Release Management

This document touches upon first our ideal release management process,
then some concrete processes to follow to pursue that ideal.

### Ideal Release Management Process

Each project may have some differences by the ideal release management
process should aspire to these goals:

  - Allow developers to efficiently commit code knowing it will be
    tested all at once before release.
  - Implement automated end-to-end (puppeteer) testing of core user
    flows is first, then other tests as desired.
  - Be able to confidently release every sprint (every week usually).

### Specific processes that help with the above:

  - Developers work on `feature-branch` named branches (see
    [GIT](https://countable-ops-manual.readthedocs.io/developers/GIT))
    and commit and push often. Atomic commits increase developer
    happiness by 10% according to the 2017 StackOverflow survey.
  - Developers take responsibility for cleaning up their code, testing,
    and then making a Pull Reqeust.
  - The pull request should be reviewed by a peer to adhere to our [code
    standards](../developers/CODING_STANDARDS), ensure the code is
    readable and self-documenting, and to help us learn from each other.
  - When approved, anyone may merge the Pull Request into `develop`
    (never `master` directly)
  - The `develop` branch is automatically staged so we can review the
    product together and report any bugs prior to it being released.
  - Ideally once per week, `develop` is auto-merged into `master` which
    triggers a release.
  - Critical bugfixes may bypass the above process by pushing
    [hotfixes](https://countable-ops-manual.readthedocs.io/developers/GIT)
    to `master`. Do this sparingly.

### Servers

Standardize setting up new servers. These steps are generic to AWS,
Digital Ocean, and Scaleway currently.

### Process For Troubleshooting Production Servers

Nodes are typically accessible directly with a `direct` prefix the
following forms.

  - cryptsend.io can open a shell on direct.cryptsend.io (add initial
    `direct.` to access the server IP)
  - kmc.countable.ca can open a shell on kmc-direct.countable.ca (for
    domains under our TLD, use the `-direct` suffix on the first token)

To access the node:

    ssh direct.cryptsend.io

You can sign directly into our production nodes with SSH. We recommend
using SSH keys, so if you don't have one already, do this for example.

    ssh-copy-id direct.cryptsend.io

You can now SSH in from this device without a password.

### Process For Creating Nodes

#### Providers

To choose a hosting provider.

1.  Determine if the client is providing servers. If so, work with them
    to accomodate their process and needs.
2.  If we are providing servers, and there are special needs only
    provided by AWS, use them (ie, Cognito or RDS).
3.  Otherwise, if the server must be in Canada, use Digital Ocean
    (Toronto region)
4.  If there are no restrictions, use Scaleway.

#### Node Creation

  - For Digital Ocean, choose "create-\>Droplet".
  - Choose the latest LTS Ubuntu as the OS.
  - Choose an amount of RAM and Disk space by consulting the developers
    of the system you are installing. For a Django application with low
    traffic (under 1000 visits/day, and no special compute tasks like
    video transcoding) 2GB of RAM is ok. For most systems about 50GB of
    disk space is recommended.
  - Choose a name for the node that uses the project slug (e.g.
    `cortico`) as the name. If the Node is only used in a subset of
    cases, indicate that, e.g. `cortico-clientname`.

#### Bootstrapping

  - Log in as root (or ec2-user on AWS), and create a user for yourself
    in the `sudo`, `dev`, and `docker` groups.

<!-- end list -->

    ssh root@IP.ADDRESS
    adduser myname
    
    # create groups if they don't exist
    groupadd dev
    
    usermod -aG dev myname
    usermod -aG sudo myname

  - Add your SSH key to `/home/[myname]/.ssh/authorized_keys` of the
    user you just created (create the file if it doesn't exist)
  - Install [dotfiles](https://github.com/countable-web/dotfiles)
  - Set up
    [Jenkins](https://countable-ops-manual.readthedocs.io/devops/DEVOPS#id3)
    if needed.
  - Create an account for any team member who needs access, and add them
    to the `dev` `sudo` and `docker` groups.

Run your jenkins job to test the software works.

Note, command history is stored on servers, and is not private. It's
useful to debug problems so any administrator can review others'
history.

#### Future Work

  - Document IAS usage (Terraform + Ansible for example)

## Stack Choices

TLDR, read [this](http://boringtechnology.club/)

We don't want to support every stack, so we chose the best for most
cases and want to pass on the benefits of a superior stack to our
clients, rather than them making an uninformed choice. Our stack
selection is based on the following (descending importance):

1.  Popularity, growth, longevity and community support.
2.  Power, generality, flexiblity and interoperability.
3.  Open Source, inclusive community.
4.  Ease of use, readability, simplicity.
5.  Performance.

## Back End

We've found the following back end stack to be very good on these
metrics.

  - Python - 3rd most loved language, and is the most wanted. \[1\]
  - Node.js - 4 most loved language, 2nd most wanted. \[1\]
  - Django / Flask / Express
  - Unix (Ubuntu Linux for servers)
  - PostgreSQL - 2nd most loved database \[1\]
  - Redis - most loved database \[1\]
  - Docker

\[1\] [Stack overflow dev
survey](https://insights.stackoverflow.com/survey/2018/?utm_source=Iterable&utm_medium=email&utm_campaign=dev-survey-2018-promotion)

Python in particular is a very strong general purpose stack choice. With
"software eating the world", Python's been the condiment of choice, and
is appearing in many niche industries. This lets us synergize with other
of our clients' projects, staff and expertise within the same lingua
franca.

![python
popularity](https://zgab33vy595fw5zq-zippykid.netdna-ssl.com/wp-content/uploads/2017/09/growth_major_languages-1-1024x878.png)

Avoid language-specific environment dependencies that can be met by
built in functions or by Docker. ie, you don't need virtualenv, pyenv,
grunt, gulp.

### Follow 12 factor principles

These are progressive principles for making your application predictable
and scalable.

[12factor](https://12factor.net/)

## Front End

We have a lot less prescription on the front end, and choices are based
on developer skill. However, we observe guidelines:

  - Bias towards fewer dependencies. What's the simplest set of
    dependencies that will work?
  - Bias towards small, specific purpose dependencies over frameworks.
    React, Preact and Riot is better than Angular in this way, for
    example.
  - Ensure depedencies have healthy community support and/or are small
    enough to fork if support wavers. Ideally both.

These tables capture our current thoughts on the outlook for front end
dependencies in our projects.

#### JS Frameworks

| Technology | Ideal                               |
| ---------- | ----------------------------------- |
| jQuery     | avoid, slowly migrate to native dom |
| React      | avoid, prefer preact or Vue         |
| Angular    | avoid, continue in existng usage    |
| Riot       | preferred for Django projects       |
| Vue        | preferred for SPA projects          |

#### CSS

| Technology                                                        | Current                                                                                 | Ideal |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----- |
| postCSS CSS vars / scopes SCSS other preprocessors (less/ stylus) | may use for complex css needs may use for simple projects preferred avoid, migrate away |       |

## Information Security

This draft document focuses on design of actual systems, not processes
for performing work (covered elsewhere).

### Web Application Host OS Hardening

  - Apply 'least privilege' in general. Only give users/systems access
    to sensitive information to the extent who need it, and only the
    minimum level.
  - Normally, only Jenkins should access production servers.
  - Sensitive information should be protected by 2 factors. Use ssh keys
    with passphrase or stored on an encrypted disk (with passphrase to
    boot)
  - Minimize the number of open ports (in AWS security group for
    example)
  - Use CloudFlare or another DDOS and attack detection protection
    mechanism.

### Container Security Practices \[1\]

Countable's applications are always containerized. That consistent
design lets us re-use security hardening work across projects.

  - Update CRI (Docker, rkt) — Referring above mentioned docker CVE, it
    is important to keep docker version updated
  - Deploy Only Trusted Docker Images - A malicious container can be
    loaded if an attacker has replaced the original image with the
    malicious one So, it is important to allow containers from trusted
    sources only
  - Start With A Clean OS build - It helps to ensure that host machine
    is secure from boot
  - Scan the Image For Known Vulnerabilities
  - Don't mount volumes the container does not need access to.

### Enhanced Security Requirement for DevOps Team Members

  - DevOps, CSO and ACSO team members must observe the following
    practices.
    
      - Passwords should have 70 bits of entropy. This means using 4
        randomly chosen english words, or 12 random base64 characters as
        a minimum.
      - Most password formatting requirements such as specific
        characters REDUCES entropy and makes brute force attacks easier.
      - Your local hard drive must be encrypted with a 70-bit password.
      - Do not store important or sensitive data locally. Store it in a
        secured cloud location with 2 factor auth.

\[1\] [DP Kumar Your Container is in Security Risk By
Design](https://medium.com/@dpkumar/your-container-is-in-security-risk-by-design-8a7034f2f9b1)
