# homebridge-ifttt
Homebridge plugin for IFTTT Maker Channel

# Installation
Follow the instruction in [homebridge](https://www.npmjs.com/package/homebridge) for the
homebridge server installation.
The plugin is published through [NPM](https://www.npmjs.com/package/homebridge-ifttt) and
should be installed "globally" by typing:

    npm install -g homebridge-ifttt

# Configuration

Remember to configure the plugin in config.json in your home directory inside the
.homebridge directory.

Look for a sample config in
[sample.config.json](https://github.com/ilcato/homebridge-ifttt/blob/master/sample.config.json).

See [IFTTT Maker Channel](https://ifttt.com/maker) for an explanation on how to configure
an IFTTT recipe with a Maker Channel.

You need to put the IFTTT Maker channel key in the configuration file and define a set of
Buttons. Every button, once pressed with a Homekit app or via Siri, will generate an IFTTT trigger
on the Maker channel.

If you specify both "triggerOn" and "triggerOff" values to a button configuration, it will
generate different triggers for the two different statuses of the switch.

If you only specify the "trigger" value to a button configuration, it will behave like a
push button generating the trigger after the selection of the button and automatically
returning to the off status.

You can send up to 3 values (IFTTT limit) along with a button press.
Use "values" to specify which values to send.
If you'd like to send different values for "triggerOn" and "triggerOff",
use "valuesOn" and "valuesOff" respectively instead.
You can also just use "valuesOn" and "valuesOff" with "trigger".

You can delay triggers using "delayOn" and "delayOff".
If you have a button with "triggerOn" and "triggerOff", the actions can be delayed
by "delayOn" and "delayOff" respectively.

If you have a button with only "trigger" specified, the trigger can be delayed using "delayOn".

If you leave out "delayOn" or "delayOff" it will be treated as if there is no delay.
This means you can have "delayOn" without "delayOff" and vice versa or even leave both values out.
All delay values are specified in seconds.

If you use the optional "stateful" config, the switch will maintain state across shutdown/reboots. 