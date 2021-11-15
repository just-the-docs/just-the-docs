---
layout: default
title: Vaultwarden
parent: Server
nav_order: 3
---


# Setting up Vaultwarden (on Unraid)

### Step 1: Install vaultwarden in the app store

* Repo here: `https://github.com/dani-garcia/vaultwarden/`
* In this example, I have it running on PORT **85**

### Step 2: Setup Nginx as a Reverse Proxy for HTTPS

More info on https here: `https://github.com/dani-garcia/vaultwarden/wiki/Enabling-HTTPS`

1. I used the `binhex-nginx` image
2. The nginx container was set to port `8080` within the unraid ecosystem

### Step 3: Generate SSL Self-Signed Certs

I followed these instructions: `https://letsencrypt.org/docs/certificates-for-localhost/`

Which reference these commands: 

```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

```

* Note: CN=localhost references the local IP/Hostname. This should match the IP/hostname you want (usually it's localhost...)

### Step 4: With the certs generated, make sure they are moved/present in the volume mounted in the nginx docker file

* For unraid, this is `/mnt/user/appdata/binhex-nginx/`
* the binhex docker container mounts the unraid folder to `/config` (this will be important when locating the certs in the nginx.config file)

### Step 5: Configure Nginx

See annotated notes for what each line means

#### RAW
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

#### ANNOTATED

```
   server {
        listen 8080 ssl http2; 

        # port 8080 is defined in the dockerfile, so when an outside request comes to port 8080, it's directed to nginx to handle. Also note the `ssl` and `http2` to say that everything will be via SSL. In other ngninx configs, I re-route HTTP to HTTPS, but this is a lazy shortcut... 

        listen [::]:8080 ssl http2;
        # same notes as above, I probably don't need this line

        server_name localhost;
        #localhost seems to work fine for VPN and local, however, use the IP for both instances, this doesn't resolve `tower.local`, for example

        ssl_certificate /config/nginx/config/localhost.crt;
        ssl_certificate_key /config/nginx/config/localhost.key;
        # note how the paths are configured, /config is the root directory in the docker container. Then nginx/config/KEY comes from the folder mounted from unraid.

        location / {
            proxy_set_header Host $host;
            #dunno what this does, but seems good

            proxy_set_header X-Forwarded-Proto http;
            #also didn't look this up, but seems good?

            proxy_pass http://$host:85;
            #all the lines above lead to this one. routes on :8080/ are directed to port 85 (Vaultwarden). Now vaultwarden is always served via HTTPS, yay!
        }
    }
```

### NEXT STEPS GETTING VAULTWARDEN RUNNING ON NGINX
