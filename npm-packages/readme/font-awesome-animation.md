# font-awesome-animation 

> Simple animations using some CSS3 I found on the web.
> Best used on glyphicons like [FontAwesome][]

![build](https://github.com/l-lin/font-awesome-animation/workflows/build/badge.svg)
[![npm](https://img.shields.io/npm/v/font-awesome-animation.svg)][npm-link]
[![npm](https://img.shields.io/npm/dm/font-awesome-animation.svg)][npm-link]
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/font-awesome-animation/badge?style=rounded)][cdn-link]

## Getting started

Install from NPM:

```bash
npm install font-awesome-animation
```

Or with a CDN:

[https://www.jsdelivr.com/package/npm/font-awesome-animation][cdn-link]

Include CSS file in your index.html file:

```html
<link rel="stylesheet" href="font-awesome-animation.min.css">
```

## Usage
### On DOM load

Add the desired CSS class `faa-xxx` along with `animated` to the icon (or any element of your DOM):

```html
<i class="fa fa-wrench faa-wrench animated"></i>
```

<i class="fa fa-wrench faa-wrench animated" style="font-size: 3em;"></i>

### On hover

Instead of using `animated`, use the `animated-hover` CSS class:

```html
<i class="fa fa-wrench faa-wrench animated-hover"></i>
```

<i class="fa fa-wrench faa-wrench animated-hover" style="font-size: 3em;"></i>

### On parent element hover

For parent hover, add the CSS class `faa-parent` and `animated-hover` on the parent element:

```html
<a href="#" class="faa-parent animated-hover">
  <i class="fa fa-wrench faa-wrench" style="font-size: 3em;"></i>&nbsp;hover mouse here
</a>
```

<a href="#" class="faa-parent animated-hover">
<i class="fa fa-wrench faa-wrench" style="font-size: 3em;"></i>&nbsp;hover mouse here
</a>

### Animation speed

You can regulate the speed of the animation by adding the CSS class `faa-fast` or `faa-slow`:

```html
<i class="fa fa-wrench faa-wrench animated faa-fast"></i>
<i class="fa fa-wrench faa-wrench animated faa-slow"></i>
```

<i class="fa fa-wrench faa-wrench animated faa-fast" style="font-size: 3em;"></i>&nbsp;fast&nbsp;
<i class="fa fa-wrench faa-wrench animated faa-slow" style="font-size: 3em;"></i>&nbsp;slow

## Animation list

Check the [Github page](https://l-lin.github.io/font-awesome-animation/#animation-list) to view the
previews.

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome-animation@1.1.1/css/font-awesome-animation.min.css">
<!--link rel="stylesheet" href="http://localhost:8080/css/font-awesome-animation.css"-->

| Animation | Preview | Fast | Slow |
|-----------|---------|------|------|
|`faa-wrench`|<i class="fa fa-wrench faa-wrench animated" style="font-size: 2em"></i>|<i class="fa fa-wrench faa-wrench animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-wrench faa-wrench animated faa-slow" style="font-size: 2em"></i>|
|`faa-ring`|<i class="fa fa-bell faa-ring animated" style="font-size: 2em"></i>|<i class="fa fa-bell faa-ring animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-bell faa-ring animated faa-slow" style="font-size: 2em"></i>|
|`faa-horizontal`|<i class="fa fa-envelope faa-horizontal animated" style="font-size:2em"></i>|<i class="fa fa-envelope faa-horizontal animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-envelope faa-horizontal animated faa-slow" style="font-size: 2em"></i>|
|`faa-horizontal faa-reverse`|<i class="fa fa-envelope faa-horizontal animated faa-reverse" style="font-size: 2em"></i>|<i class="fa fa-envelope faa-horizontal animated faa-reverse faa-fast" style="font-size: 2em"></i>|<i class="fa fa-envelope faa-horizontal animated faa-reverse faa-slow" style="font-size: 2em"></i>|
|`faa-vertical`|<i class="fa fa-thumbs-o-up faa-vertical animated" style="font-size: 2em"></i>|<i class="fa fa-thumbs-o-up faa-vertical animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-thumbs-o-up faa-vertical animated faa-slow" style="font-size: 2em"></i>|
|`faa-flash`|<i class="fa fa-warning faa-flash animated" style="font-size: 2em"></i>|<i class="fa fa-warning faa-flash animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-warning faa-flash animated faa-slow" style="font-size: 2em"></i>|
|`faa-bounce`|<i class="fa fa-thumbs-o-up faa-bounce animated" style="font-size: 2em"></i>|<i class="fa fa-thumbs-o-up faa-bounce animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-thumbs-o-up faa-bounce animated faa-slow" style="font-size: 2em"></i>|
|`faa-bounce faa-reverse`|<i class="fa fa-thumbs-o-down faa-bounce faa-reverse animated" style="font-size: 2em"></i>|<i class="fa fa-thumbs-o-down faa-bounce faa-reverse animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-thumbs-o-down faa-bounce faa-reverse animated faa-slow" style="font-size: 2em"></i>|
|`faa-spin`|<i class="fa fa-spinner faa-spin animated" style="font-size: 2em"></i>|<i class="fa fa-spinner faa-spin animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-spinner faa-spin animated faa-slow" style="font-size: 2em"></i>|
|`faa-spin faa-reverse`|<i class="fa fa-spinner faa-spin faa-reverse animated" style="font-size: 2em"></i>|<i class="fa fa-spinner faa-spin faa-reverse animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-spinner faa-spin faa-reverse animated faa-slow" style="font-size: 2em"></i>|
|`faa-float`|<i class="fa fa-plane faa-float animated" style="font-size: 2em"></i>|<i class="fa fa-plane faa-float animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-plane faa-float animated faa-slow" style="font-size: 2em"></i>|
|`faa-pulse`|<i class="fa fa-heart faa-pulse animated" style="font-size: 2em"></i>|<i class="fa fa-heart faa-pulse animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-heart faa-pulse animated faa-slow" style="font-size: 2em"></i>|
|`faa-shake`|<i class="fa fa-envelope faa-shake animated" style="font-size: 2em"></i>|<i class="fa fa-envelope faa-shake animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-envelope faa-shake animated faa-slow" style="font-size: 2em"></i>|
|`faa-tada`|<i class="fa fa-trophy faa-tada animated" style="font-size: 2em"></i>|<i class="fa fa-trophy faa-tada animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-trophy faa-tada animated faa-slow" style="font-size: 2em"></i>|
|`faa-passing`|<i class="fa fa-space-shuttle faa-passing animated" style="font-size: 2em"></i>|<i class="fa fa-space-shuttle faa-passing animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-space-shuttle faa-passing animated faa-slow" style="font-size: 2em"></i>|
|`faa-passing faa-reverse`|<i class="fa fa-space-shuttle faa-passing faa-reverse animated" style="font-size: 2em"></i>|<i class="fa fa-space-shuttle faa-passing faa-reverse animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-space-shuttle faa-passing faa-reverse animated faa-slow" style="font-size: 2em"></i>|
|`faa-burst`|<i class="fa fa-circle-o faa-burst animated" style="font-size: 2em"></i>|<i class="fa fa-circle-o faa-burst animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-circle-o faa-burst animated faa-slow" style="font-size: 2em"></i>|
|`faa-falling`|<i class="fa fa-star-o faa-falling animated" style="font-size: 2em"></i>|<i class="fa fa-star-o faa-falling animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-star-o faa-falling animated faa-slow" style="font-size: 2em"></i>|
|`faa-falling faa-reverse`|<i class="fa fa-star-o faa-falling faa-reverse animated" style="font-size: 2em"></i>|<i class="fa fa-star-o faa-falling faa-reverse animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-star-o faa-falling faa-reverse animated faa-slow" style="font-size: 2em"></i>|
|`faa-rising`|<i class="fa fa-star-o faa-rising animated" style="font-size: 2em"></i>|<i class="fa fa-star-o faa-rising animated faa-fast" style="font-size: 2em"></i>|<i class="fa fa-star-o faa-rising animated faa-slow" style="font-size: 2em"></i>|

## Development
### Build

```bash
# install dependencies
npm install

# generate prefixes and minified CSS files
npm run build
```

### Local preview

To test in local, you can use:

- [http-server][]: server local http server to the `css/` folder
- any markdown preview to serve this README.md as a webpage (e.g. [markdown-preview.nvim][])

### Release

```sh
# this will create a new version and push to remote repository
npm version [<newversion> | major | minor | patch]
```

Then go to the [release page](https://github.com/l-lin/font-awesome-animation/releases) and manually
create a new release. There is an automatic [Github action](./.github/workflows/publish.yml) that
publishes automatically to NPM repository.

## License

[MIT License](LICENSE)

[cdn-link]: https://www.jsdelivr.com/package/npm/font-awesome-animation
[FontAwesome]: https://fontawesome.com/
[http-server]: https://www.npmjs.com/package/http-server
[markdown-preview.nvim]: https://github.com/iamcco/markdown-preview.nvim
[npm-link]: https://www.npmjs.com/package/font-awesome-animation

