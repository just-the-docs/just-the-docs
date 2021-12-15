`Crazymail` is a simple SMTP mail server designed to aide automated testing of web applications. It receives email all incoming mail on port 25 and makes it available to a client over HTTP.

# Example

### Server setup
``` sh
# On publicly facing server example.com
npm install -g crazymail

# sudo is needed to listen on port 25
sudo crazymail server --host example.com
```

### Your test
``` javascript
var Crazymail = require('crazymail')

// Assuming there is a Crazymail server at 'example.com'
var Crazyclient = new Crazymail.Client( {
  host: 'example.com'
})

var person = Crazyclient.random.person()
// person will be look something like this:
{
  firstName: 'Hans',
  lastName: 'Flounder',
  name: 'Hans Flounder',
  address: 'hans_flounder_678@example.com',
  host: 'example.com'
}

// Now perform your automated tests.
// You can use the random funny names to fill out your forms.
your_automated_test( person )

// Receive email sent to `person`
// You need not worry about the timing of this call.
// The server will cache the message for a reasonable
// amount of time and keep the connection open
// if it hasn't arrived yet.
Crazyclient.receive( person )
  .then( function ( message ) {
    console.log( 'You got mail!', message )
  })
  .catch( function ( err ) {
    console.log( 'Something went wrong.')
  })
```
