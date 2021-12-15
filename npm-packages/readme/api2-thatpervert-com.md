# thatpervert.com API
A API wrapper that reads the HTML of the site and extracts info

This library supports fetching:
- Posts, 
- List of Posts

# Install
``` npm install --save api2-thatpervert-com ```

# API
```
const ThatpervertAPI = require('api2-thatpervert-com') 
const api = new ThatpervertAPI();
api.post.id(297045).then((post)=> console.log(JSON.stringify(post, null, 2)));
```
