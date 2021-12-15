<p>

<img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="150">

</p>

# homebridge-plugin-govee

[![npm version](https://badge.fury.io/js/homebridge-plugin-govee.svg)](https://badge.fury.io/js/homebridge-plugin-govee)
[![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins)

Govee H5xxx Thermometer Hygrometer plugin for Homebrige. Exposes current humidity, current temperate, and low battery mode.

<img src="https://github.com/asednev/homebridge-plugin-govee/raw/master/assets/GoveeH5075.jpg" alt="Govee H5075">

## Supported Devices

- Govee H5072
- Govee H5074
- Govee H5075
- Govee H5101
- Govee H5102
- Govee H5179

## Prerequisites

- Compatible bluetooth module for macOS / Windows / Linux (see [prerequisites for noble](https://github.com/abandonware/noble#prerequisites)).
- [Homebridge](https://github.com/homebridge/homebridge/)
- node v12+

## Getting Started

This plugin is plug-and-play, it will identify Govee devices broadcasting their readings within the range over Bluetooth Low Energy. No configuration is necessary. If your sensors don't show up within 2-3 minutes, check troubleshooting steps and homebridge logs.

## Get More Out of This plugin

- [Homekit Automations based on Temperature and Humidity](https://github.com/asednev/homebridge-plugin-govee/wiki/Homekit-Automations-based-on-Temperature-and-Humidity)

## Troubleshooting

### Errors during installation of this plugin on macOS

```
No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.
No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.
No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.
gyp: No Xcode or CLT version detected!
```

- Check troubleshooting steps for `nodegyp`: https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md
- Still getting these errors, double-check that you performed troubleshooting steps for the user account running Homebridge on your mac

### Plugin installs successfully, but no sensors show up

- Check `[x] Debug` in Homebridge settings for Govee Homebridge Plugin
- Enable `Homebridge Debug Mode` in Homebridge Settings
- Check logs

## Credits

- [Homebridge](https://github.com/homebridge/homebridge/) for a great platform to build on top of.
- [Thrilleratplay/GoveeWatcher](https://github.com/Thrilleratplay/GoveeWatcher) for explanation and examples of how to decode advertisement data for Govee G5075.
- [Home-Is-Where-You-Hang-Your-Hack/sensor.goveetemp_bt_hci](https://github.com/Home-Is-Where-You-Hang-Your-Hack/sensor.goveetemp_bt_hci) for explanation and examples of advertisement data for various Govee devices.
- [@abandonware/noble](https://github.com/abandonware/noble) for a great BLE library for node
