---
layout: default
title: Wireguard
parent: Server
nav_order: 1
---

# HOW TO SETUP WIREGUARD + PiHOLE
{: .no_toc }

- TOC
{:toc}

---



## Setting up the Server


### Installation & System Setup

1. Install wireguard on the server. More info [here](https://www.wireguard.com/install/):
```bash
    $ sudo apt install wireguard
```

2. Edit the file `/etc/sysctl.conf` and change and uncomment to the line that says `net.ipv4.ip_forward=1`

3. Reboot the system or run the following command to activate the changes:
```bash
    $ sysctl -p 
```


### Configuring Wireguard

1. As `root`, create a file called `wg0.conf` in the `/etc/wireguard/` folder:
2. You can generate a config at [wireguardconfig.com](https://www.wireguardconfig.com/)
3. Alternatively, you can do the following command to generate the public and private keys on your machine/server:
```bash
umask 077; wg genkey | tee privatekey | wg pubkey > publickey
```
4. Here's an example config:

```
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = <SERVERPRIVATEKEY>
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
PublicKey = <PEERPUBLICKEY>
AllowedIPs = 10.0.0.2/32

[Peer]
PublicKey = <PEERPUBLICKEY>
AllowedIPs = 10.0.0.3/32

```


### Running Wireguard

1. After the config is set up, run this from the `/etc/wireguard/` directory (you still need to be `root`):
```bash
    $ wg-quick up wg0
```

2. You can check via:
```bash
    $ wg
``` 

3. Stop wireguard from the `/etc/wireguard/` directory via:
```bash
    $ wg-quick down wg0
``` 


## Setting up the Client

1. Follow the same install steps as in the server portion
2. Modify your `wg0.conf` file to look like this:

```
[Interface]
Address = 10.0.0.2/24
ListenPort = 51820
PrivateKey = <YOURPRIVATEKEY>
DNS = 10.0.0.1 

[Peer]
PublicKey = <SERVERPUBLICKEY>
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = vpn.benflatau.com:51820
PersistentKeepalive = 30

```

## Setting up Pihole

1. Make sure `Docker` is installed on your server
2. Create a script file `createPiholeDocker.sh` with the following:

```bash
#!/bin/bash

# https://github.com/pi-hole/docker-pi-hole/blob/master/README.md

docker run -d \
    --name pihole \
    -p 10.0.0.1:53:53/tcp -p 10.0.0.1:53:53/udp \
    -p 10.0.0.1:80:80 \
    -p 10.0.0.1:443:443 \
    -e TZ="America/Los_Angeles" \
    -v "$(pwd)/etc-pihole/:/etc/pihole/" \
    -v "$(pwd)/etc-dnsmasq.d/:/etc/dnsmasq.d/" \
    --dns=127.0.0.1 --dns=1.1.1.1 \
    --restart=unless-stopped \
    pihole/pihole:latest

printf 'Starting up pihole container '
for i in $(seq 1 20); do
    if [ "$(docker inspect -f "{{.State.Health.Status}}" pihole)" == "healthy" ] ; then
        printf ' OK'
        echo -e "\n$(docker logs pihole 2> /dev/null | grep 'password:') for your pi-hole: https://${IP}/admin/"
        exit 0
    else
        sleep 3
        printf '.'
    fi

    if [ $i -eq 20 ] ; then
        echo -e "\nTimed out waiting for Pi-hole start start, consult check your container logs for more info (\`docker logs pihole\`)"
        exit 1
    fi
done;
```
3. Make the script executable:

```bash
$ chmod +x createPiholeDocker.sh
```
4. Run the script via:

```bash
$ ./createPiholeDocker.sh
```
5. Verify Pihole is running via:

```bash
$ docker ps -a
```



## Credits

Made with help from
{: .mt-4 }
- [Lawrence Systems](https://forums.lawrencesystems.com/t/getting-started-building-your-own-wireguard-vpn-server/7425)
- [/u/PanzerschreckGER](https://www.reddit.com/r/pihole/comments/bl4ka8/guide_pihole_on_the_go_with_wireguard/)
