# homebridge-simplisafe-security-system

This project is a [Homebridge](https://github.com/nfarina/homebridge) pluging that allows you to control your SimpliSafe 3 alarm system with the iOS 10 Home app as well as through Siri. This project uses the [SimpliSafe SS3 node.js wrapper](https://github.com/chowielin/simplisafe-ss3-nodejs). To use this, you must have a working Homebridge server running in your network.

## Screenshots
![View from the home app](/screenshots/IMG_0064.jpg?raw=true "View from the Home app.")
![Controlling alarm system](/screenshots/IMG_0065.jpg?raw=true "Controlling the alarm system.")

## Notes
- **This is the SimpliSafe Homebridge plugin originally made by [@fholgado](https://github.com/fholgado) and updated by [@chowielin](https://github.com/chowielin), I have not made any funtional changes, I am simply making this available for people without confusion about what system it was for as it took me a while to find a working solution. I am not taking credit for any of the work on this project as I have literally done nothing but repackage it.**
- The "night" toggle in the iOS 10 Home App UI sets the alarm state to "home" in SimpliSafe. This is due to SimpliSafe not having a dedicated "night" mode.
- Usage of this plugin requires the extra $10/month online monitoring plan, since that enables the required API endpoints to control the alarm remotely.

## Installation
    npm install -g homebridge-simplisafe-security-system-3


## Configuration
    {
        "bridge": {
            "name": "Homebridge",
            "username": "CC:22:3D:E3:CE:30",
            "port": 51826,
            "pin": "031-45-154"
        },

        "accessories": [
            {
                "accessory": "Homebridge-SimpliSafe",
                "name": "Alarm System",
                "auth": {
                    "username": "your@email.com", // your SimpliSafe username
                    "password": "yourawesomepassword" // your SimpliSafe password
                }
            }
        ]
    }
