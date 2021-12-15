# ngx-google-places-autocomplete
This module is a wrapper for Google Places Autocomplete js library.

[![NPM](https://nodei.co/npm/ngx-google-places-autocomplete.png)](https://nodei.co/npm/ngx-google-places-autocomplete/)

# Installation
#### npm
```
npm install ngx-google-places-autocomplete
```
#### yarn
```
yarn add ngx-google-places-autocomplete
```
# Integration
1. Add google library in your index.html file : 
```
    <script src="https://maps.googleapis.com/maps/api/js?key=<Your API KEY>&libraries=places&language=en"></script>
```
2. Replace <You API KEY> with google places api key. Ref - https://developers.google.com/places/web-service/get-api-key

# Usage
1. Add a module into your application (as a rule app.module.ts)
```ts
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
    imports: [GooglePlaceModule, BrowserModule, FormsModule, ...],
        ....
        })
```
2. Add directive ngx-google-places-autocomplete to your input field (options is an optional parammeter)
```
<input ngx-google-places-autocomplete [options]='options' #placesRef="ngx-places" (onAddressChange)="handleAddressChange($event)"/>
```
3. Additionally you can reference directive in your component
```ts
    @ViewChild("placesRef") placesRef : GooglePlaceDirective;
    
        public handleAddressChange(address: Address) {
        // Do some stuff
    }
```

# Angular Universal
In order to use under angular universal please check that comment https://github.com/skynet2/ngx-google-places-autocomplete/issues/15#issuecomment-465371214

## Options
Refer to original google maps api - https://developers.google.com/maps/documentation/javascript/places-autocomplete
Options object - https://github.com/skynet2/ngx-google-places-autocomplete/blob/master/src/objects/options/options.ts
Google doc for Options : https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions
Example : 
```html  
[options]="{
    types: [],
    componentRestrictions: { country: 'UA' }
    }"
```

# GitHub
Please feel free to declare issues or contribute: https://github.com/skynet2/ngx-google-places-autocomplete
