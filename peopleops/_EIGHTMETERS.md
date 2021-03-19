---
layout: default
parent: People Ops
title: Eightmeters
---

# Eightmeters

**Purpose**

To identify how to use our in-house social timesheet application.

**Scope**

Currently a draft/stub article.

## What is Eightmeters

#TODO

## Timesheet Columns

*  ### Project:
    * Write the standardized slug name of the project you worked on. If you don't know the project, put "countable" in that column.
*  ### Date:
    * Write the date in ISO 8601 format: yyyy-mm-dd.
*  ### Description of Work:
    * Describe the work in a few words that indicate specific progress and outcomes you worked on for most of that day, in a language clients will understand. Between 3 and 20 words is the right level of detail. If you're entering the same phrase every day, you're not being specific enough.
    * Never combine line items. If you worked on 2 different codes (project slugs) during the day, they must be separate line items.
    * Client pay us to do work and does not care about your environment setup, training, or who works with who. Just indicate what task/objective the client requires that you were working on, any progress or setbacks, and status.
    * *Bad example:* "environment setup". Nobody cares about your environment in this context. It's an input not an output. Mention why you need to the environment and the larger task it will help you complete.
    * *Bad example:* "worked with person X". nobody cares who on our team you worked with, and as you can see it can cause the client to dispute the invoice. Mention WHAT you were working on and specifically what you accomplished on that.
    * *Bad example:* "sprint meeting". Instead, mention a key decision at the meeting or topic that helped accomplish our assigned tasks and goals.
    * *Good example:* Completed Trello Task "Title copied here". Worked on task X, but blocked by Y, so there are 3 hours left. Changed deployment parameters so that we could meet our goal of reducing downtime during deploys. Prepared report on test coverage, based on request from Bill (Client's personnel, not ours).

*  ### Trello or BitBucket ref:
    * Also include at least one of: references to issues in Trello, Commit IDs. Link to trello cards can be found in "Share and more..." after opening a card.
*  ### Hours Worked: 
    * Enter the time you spent on each project. Enter time in decimal format (1 hour and 30 mins should be entered as 1.5 hours). Total should be summed in cell E1. 
*  ### Expenses:
    * See below
    
## Expenses: 

* Expenses can be included on your timesheet below your time entries. Use a similar format as for time entries for each column. 
* Descriptions of expenses can be brief but should be detailed enough that it is understandable to your manager and accounting. If expenses were not incurred in Canadian Dollars please include the original currency amount in the description as well. 
* Enter the expenses amount in the ‘Expenses’ (F) column. Total should be summed in cell F1


## Figuring Out What To Bill

  * Describe the work in a few words that indicate specific outcomes you worked on for most of that day, in a language clients will understand. Between 3 and 20 words is the right level of detail.
  * Do not enter the same description for multiple days. Indicate what was different about each day you worked. This is easy if you enter your time every day.
  * If you don't know the project, put "Countable" in that column.
  * The `countable` project pays for your time training and learning things you need for your job (must be official training materials, or approved)
  * Training necessary for a specific project should be coded to that project.
  * Use the `countable` project for time discussing how Countable operates with team members.
  * If you're not sure what's billable, generally anything we ask you to do is billable, and anything we "invite" you to do is optional and not billable. Training is only billable if it's requested by the company that you complete specific materials, or you're learning something immediately required to solve a problem in your work. Attending events, conferences, etc, is not paid unless we require you to go for marketing or another purpose (but we'll often pay for your tickets in any case). Commuting is not paid unless it's to a client's office. Social events aren't paid.
  * Billing for travel time: If we meet each other only, or go to a workspace with no clients, transit time is not billable. When visiting clients, it is billable.

## Rules
* Do not modify the timesheet template (ex: removing/adding rows at the top of the timesheet, changing existing columns).
* Do not rename the month tabs, but changing their order is fine (you can move the current month as your first tab).
* For adding additional information or calculations for yourself, use the empty cells above the table headers or unused columns (F and beyond).

## Example
| Project      | Date       | Description of Work | Trello or BitBucket ref      | Hours Worked |
|--------------|------------|---------------------|------------------------------|--------------|
| project_slug | 2019-01-01 | Sprint meeting, discussed objectives, updated KRs | abc1234                      | 1            |
| countable    | 2019-01-02 | Worked on my objective to publish 3 new widgets, finished UI for 2nd one.  | https://trello.com/c/abc1234 | 2            |
| &nbsp;       |            |                     |                              |              |
| countable    | 2019-01-03 | Improved html tags / copy to help with SEO throughout site. | xyz1234                      | 3            |
