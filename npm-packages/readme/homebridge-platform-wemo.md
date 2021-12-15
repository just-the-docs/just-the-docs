## This project has moved to [homebridge-wemo](https://github.com/bwp91/homebridge-wemo).

If you are already using `homebridge-platform-wemo` you should consider moving to `homebridge-wemo`. You will need to reconfigure your HomeKit accessories from scratch - including their names, rooms, scenes and automations.

- With `homebridge-platform-wemo` still installed, you can turn on the 'Disable Plugin' and restart - this will remove your existing HomeKit accessories in case they are not removed automatically when uninstalling the plugin
- Save a copy of the `homebridge-platform-wemo` JSON configuration which you can use later for the new plugin
- Uninstall `homebridge-platform-wemo`
- Install `homebridge-wemo`
- Configure `homebridge-wemo` - you can use the JSON saved from the other plugin, just change the `platform` value from `BelkinWeMo` to `Wemo`
- Restart the new plugin - your new accessories should appear in HomeKit ready to be configured again