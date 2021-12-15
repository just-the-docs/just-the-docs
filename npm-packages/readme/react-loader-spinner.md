<p>
  <img src="https://raw.githubusercontent.com/vishalsaugat/react-loader-spinner/master/react-loader-spinner.png" alt="title"/>
</p>


 react-spinner-loader provides simple React.js spinner component which can be implemented for async wait operation before data load to the view.

 This is originally a fork from https://github.com/mhnpd/react-loader-spinner
### Installation

##### Using NPM:
#
```sh
$ npm install react-loader-spinner --save
```
##### Using yarn
#
```sh
$ yarn add react-loader-spinner
```

##### Import required css
#
```sh
 import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
```

#  Demo
[View in page]




### Usage
```
 import Loader from 'react-loader-spinner'
 export default class App extends React.Component {
  //other logic
    render() {
	 return(
	  <Loader
	     type="Puff"
	     color="#00BFFF"
	     height={100}
	     width={100}
	     timeout={3000} //3 secs
		 svgClass="my-custom-class"
	  />
	 );
    }
 }
```

### If webpack throw issue with css. (For older version of this package)
Change webpack config as:
```  test: /\.scss$/ to test: /\.s?css$/ ```
<br/><br/>
<small>Newer version just import css file from node modules to app.js<small>

### Types of Spinner
react-loader-spinner component has following types of spinner.

| Spinner Type | Implementation |
| ------ | ------ |
| Audio|``` <Loader type="Audio" color="#somecolor" height={80} width={80} />``` |
| Ball-Triangle | ``` <Loader type="BallTriangle" color="#somecolor" height={80} width={80} /> ```|
| Bars | ```<Loader type="Bars" color="#somecolor" height={80} width={80} />``` |
| Circles | ```<Loader type="Circles" color="#somecolor" height={80} width={80}/>``` |
| Grid|```<Loader type="Grid" color="#somecolor" height={80} width={80} />``` |
|Hearts|```<Loader type="Hearts" color="#somecolor" height={80} width={80} />```|
|Oval|```<Loader type="Oval" color="#somecolor" height={80} width={80} />```|
|Puff|```<Loader type="Puff" color="#somecolor" height={80} width={80} />```|
|Rings|```<Loader type="Rings" color="#somecolor" height={80} width={80} />```|
|TailSpin|```<Loader type="TailSpin" color="#somecolor" height={80} width={80} />```|
|ThreeDots|```<Loader type="ThreeDots" color="#somecolor" height={80} width={80} />```|

> There are more. View [storybook] to see all list.

### PropTypes Available
react-loader-spinner component accept following props. Instructions on how to use them are below.


| name | types | default | Detail |
| ------ | ------ |------|------|
| visible | String or boolean  | false | Show/ Hide the loader as required. |
| type | String  | "Audio" | Type of spinner you want to display. View the type in Types of Spinner section. |
| height | Number  | 80 |  Height props define the height of the svg spinner. Default height is 80px.|
| width | Number  | 80 |  Width props define the width of the spinner.  |
| color | String  | "Blue" |  [Color Props is provide color to the spinner |
| timeout | Number  | 0 |  Duration in miliseconds after which spinner is disabled |
| svgClass | String  | "svg-loader-lement" |  Class that will be applied to the svg element |

### TODO LIST
* Change Docs on Storybooks
* Optimize css implementation
* Add support for Typescript.
* Optimization for multiple color support.


License
----

MIT



   [svg-loader]: <https://github.com/SamHerbert/SVG-Loaders>
   [here]: <http://samherbert.net/svg-loaders>
   [View in page]: https://mhnpd.github.io/react-loader-spinner/
   [storybook]: https://mhnpd.github.io/react-loader-spinner/

