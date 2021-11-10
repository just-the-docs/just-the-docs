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
  
  https://stackoverflow.com/questions/10175812/how-to-generate-a-self-signed-ssl-certificate-using-openssl


  sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt



sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

### THESE WORK
```
openssl genrsa > privkey.pem
openssl req -new -x509 -key privkey.pem > fullchain.pem
```

https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/

https://github.com/dani-garcia/vaultwarden/wiki/Private-CA-and-self-signed-certs-that-work-with-Chrome


##generate admin token

`openssl rand -base64 48`

## UNRAID INSTRUCTIONS

### DO THIS TO GENERATE TOKENS (LOCALHOST)
https://letsencrypt.org/docs/certificates-for-localhost/

### THIS IS THE WORKING NGINX CONFIG

```
   server {
        listen 8080 ssl http2;
        listen [::]:8080 ssl http2;
        server_name localhost;

        ssl_certificate /config/nginx/config/localhost.crt;
        ssl_certificate_key /config/nginx/config/localhost.key;

        location / {
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-Proto http;

            proxy_pass http://$host:85;
        }
    }
```

