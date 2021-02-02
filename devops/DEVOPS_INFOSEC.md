---
layout: default
parent: DevOps
title: DevOps Information Security
---

# DevOps Information Security

**Purpose**

To explain the DevOps-specific Information Security practices at Countable.

**Scope**

Currently covers web app host OS hardening, container security practices, and the enhanced security requirements for Countable DevOps team members.


## Information Security

This draft document focuses on design of actual systems, not processes for performing work [see Information Security](/programming/INFOSEC/)

### Web Application Host OS Hardening

  - Apply 'least privilege' in general. Only give users/systems access to sensitive information to the extent who need it, and only the minimum level.
  - Normally, only Jenkins should access production servers.
  - Sensitive information should be protected by 2 factors. Use ssh keys
    with passphrase or stored on an encrypted disk (with passphrase to
    boot)
  - Minimize the number of open ports (in AWS security group for
    example)
  - Use CloudFlare or another DDOS and attack detection protection
    mechanism.

### Container Security Practices \[1\]

Countable's applications are always containerized. That consistent design lets us re-use security hardening work across projects.

  - Update CRI (Docker, rkt) — Referring above mentioned docker CVE, it is important to keep docker version updated
  - Deploy Only Trusted Docker Images - A malicious container can be loaded if an attacker has replaced the original image with the malicious one So, it is important to allow containers from trusted sources only
  - Start With A Clean OS build - It helps to ensure that host machine is secure from boot
  - Scan the Image For Known Vulnerabilities
  - Don't mount volumes the container does not need access to.

### Enhanced Security Requirement for DevOps Team Members

DevOps, CSO and ACSO team members must observe the following practices:
    
- Passwords should have 70 bits of entropy. This means using 4 randomly chosen english words, or 12 random base64 characters as a minimum.
- Most password formatting requirements such as specific characters REDUCES entropy and makes brute force attacks easier.
- Your local hard drive must be encrypted with a 70-bit password.
- Do not store important or sensitive data locally. Store it in a secured cloud location with 2 factor auth.

\[1\] [DP Kumar Your Container is in Security Risk By Design](https://medium.com/@dpkumar/your-container-is-in-security-risk-by-design-8a7034f2f9b1)
