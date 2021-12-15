# hyper-drop-file

The hyper plugin to let you drop file path into your terminal

## Installation

```bash
hyper install hyper-drop-file
```
For the first time use, _YOU NEED TO RESTART_ your hyper terminal.

![preview](https://raw.githubusercontent.com/qweasd1/hyper-drop-file/master/hyper_drop_file.gif)


## Customization

### Customize the path rewrite logic
On different platform (windows, mac and linux) the path when dropped will be consistent to the platform.
However, on windows, someone want to linux shell and don't want the path to be windows style path. You can
customize this by add hyperDropFile configuration to ```.hyper.js```
Here is one sample:
```javascript
module.exports = {
  config: {
    ...
    // add this and change the logic inside pathRewriter function. The return string will be the rewrite path 
    hyperDropFile:{
      pathRewriter:(path,hyperConfig)=>{
         return path + "$"
      }
    }
    
  },

  ...
};

```

The first parameter ```path``` is the original path of dropped file and the second parameter ```hyperConfig``` is hyper config object from ```hyper.js``` (value return by calling ```config.getConfig()```).
This can give you more context information you can customize. For instance, you can use ```hyperConfig.shell``` to read what shell is currently running inside hyper terminal and change the path rewrite logic.



The default path rewrite logic of this plugin is to escape whitespace when drop the filepath. If you define you 
own ```pathRewriter()``` it will *OVERRIDE* the default rewrite to escape whitespace, so do add this logic to your own pathRewriter.





   
