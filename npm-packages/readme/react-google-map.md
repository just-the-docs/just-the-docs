# react-google-map ![npm](https://img.shields.io/npm/v/react-google-map.svg) ![license](https://img.shields.io/npm/l/react-google-map.svg)

React component to render a Google Map with markers.
You can use all official Google Maps API features.

https://developers.google.com/maps/documentation/javascript/reference

![react-google-map example](/screenshots/react-google-map-exemple.png)

## Install

```sh
npm install --save react-google-map
```

__If you don't have a solution to load `googleMaps`, you could use this package:__

```sh
npm install --save react-google-maps-loader
```

## Changelog

See [changelog](./CHANGELOG.md)

## Demo

<http://cedricdelpoux.github.io/react-google-map/>

## Usage
```css

.map {
  height: 300px;
}

@media screen and (min-width: 1024px){
    .map {
        height: 500px;
    }
}
```

```js
import React, {PropTypes} from "react"

import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"

import iconMarker from "./assets/iconMarker.svg"
import iconMarkerHover from "./assets/iconMarkerHover.svg"

import styles from "./index.css"

const MY_API_KEY = "AIzaSyDwsdjfskhdbfjsdjbfksiTgnoriOAoUOgsUqOs10J0" // fake

const Map = ({googleMaps}) => (
  // GoogleMap component has a 100% height style.
  // You have to set the DOM parent height.
  // So you can perfectly handle responsive with differents heights.
  <div className={styles.map}>
    <GoogleMap
      googleMaps={googleMaps}
      // You can add and remove coordinates on the fly.
      // The map will rerender new markers and remove the old ones.
      coordinates={[
        {
          title: "Toulouse",
          position: {
            lat: 43.604363,
            lng: 1.443363,
          },
          onLoaded: (googleMaps, map, marker) => {
            // Set Marker animation
            marker.setAnimation(googleMaps.Animation.BOUNCE)

            // Define Marker InfoWindow
            const infoWindow = new googleMaps.InfoWindow({
              content: `
                <div>
                  <h3>Toulouse<h3>
                  <div>
                    Toulouse is the capital city of the southwestern
                    French department of Haute-Garonne,
                    as well as of the Occitanie region.
                  </div>
                </div>
              `,
            })

            // Open InfoWindow when Marker will be clicked
            googleMaps.event.addListener(marker, "click", () => {
              infoWindow.open(map, marker)
            })

            // Change icon when Marker will be hovered
            googleMaps.event.addListener(marker, "mouseover", () => {
              marker.setIcon(iconMarkerHover)
            })

            googleMaps.event.addListener(marker, "mouseout", () => {
              marker.setIcon(iconMarker)
            })

            // Open InfoWindow directly
            infoWindow.open(map, marker)
          },
        }
      ]}
      center={{lat: 43.604363, lng: 1.443363}}
      zoom={8}
      onLoaded={(googleMaps, map) => {
        map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
      }}
    />
  </div>
)

Map.propTypes = {
  googleMaps: PropTypes.object.isRequired,
}

export default GoogleMapLoader(Map, {
  libraries: ["places"],
  key: MY_API_KEY,
})

```

## Props
  * `autoFitBounds`: Boolean - Enable it if you will add and remove markers on the fly. Bounds will fit automatically
  * `boundsOffset`: Number - If `autoFitBounds` enabled you want custom bounds, - by default is 0.002
  * `coordinates`: Array of Marker props. You can use all props defined in `google.maps.MarkerOptions` object specification (https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions). If you need some `google.maps` constants, use the `onLoaded` prop (`onLoaded: (googleMaps, map, marker) => {}`) to update your map and markers - by default is []
  * `googleMaps`: Object - injected by placesLoader,
  * `onLoaded`: Function with two parameters (`onLoaded: (googleMaps, map) => {}`),

You can use all props defined in `google.maps.MapOptions` object specification:
https://developers.google.com/maps/documentation/javascript/reference#MapOptions

If you need some `google.maps` constants, use the `onLoaded` prop

## Development

### Clean `lib` folder

```js
npm run clean
```

### Build `lib` folder

```js
npm run build
```

### Watch `src` folder

```js
npm run watch
```

### Lint `src` folder

```js
npm run lint
```

## License

See [MIT](./LICENCE)
