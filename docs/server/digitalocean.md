---
layout: default
title: Digital Ocean Nginx
parent: Server
nav_order: 2
---




## ADDING A NEW URL

* Stop the webserver and purne the image (and network)
* Comment out the webserver info in the docker-compose file and "comment-in" the keygen info
* Update the nginx config files in both the keygen and webserver files for the new site
* run `docker-compose up -d` to verify the ACME challenge info
* If successful, **I'm not sure** but whenever you add a new site, it gives you a new key 0001 vs 0002 vs 0003, etc.
* Make sure the new key info is updated in the webserver SSL section
* Comment out the keygen info and comment in the webserver info
* remove/prune the webserver and certbot containers
* run `docker-compose up -d` and check the logs with `docker-compose logs`


## REFRESHING CERTS
* remove the certbot container
* stop and remove the webserver container
* `docker system prune` to make sure everything is gone (this removes the network, could be an issue for APIS?)
* `docker-compose up -d --force-recreate` to get running again

## RUNNING DOCKER COMPOSE (keygen and ssl files)

* Use the '-f' flag for custom file names (not docker-compose.yml): `docker-compose -f docker-compose.test.yml up`
