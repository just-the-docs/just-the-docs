### Sencha Ext.Direct connector for node.js

Important: Version 2.0.0 and up is not compatible with previous 1.x branch

#### Compatibility:
* Sencha Touch 2.3+
* Ext JS 4.2.x+
* Ext JS 5+
* Ext JS 6.5+

#### Example code
Sample applications for Touch and Ext JS can be found here: https://github.com/jurisv/extdirect.examples

Official Sencha example (using Ext JS 6.5) can be found here: https://github.com/sencha-extjs-examples/Coworkee

Ext JS:

    * Application structure with API provider
    * Grid CRUD Master-detail
    * Cookie / Session
    * Direct method call, shows regular call and onw that has hard exception (syntax error)
    * Form Load / Submit
    * Form file upload (Cross domain upload is not supported!)
    * Tree root / child dynamic load
    * Metadata (Starting from Ext JS 5)
    * Namespaces (From 4.2)

Sencha Touch:

    * Application structure with API provider
    * List read using directFn
    * Form load / submit

#### Usage

For usage please refer to Examples.

Configuration description:

```
{
    "ES6": false, // Support method discovery without `function` keyword.  
    "rootNamespace": "Server", // Namespace in which server will be accessible from client side
    "apiName": "API", // API name
    "apiUrl": "/directapi", // URL to retrieve API configuration
    "classRouteUrl": "/direct", // URL to call Direct methods
    "classPath": "/direct", // Direct class location in filesystem relative to the server directory
    "server": "localhost", // Hosting server name
    "port": "3000", // Hosting server port
    "protocol": "http", // http | https
    "timeout": 30000, // Operation timeout
    "cacheAPI": false, // Set true to cache API's for production. During development setting to false will allow to make any changes and access API's without server reload.
    "relativeUrl": false, // Use relative URL's
    "appendRequestResponseObjects": true, // If true, will append req and res objects to method call
    "enableMetadata": true, // Metadata support
    "responseHelper": true, // Automatically append success true|false
    "enableProcessors": true //Enable Helpers to have methods before and after API discovery as well as before and after Transaction batch
}
```



### Changelog:
* 2.0.5 (10 jul 2017)
     * Add link to Sencha official example. No changes in API.
* 2.0.4 (14 may 2017)
     * Support method discovery without function keyword. Implement #35
     
* 2.0.3 (14 may 2017)
     * Wrong url is computed at request `/directapi` Fix #36
     
* 2.0.2 (23 feb 2017)
     * Fix deeply nested api discovery
   
* 2.0.1 (3 jun 2015)

    * Allow callback to return boolean "false" value. (@cpmoser)
    
* 2.0.0 (14 may 2015)

    * Comment source code and use descriptive variable names #21
    * Implement namespaced Classes to have nested actions #29 See below
    * Add namespace support (nested Actions) You can now organize files using folders
    * More streamlined definition for metadata and formHandler  (//@meta and //@formHandler )
    * Exclude non .js files from API discovery
    * Separate route paths for classes (classRouteUrl and classPath)
    * Use latest Express framework in examples, closes #28
    * New property 'cacheAPI' allows to bypass node module caching, which gives the option to work on class files without reloading the server
    * Callback format changed to be in line with node.js standards callback(err, result); closes #30
    * New property 'responseHelper'. It will add success: true/false to result payload if:
        * We set success to true if responseHelper is TRUE and callback is called without any arguments or with true as result or result object is present, but success is missing
        * We set success to false if autoResponse is TRUE and callback is called with result set to false
    * Place Processor files or any othere relevant scriots in .scripts folder. It will be ignored during API discovery
    * API Processor. Two methods beforeApi and afterApi to hook in to API discovery flow. See Examples for ExtJS
    * Router Processor. Two methods beforeTransaction and afterTransaction. See Examples for ExtJS. Use them to open and close db connection.
    * Add support for metadata #27
