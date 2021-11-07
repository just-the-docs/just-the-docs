---
layout: default
title: Vaultwarden
parent: Server
nav_order: 3
---


# Hellooooo

https://github.com/dani-garcia/vaultwarden/wiki/Enabling-HTTPS

```

docker run -d --name bitwarden \
  -e ROCKET_TLS='{certs="/ssl/certs.pem",key="/ssl/key.pem"}' \
  -v /ssl/keys/:/ssl/ \
  -v /vw-data/:/data/ \
  -p 443:80 \
  vaultwarden/server:latest

  ```


  ## make certs

  #### reference

  https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-on-centos-7


  sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt



sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
