
# react-icons-kit

Note: Please visit https://reactsvgicons.com/
has svg icons directly as react components can you can import to your project without
to need to use a library

Releases:

v2.0.0

- [@kamikazebr](https://github.com/kamikazebr) export withBaseIcon - PR [#75](https://github.com/wmira/react-icons-kit/pull/75)
- [@lyleunderwood](https://github.com/lyleunderwood) Don't discard fill=none - PR [#73](https://github.com/wmira/react-icons-kit/pull/73)
- [@lyleunderwood](https://github.com/lyleunderwood) Update Material Design Icons to 4.0.0 - PR [#60](https://github.com/wmira/react-icons-kit/pull/60)
- [@vahissan](https://github.com/vahissan) Allow IconProp type definition to allow all HTML attributes.  PR[#58](https://github.com/wmira/react-icons-kit/pull/58)
- [@gottschalkironhack](https://github.com/gottschalkironhack) - Same material v4 update

1.3.0

- `[Merged PR #42 by @nbcnc`](https://github.com/wmira/react-icons-kit/pull/42)


[![Project Supported By ReactForBeginners.com](https://img.shields.io/badge/%F0%9F%91%8D_Project_Supported_By-ReactForBeginners.com%20Tutorials-brightgreen.svg?style=flat-square)](https://ReactForBeginners.com/friend/REACTICONS)

[![Project Supported By AdvancedReact.com](https://img.shields.io/badge/%F0%9F%91%8D_Project_Supported_By-AdvancedReact.com%20Tutorials-brightgreen.svg?style=flat-square)](https://AdvancedReact.com/friend/REACTICONS)

## Installation

```
npm install --save react-icons-kit
```

## Documentation / Demo

Please visit:
[Vercel react-icons-kit](https://react-icons-kit.vercel.app/)
[Surge react-icons-kit](https://react-icons-kit.surge.sh/)

## Bundled Icon Sets

* [`IcoMoon`](https://github.com/Keyamoon/IcoMoon-Free) vmaster
* [`FontAwesome`](http://fortawesome.github.io/Font-Awesome/icons/) v4.7
* [`MaterialIcons`](https://www.google.com/design/icons/) v4.x
* [`Open Iconic`](https://github.com/iconic/open-iconic) v1.1.1
* [`Entypo`](http://entypo.com) latest
* [`Ikons`](http://ikons.piotrkwiatkowski.co.uk/) latest
* [`Metrize`](http://www.alessioatzeni.com/metrize-icons/) latest
* [`Octicons`](https://octicons.github.com/) v5.0.1
* [`Ionicons`](http://ionicons.com/) v2.0.1
* [`Linea`](http://linea.io/) latest
* [`Typicons`](http://typicons.com/) v2.0.8
* [`Noto Emoji Regular`](https://www.google.com/get/noto/#emoji-zsye/) latest
* [`Feather Icons`](https://feathericons.com/)latest

Plus more to come.

## Browse Icon Sets

Browse all available icons here: 

[Vercel react-icons-kit](https://react-icons-kit-wmira.vercel.app/)
[Surge react-icons-kit](https://react-icons-kit.surge.sh/)


## Quick Start Guide

```javascript

    import Icon from 'react-icons-kit';
    import { ic_add_a_photo } from 'react-icons-kit/md/ic_add_a_photo';
    import { lock } from 'react-icons-kit/fa/lock';

    export const ShowIcons = () => {

        return (
            <div>
                <div><Icon icon={ic_add_a_photo}/><div>
                <div><Icon icon={lock}/><div>
            </div>
        )
    }
```

## Tree Shaking

Use the eslint config from this: https://github.com/wmira/react-icons-kit/issues/38

## Development

### React Icons Kit Site

To update the react-icons-kit site deployed at [react-icons-kit](https://react-icons-kit-wmira.vercel.app/), You would need to clone
https://github.com/wmira/react-icons-kit-site

1. Run npm run dist on react-icons-kit
2. Go to react-icons-kit-site and do npm install
3. cd node_modules
4. ln -sf /path/to/react-icons-kit/dist react-icons-kit
5. npm start

You should now be able to live edit the website to do some changes, submit pull request.

## Contributors

react-icons-kit is brought to you by the following contributors:

<a href="https://github.com/wmira/react-icons-kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=wmira/react-icons-kit" />
</a>
