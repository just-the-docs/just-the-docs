# random-streetview
Generate a random valid (on a road with StreetView or PhotoSphere) StreetView location in a given polygon. Used in https://locationestimatr.web.app.

**Browser only**

## Usage
#### Getting 3 random locations on anywhere on earth
```javascript
import randomStreetView from 'random-streetview';
const locations = await randomStreetView.getRandomLocations(3);
// example locations contents: 
// [[9.096418449685814, -2.484712600708008],
// [66.93355785447132, 21.258974075317383],
// [11.362409446559152, 76.77838325500488]]
```
#### Get random PhotoSphere in Cyprus
```javascript
import randomStreetView from 'random-streetview';
await randomStreetView.setParameters({
    //Polygon contains Cyprus:
    polygon: [[[36.050655, 35.047808], [33.588766, 34.364699], [35.235311, 30.703665]]],
    type: 'photo',
});
let location = await randomStreetView.getRandomLocation();
// example locations contents: 
// [34.956658755288984, 32.30649948120117]
```

## Documentation
### Parameters
#### `polygon` (Array | google.maps.Polygon | false) default: false
Polygon can be an array of paths, a Google Maps API Polygon object, or false. If it's false the entire world is considered.
Array containing paths, which are arrays containing coordinates.
 
Array example:

```[[[53.629774, 3.428422], [53.655826, 8.350297], [49.337423, 8.745805], [48.383385, 1.494829]]]```

These are 4 points describing one area containing the Benelux. A polygon can contain multiple disjointed areas.
#### `enableCaching` (Boolean) default: true
Whether to use localStorage caching for getting StreetView coverage of the tile.

#### `endZoom` (Integer) default: 14
At what zoom level should the algorithm try to find a valid road/PhotoSphere. Zoom levels can be visualized here: https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/. Should be between 12 and 22, however 12 is probably too low, and 22 is overkill. A small polygon can benefit from a zoom level of 18 to prevent locations being picked just outside of the polygon. 

#### `cacheKey` (String|false) default: false
When enableCaching is true, and the list of coordinates is large, it's a good idea to set this parameter. This will determine what key should be used in the cache for the given polygon, a different polygon should have a different key. When no cache key is given one will be generated from the coordinates.

#### `type` ('sv'|'photo'|'both') default: 'sv'
What type of StreetView to look for. 'sv' looks for standard StreetView roads, 'photo' looks for PhotoSpheres only, 'both' will allow both.

#### `distribution` ('weighted'|'uniform') default: 'weighted'
How the algorithm should randomly choose a location. Uniform is randomness based on area. Weighted has more chance to go to a tile with a higher amount of StreetView coverage.

![Distribution example](https://i.imgur.com/cT2fZxW.png)
As can be seen in the image above, Russia has much more StreetView coverage in the west. With uniform distribution a location in the east is as likely as a  location in the west, while with weighted distribution a location in the west will be more likely, because there is much more StreetView coverage there.

#### `google` ([Google Maps JS API](https://developers.google.com/maps/documentation/javascript/tutorial)|false) default: false
If you already use the Google api on your page (with the geometry library enabled), you can pass here so it's not loaded twice. If set to false, random-streetview will load the Google Maps API itself. 

Note: a warning might show up that no API key is set, this is not a problem as only the geometry functions are used from the Google API.
### Methods
```
async setParameters({
    polygon: false,
    enableCaching: true,
    endZoom: 14,
    cacheKey: false,
    type: 'sv',
    distribution: 'weighted',
    google` : void
})
```
Sets parameters listed above. It's not needed to call this before calling getRandomLocation. Returns Promise.
#### `async getRandomLocation()` : [lat (Number), lng (Number) | false]
Returns a Promise with a random location given the parameters. If setParameters hasn't been called it returns a random location on earth. If no valid location could be found in the polygon provided, it will return false.
#### `async getRandomLocations(nLocations, onLocationCallback)` : [[lat (Number), lng (Number)]|false]
`nLocations`: Amount of locations to find

`onLocationCallback`: Gets called for every location that's found, can be useful for when not all locations are needed at once.

Returns a Promise with the given amount of locations in an array. If no valid location could be found in the polygon provided, it will return an array of false.

#### `setHighCpuUsage()` : void
Sets normal operating mode, can cause some lag on slower devices when other CPU intensive ui tasks are being performed.

#### `setLowCpuUsage()` : void
Adds timeouts to algorithm. This will make finding a location much slower, and shouldn't be used permanently.

## How it works
The world map is divided in map tiles, each with an x and y coordinate and a zoom level. 

![workingsexample1](https://i.imgur.com/mOjiPSG.png)

This algorithm will start at the smallest tile which fully contains the given polygon (polygon shown below), which in the case of the Benelux polygon is tile (16, 10, 5). Then it will zoom into that tile, which results in 4 subtiles (32,20,6), (33, 20, 6), (32, 21, 6) and  (33, 21, 6). A random valid tile is picked based on the distribution type and the zoom process continues. A valid tile is a tile that has the right StreetView coverage (PhotoSphere or roads) and intersects the polygon. When the endZoom zoom level is reached, the final tile is found. In this tile a random road or PhotoSphere pixel is chosen, and turned into a coordinate. 

![workingsexample](https://i.imgur.com/cFLyws6.png)