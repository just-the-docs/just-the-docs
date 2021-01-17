---
layout: default
parent: DevOps
title: Jenkins
---

# Jenkins

**Purpose**

To explain how we use Jenkins at Countable.

**Scope**

Currently covers basics, setting up a new project and node, and troubleshooting.

## Jenkins

  - Changes to `develop` (branch in bitbucket) are detected and Jenkins automatically runs our tests and notifies us in slack of status. If they pass they should be deployed to a staging area.
  - Changes to `master` are deployed to the production website.

### Setting up a new project

  - Items in Jenkins (jobs) are named after their repository name. Each repo gets 2 items in jenkins. For a repo called wizards, the Jenkins items are wizards-test and wizards-deploy.
  - Create a new "item" and choose the option to clone an existing item called and -deploy.
  - Restrict the job to run on a specific node.
  - Change the repo URL and name of the item to match your repository.
  - Edit the job's commands to run your tests properly.
  - Configure slack to [post job status to the project channel](https://github.com/jenkinsci/slack-plugin#install-instructions-for-slack).

### Troubleshooting Jenkins

  - Note: If you are ever logging into a jenkins slave with SSH, and touching anything in the /home/jenkins/workspace folder, please switch to the jenkins user first with `sudo su jenkins`. This will prevent permission problems when the jenkins job runs again, and will prevent you from being tempted to  run commands with `sudo` which is a bad idea in this folder due to the aforementioned permission warning.
  - Look at the console log from your Jenkins job.
  - Test that a fresh clone of your project works with the commands your Jenkins job runs.

### Setting up a Jenkins node & project

Create a [new server](../devops/DEVOPS) first.

1.  Bootstrap the slave [using dotfiles](https://github.com/countable-web/dotfiles/blob/master/README.md#set-up-a-jenkins-slave).
2.  Create a Node In Jenkins, click [Build Executor Status](https://jenkins.countable.ca/computer/new) -\> New Node. Give this node a name and select Copy From Existing Node. Choose any existing one. Update the Node IP to your new physical node's public IP. This node is now what wil be used to deploy project of your choice.
3.  Create a Build Project In Jenkins, click new Item. Refer to existing projects for the configurations. Make sure the node you just created is being used\!

### Discussion on Usage of Jenkins

  - Jenkins is pretty great but also has a lot of shortcomings. The big one is you bury all this important config info in GUI menus instead of in a versionable place like code. Travis is better that way, but they're less flexible in some other ways.
  - If you find yourself building complicated scripts as Jenkins commands, instead script them into a bash file and just call that from Jenkins instead.