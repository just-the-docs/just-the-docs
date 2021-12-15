# Unity Unpacker

Highly experimental Unity unpacker in Node.js.

This is not an universal unity unpacker, but only targeting Unity 5.1.2f. I may eventually add supporting code for other versions, but for now it only supports 5.1.2f version.

Work in progress.

## Installation

```
$ npm install unity-unpacker -g
$ # or
$ yarn global add unity-unpacker
```

## Usage

```
Usage: unity-unpacker [options] <.unity3d or .unity3d.lz4>

Options:
  --output-dir, -o  Unpacked files' destination directory
                    If not specified, new directory will be created on current
                    working directory, and set to the directory
  --dry-run, -D     Files won't be really extracted, but just parsed and
                    informations will be printed      [boolean] [default: false]
  --verbose, -v     Detailed information about assets will be printed
                                                      [boolean] [default: false]
  --image           Textures' output format
                                        [choices: "jpg", "png"] [default: "png"]
  --help            Show help                                          [boolean]
```

## Reference

* https://github.com/HearthSim/UnityPack (MIT License)
* https://github.com/RaduMC/UnityStudio (MIT License)
* https://www.khronos.org/registry/gles/extensions/OES/OES_compressed_ETC1_RGB8_texture.txt

## Thanks to

* @marcan - Fixed ETC1 unpacker
