[![Buy Me Coffee](https://peterschmalfeldt.com/buy-me-coffee.png)](https://www.paypal.me/manifestinteractive)

Weather Underground Icons
======

These icons were created by the Graphic Designer [Ashley Jager](http://www.ajager.com/#/weather-underground/).  She released these icons in a beautiful [Adobe Illustrator](https://dribbble.com/shots/1879422-Weather-Underground-Icons) file. This project simply breaks that AI file up into web friendly icons that can be used in your projects.

![tstorms](dist/icons/black/png/256x256/tstorms.png "tstorms")

Demo Website
---

[http://peter.build/weather-underground-icons/](http://peter.build/weather-underground-icons/)

Example Application
---

Here is an [Example Application](https://peter.build/wu/) that uses these icons.  You can access the [Github Repo](https://github.com/manifestinteractive/weather-underground-app) for source code.

Usage Instructions
---

[Weather Underground](https://www.wunderground.com/) has an [API](https://www.wunderground.com/weather/api/d/docs) where you can fetch data remotely.  The API returns an `icon` parameter as part of their JSON response that you can use to load custom icons.

Image Usage Instructions
---

If you just want to use the image files directly, and not use the CSS file you can just copy over the images directly from the `dist/icons` folder.  See the *Icon Key* below to see which icons will be used.

CSS Usage Instructions
---

If you wish to use the use the CSS version of this project, you just need to copy this `dist` folder into your project.

Then you can use the icon keys with a `wu-` prefix to load whichever icon you want:

```html
<i class="wu wu-white wu-64 wu-chanceflurries"></i>
```

All CSS Icons will default to using SVG files.  However, you can use PNG sprites by adding a `no-svg` class to the parent element that contains the weather icons.  `no-svg` classnames will be added to your HTML tag automatically if you are using [Modernizr](https://modernizr.com/) and the browser does not support SVG.

### Icon Class Colors:

* `wu-black` icons with `black` lines

```html
<i class="wu wu-black wu-32 wu-chanceflurries"></i>
```

![tstorms](dist/icons/black/png/32x32/tstorms.png "tstorms")

* `wu-white` icons with `white` lines

```html
<i class="wu wu-white wu-32 wu-chancerain"></i>
```

![tstorms](dist/icons/white/png/32x32/tstorms.png "tstorms")

### Icon Class Day & Night:

* Default is to use Day Icons

```html
<i class="wu wu-black wu-32 wu-clear"></i>
```

![clear](dist/icons/black/png/32x32/clear.png "clear")

* `wu-night` to use Night Icons

```html
<i class="wu wu-white wu-32 wu-clear wu-night"></i>
```

![clear](dist/icons/white/png/32x32/nt_clear.png "clear")

### Icon Class Sizes:

* `wu-16` 16x16px icons

```html
<i class="wu wu-black wu-16 wu-chancesnow"></i>
```

![chancesnow](dist/icons/black/png/16x16/chancesnow.png "chancesnow")

* `wu-32` 32x32px icons

```html
<i class="wu wu-black wu-32 wu-chancetstorms"></i>
```

![chancetstorms](dist/icons/black/png/32x32/chancetstorms.png "chancetstorms")

* `wu-64` 64x64px icons

```html
<i class="wu wu-black wu-64 wu-clear"></i>
```

![clear](dist/icons/black/png/64x64/clear.png "clear")

* `wu-128` 128x128px icons

```html
<i class="wu wu-black wu-128 wu-cloudy"></i>
```

![cloudy](dist/icons/black/png/128x128/cloudy.png "cloudy")

* `wu-256` 256x256px icons

```html
<i class="wu wu-black wu-256 wu-flurries"></i>
```

![flurries](dist/icons/black/png/256x256/flurries.png "flurries")

Day Icon Key
---

Here are the `icon` options for each weather option:

ICON | KEY | DESCRIPTION
---- | --- | -----------
![chanceflurries](dist/icons/black/png/32x32/chanceflurries.png "chanceflurries") | chanceflurries | Chance of Flurries
![chancerain](dist/icons/black/png/32x32/chancerain.png "chancerain") | chancerain | Chance of Rain
![chancesleet](dist/icons/black/png/32x32/chancesleet.png "chancesleet") | chancesleet | Chance Freezing Rain
![chancesnow](dist/icons/black/png/32x32/chancesnow.png "chancesnow") | chancesnow | Chance of Snow
![chancetstorms](dist/icons/black/png/32x32/chancetstorms.png "chancetstorms") | chancetstorms | Chance of Thunderstorms
![clear](dist/icons/black/png/32x32/clear.png "clear") | clear | Clear
![cloudy](dist/icons/black/png/32x32/cloudy.png "cloudy") | cloudy | Cloudy
![flurries](dist/icons/black/png/32x32/flurries.png "flurries") | flurries | Flurries
![fog](dist/icons/black/png/32x32/fog.png "fog") | fog | Fog
![hazy](dist/icons/black/png/32x32/hazy.png "hazy") | hazy | Haze
![mostlycloudy](dist/icons/black/png/32x32/mostlycloudy.png "mostlycloudy") | mostlycloudy | Mostly Cloudy
![mostlysunny](dist/icons/black/png/32x32/mostlysunny.png "mostlysunny") | mostlysunny | Mostly Sunny
![partlycloudy](dist/icons/black/png/32x32/partlycloudy.png "partlycloudy") | partlycloudy | Partly Cloudy
![partlysunny](dist/icons/black/png/32x32/partlysunny.png "partlysunny") | partlysunny | Partly Sunny
![rain](dist/icons/black/png/32x32/rain.png "rain") | rain | Rain
![sleet](dist/icons/black/png/32x32/sleet.png "sleet") | sleet | Freezing Rain
![snow](dist/icons/black/png/32x32/snow.png "snow") | snow | Snow
![sunny](dist/icons/black/png/32x32/sunny.png "sunny") | sunny | Sunny
![tstorms](dist/icons/black/png/32x32/tstorms.png "tstorms") | tstorms | Thunderstorms
![unknown](dist/icons/black/png/32x32/unknown.png "unknown") | unknown | Unknown


Night Icon Key
---

Here are the `icon` options for each weather option:

ICON | KEY | DESCRIPTION
---- | --- | -----------
![chanceflurries](dist/icons/black/png/32x32/nt_chanceflurries.png "chanceflurries") | chanceflurries | Chance of Flurries
![chancerain](dist/icons/black/png/32x32/nt_chancerain.png "chancerain") | chancerain | Chance of Rain
![chancesleet](dist/icons/black/png/32x32/nt_chancesleet.png "chancesleet") | chancesleet | Chance Freezing Rain
![chancesnow](dist/icons/black/png/32x32/nt_chancesnow.png "chancesnow") | chancesnow | Chance of Snow
![chancetstorms](dist/icons/black/png/32x32/nt_chancetstorms.png "chancetstorms") | chancetstorms | Chance of Thunderstorms
![clear](dist/icons/black/png/32x32/nt_clear.png "clear") | clear | Clear
![cloudy](dist/icons/black/png/32x32/nt_cloudy.png "cloudy") | cloudy | Cloudy
![flurries](dist/icons/black/png/32x32/nt_flurries.png "flurries") | flurries | Flurries
![fog](dist/icons/black/png/32x32/nt_fog.png "fog") | fog | Fog
![hazy](dist/icons/black/png/32x32/nt_hazy.png "hazy") | hazy | Haze
![mostlycloudy](dist/icons/black/png/32x32/nt_mostlycloudy.png "mostlycloudy") | mostlycloudy | Mostly Cloudy
![mostlysunny](dist/icons/black/png/32x32/nt_mostlysunny.png "mostlysunny") | mostlysunny | Mostly Sunny
![partlycloudy](dist/icons/black/png/32x32/nt_partlycloudy.png "partlycloudy") | partlycloudy | Partly Cloudy
![partlysunny](dist/icons/black/png/32x32/nt_partlysunny.png "partlysunny") | partlysunny | Partly Sunny
![rain](dist/icons/black/png/32x32/nt_rain.png "rain") | rain | Rain
![sleet](dist/icons/black/png/32x32/nt_sleet.png "sleet") | sleet | Freezing Rain
![snow](dist/icons/black/png/32x32/nt_snow.png "snow") | snow | Snow
![sunny](dist/icons/black/png/32x32/nt_sunny.png "sunny") | sunny | Sunny
![tstorms](dist/icons/black/png/32x32/nt_tstorms.png "tstorms") | tstorms | Thunderstorms
![unknown](dist/icons/black/png/32x32/nt_unknown.png "unknown") | unknown | Unknown


Day Icon Preview
---

![White Day Icons](dist/icons/white/icon-preview.png "White Icons")

![Black Day Icons](dist/icons/black/icon-preview.png "Black Icons")

![White Day Icons](dist/icons/solid-white/icon-preview.png "White Icons")

![Black Day Icons](dist/icons/solid-black/icon-preview.png "Black Icons")


Night Icon Preview
---

![White Night Icons](dist/icons/white/icon-preview-nt.png "White Icons")

![Black Night Icons](dist/icons/black/icon-preview-nt.png "Black Icons")

![White Day Icons](dist/icons/solid-white/icon-preview-nt.png "White Icons")

![Black Day Icons](dist/icons/solid-black/icon-preview-nt.png "Black Icons")
