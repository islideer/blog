### Digital Ocean Debian-to-Arch  to Build  one's own VPN via V2ray

wget https://raw.githubusercontent.com/gh2o/digitalocean-debian-to-arch/debian9/install.sh -O install.sh

bash install.sh

pacman -S fish v2ray nano

chsh -s /usr/bin/fish

https://dash.cloudflare.com/sign-up

```bash
# /etc/modules-load.d/bbr.conf
tcp_bbr

# /etc/sysctl.d/bbr.conf
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr

# /etc/v2ray/config.json
{
  "inbounds": [
    {
      "port": 443,
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "UUID"
          }
        ]
      },
      "streamSettings": {
        "network": "http",
        "security": "tls",
        "tlsSettings": {
          "certificates": [
            {
              "certificateFile": "/etc/v2ray/v2ray.crt",
              "keyFile": "/etc/v2ray/v2ray.key"
            }
          ]
        }
      }
    },
    {
      "port": 444,
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "UUID"
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "security": "tls",
        "tlsSettings": {
          "certificates": [
            {
              "certificateFile": "/etc/v2ray/v2ray.crt",
              "keyFile": "/etc/v2ray/v2ray.key"
            }
          ]
        }
      }
    },
    {
      "port": 11111,
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "UUID"
          }
        ]
      }
    },
    {
      "port": 11112,
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "UUID"
          }
        ]
      },
      "streamSettings": {
        "network": "kcp",
        "kcpSettings": {
          "uplinkCapacity": 100,
          "downlinkCapacity": 20
        }
      }
    },
    {
      "port": 11113,
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "UUID"
          }
        ]
      },
      "streamSettings": {
        "network": "quic",
        "quicSettings": {
          "security": "aes-128-gcm",
          "key": "QUIC"
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom"
    }
  ]
}
```

systemctl enable --now v2ray