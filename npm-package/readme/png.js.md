png.js
======
A PNG decoder in JS for the canvas element or Node.js.

## Browser Usage
Simply include png.js and zlib.js on your HTML page, create a canvas element, and call PNG.load to load an image.

    <canvas></canvas>
    <script src="zlib.js"></script>
    <script src="png.js"></script>
    <script>
        var canvas = document.getElementsByTagName('canvas')[0];
        PNG.load('some.png', canvas);
    </script>
    
The source code for the browser version resides in `png.js` and also supports loading and displaying animated PNGs.
    
## Node.js Usage
Install the module using npm

    sudo npm install png-js
    
Require the module and decode a PNG

    var PNG = require('png-js');
    PNG.decode('some.png', function(pixels) {
        // pixels is a 1d array (in rgba order) of decoded pixel data
    });
    
You can also call `PNG.load` if you want to load the PNG (but not decode the pixels) synchronously.  If you already
have the PNG data in a buffer, simply use `new PNG(buffer)`.  In both of these cases, you need to call `png.decode`
yourself which passes your callback the decoded pixels as a buffer.  If you already have a buffer you want the pixels
copied to, call `copyToImageData` with your buffer and the decoded pixels as returned from `decodePixels`.
