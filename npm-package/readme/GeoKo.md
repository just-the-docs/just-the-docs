# GeoKo

GecKo is the library converting korea geolocation code.

See [demo](https://uzihoon.github.io/GeoKo/).

## Installation

Using npm

```shell
$ npm i geoko
```

## Example

```typescript
import Geoko from 'geoko';

const geolocation = new Geoko();

const tm_location = geolocation.setX(126.941961).setY(37.482393).geo_to_tm();

console.log(tm_location.x); // 194799.7146290837
console.log(tm_location.y); // 442278.8034298837
```

## Provided convert geolocation

| From  | To    | How to use     |
| ----- | ----- | -------------- |
| UTMK  | GEO   | utmk_to_geo    |
| UTMK  | TM    | utmk_to_tm     |
| UTMK  | KATEC | utmk_to_katec  |
| UTMK  | GRS80 | utmk_to_grs80  |
| GEO   | TM    | geo_to_tm      |
| GEO   | KATEC | geo_to_katec   |
| GEO   | GRS80 | geo_to_grs80   |
| GEO   | UTMK  | geo_to_utmk    |
| GRS80 | GEO   | grs80_to_geo   |
| GRS80 | TM    | grs80_to_tm    |
| GRS80 | KATEC | grs80_to_katec |
| GRS80 | UTMK  | grs80_to_utmk  |
| TM    | GEO   | tm_to_geo      |
| TM    | KATEC | tm_to_katec    |
| TM    | GRS80 | tm_to_grs80    |
| TM    | UTMK  | tm_to_utmk     |
| KATEC | GEO   | katec_to_geo   |
| KATEC | TM    | katec_to_tm    |
| KATEC | GRS80 | katec_to_grs80 |
| KATEC | UTMK  | katec_to_utmk  |

## License

Released under the [MIT License.](https://github.com/Uzihoon/GeoKo/blob/master/LICENSE)
