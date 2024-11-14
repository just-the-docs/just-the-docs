---
layout: sidepanel
sidepanel: true
title: "Group Fairness"
nav_exclude: true
---

## Three Criteria for Group Fairness

### Examples of Group Fairness Criteria
- **Independence**: An individual’s gender should not affect their likelihood of being screened in for hiring. 

- **Separation**: Applicants who are capable of succeeding in a job should be equally likely to be screened out (resulting in a false negative outcome) in the hiring process irrespective of their gender.

- **Sufficiency**: A female applicant receiving a “7” should be equally capable of succeeding in a job as a male candidate with the same score.

### Mathematical Definitions of Group Fairness

Let G be a variable denoting the group, Y a variable denoting the label for the training data (“true outcome”), and R being the output of the procedure. Then, 
- **Independence**: R and G are independent
- **Separation**: R and G are independent, conditioned on Y
- **Sufficiency**: Y and G are independent, conditioned on R

To learn more about technical definitions of fairness, see [Fairness and Machine Learning](https://fairmlbook.org/){:target="_blank"}
