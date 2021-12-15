### sfcookies

Built to give ReactJS, AngularJS, or any nativeJS Web Application access to browser cookies.
[Visit on NPM](https://www.npmjs.com/package/sfcookies)

bake_cookie(name, string) - Bake Cookie allows you to pass a name and a string value to store a cookie on the user's browser. It maps the name to the string.

read_cookie(name) - returns the value of your of your baked cookie.

delete_cookie(name) - removes the cookie from the browser history.

### usage
1) Run `npm install --save sfcookies`

2) Import these methods in es6 like so:
`import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'`
