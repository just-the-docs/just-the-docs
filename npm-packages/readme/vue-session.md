To install the plugin, do the following:

```javascript
import VueSession from 'vue-session'
Vue.use(VueSession)
```

Now you can use it in your components with the `$session` property.

## Options

VueSession can be started with some options that will change its behavior.

- `persist` A Boolean value to determine whether the data stored in the session may persist between tabs and browser instances. Defaults to `false`.

Pass the options in the `use` method:

```javascript
var options = {
    persist: true
}

Vue.use(VueSession, options)
```

## Reference

- `this.$session.getAll()`, returns all data stored in the Session.
- `this.$session.set(key,value)`, sets a single value to the Session.
- `this.$session.get(key)`, returns the value attributed to the given key.
- `this.$session.start()`, initializes a session with a 'session-id'. If you attempt to save a value without having started a new session, the plugin will automatically start a new session.
- `this.$session.exists()`, checks whether a session has been initialized or not.
- `this.$session.has(key)`, checks whether the key exists in the Session
- `this.$session.remove(key)`, removes the given key from the Session
- `this.$session.clear()`, clear all keys in the Session, except for 'session-id', keeping the Session alive
- `this.$session.destroy()`, destroys the Session
- `this.$session.id()`, returns the 'session-id'
- `this.$session.renew(session_id)`, allows a user to renew a previous session by manually inputting the session_id

### Flash

Flash allows you to save data until you read them without having to start a regular Session.

- `this.$session.flash.set(key, value)`, sets a flash value
- `this.$session.flash.get(key)`, reads and removes a flash value
- `this.$session.flash.remove(key)`, removes a flash value


## Example

Your login method could look like this:

```javascript
export default {
    name: 'login',
    methods: {
        login: function () {
          this.$http.post('http://somehost/user/login', {
            password: this.password,
            email: this.email
          }).then(function (response) {
            if (response.status === 200 && 'token' in response.body) {
              this.$session.start()
              this.$session.set('jwt', response.body.token)
              Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
              this.$router.push('/panel/search')
            }
          }, function (err) {
            console.log('err', err)
          })
        }
    }
}
```

In your logged-in area, you can check whether or not a session is started and destroy it when the user wants to logout:

```javascript
export default {
  name: 'panel',
  data () {
    return { }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$router.push('/')
    }
  }
}
```
