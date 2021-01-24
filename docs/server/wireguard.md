---
layout: default
title: Wireguard
parent: Server
nav_order: 1
---

# HOW TO SETUP WIREGUARD + PiHOLE

Made with help from
{: .mt-4 }
- [Lawrence Systems](https://forums.lawrencesystems.com/t/getting-started-building-your-own-wireguard-vpn-server/7425)
- [/u/PanzerschreckGER](https://www.reddit.com/r/pihole/comments/bl4ka8/guide_pihole_on_the_go_with_wireguard/)



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
2. Here's an example config:


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