# hittp

hittp is an HTTP library specifically designed for crawling the web, but can be used a general purpose HTTP library. It has built-in caching to make testing a web scraper fast and easy to replicate. It also has per-domain queueing which means multiple requests to the same host are delayed so that the server is not overloaded by your crawler.

### See [Turbo Crawl](https://www.npmjs.com/package/turbocrawl) for a powerful web crawling library based on hittp.

## Simple GET
When you just want to fetch an entire page into memory.
```
const hittp = require("hittp")

hittp.get("newyorktimes.com").then((html) => {
  console.log(html)
})
/* OR */
async getNYTimes = () => {
  const html = await hittp.get("newyorktimes.com")
  console.log(html)
}
```

## Streaming GET
When you want to fetch a page and save it to file. 
```
const fs = require("fs") //filesystem
const hittp = require("hittp")

hittp.stream("newyorker.com/sitemap.xml").then((httpstream) => {
  const f = fs.createWriteStream("./sitemap.xml")
  httpstream.pipe(f)
})
/* OR */
async getSitemap = () => {
  const httpstream =  await hittp.stream("newyorker.com/sitemap.xml")
  const file = fs.createWriteStream("./sitemap.xml")
  httpstream.pipe(file)
}
```

## Web Crawling
hittp is especially useful when making many requests to one host. Requests will be queued and the same host will not be hit more than once every `options.delay_ms`. This ensures that the website you are crawling is not overloaded with requests.
```
const hittp = require("hittp")
const urls = /* Some long list of URLs */
const options = {
  delay_ms: 3000
}
for (let url of urls) {
  if (typeof(url) === "string") url = hittp.str2url(url)
  hittp.stream(url, options).then((httpstream) => {
    const file = fs.createWriteStream(`./${url.pathname}.html`)
    httpstream.pipe(file)
  })
}
```

Given a long list of URLs from many domains, hittp can fetch many webpages at once while still respecting each server's delay. This is a key aspect of building a web crawler and hittp takes care of it.

## str2url
When you want to convert a string into a URL object with protocol, host, path automatically added. This will return `null` if it detects an invalid URL.
```
const hittp = require("hittp")

const url = hittp.str2url("vox.com")
console.log(url.href)
// 'https://vox.com'
```

## Configuration
Default configuration can be overridden by with an `options` argument.
```
const hittp = require("hittp")
// Defaults:
const options = {
  timeout_ms: 10000,
  decoded: true,
  delay_ms: 0,
  cachePath: "./.hittp/cache"
}
hittp.get("qz.com", options).then((html) => {
  // Do something with the html
})
```
#### decoded

Setting this option to `true` will return html as a `string`. Setting this option to `false` will return html as a `Buffer`.

#### cachePath

Setting this option to `null` will disable caching.

### Don't forget to add your cache path to .gitignore! Default path is `./.hittp`