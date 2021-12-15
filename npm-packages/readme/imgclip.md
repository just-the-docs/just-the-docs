# imgclip  [![npm](https://img.shields.io/badge/npm-v1.2.0-blue.svg)](https://www.npmjs.com/package/imgclip)

Command line utility that extracts text from an image into the system clipboard. Uses the [tesseract.js](https://github.com/naptha/tesseract.js) OCR wrapper

[![asciicast](https://asciinema.org/a/1n7wfprarthnh9htkavu3trkl.png)](https://asciinema.org/a/1n7wfprarthnh9htkavu3trkl)

### Installation

    npm install -g imgclip

### Notes
- Only compatible with Node v6.8.0+
- Downloads a `lang`.traineddata file needed to perform the image recognition into the current working directory. (use the `--clean-up` flag to remove it after execution)

### Usage

    Usage: imgclip PATH [options]
    
    Options:
    
    -h, --help             output usage information
    -V, --version          output the version number
    -l, --lang [language]  language of the text in the image.
    -c, --clean-up         removes the generated language data file (.traineddata) after the image recognition job has finished
    -p, --print            prints out the text in the image.
    
Full language list can be found [here](https://github.com/naptha/tesseract.js/blob/master/docs/tesseract_lang_list.md)
