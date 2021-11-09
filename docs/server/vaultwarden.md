---
layout: default
title: Vaultwarden
parent: Server
nav_order: 3
---


# Hellooooo

https://github.com/dani-garcia/vaultwarden/wiki/Enabling-HTTPS

```

docker run -d --name vaultwarden \
  -e ROCKET_TLS='{certs="fullchain.pem", key="privkey.pem"}' \
  -v /root/vaultwarden/:/ssl/ \
  -v /root/vaultwarden/:/data/ \
  -p 443:81 \
  vaultwarden/server:latest

  ```

## RAN FROM Vaultwarden folder??

  ## make certs

  #### reference

  https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-on-centos-7


  sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt



sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

### THESE WORK
```
openssl genrsa > privkey.pem
openssl req -new -x509 -key privkey.pem > fullchain.pem
```

https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/

https://github.com/dani-garcia/vaultwarden/wiki/Private-CA-and-self-signed-certs-that-work-with-Chrome