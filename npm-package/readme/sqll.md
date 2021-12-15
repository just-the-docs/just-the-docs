# sqll

sqll is a very simple Mysql library for Node.js

## Installation

Use the package manager [npm](https://www.npmjs.com/package/sqll) 

```bash
npm i sqll
```

or [yarn](https://yarnpkg.com/en/package/sqll)

```bash
yarn add sqll
```
to install sqll.

## Usage

```python
const {Model} = require('sqll')

class BaseModel extends Model {

  getDatabaseConfig() {
    return {
      host: 'localhost',
      user: 'db_user',
      password: '12345678',
      database: 'my_database',
      port: '8889'
    }
  }

}

class UserModel extends BaseModel {
  getTableName() {
    return "users"
  }
}

class OtherModel extends BaseModel {
  getTableName() {
    return "others"
  }
}

async function run() {
  try {
    const model = new UserModel()
    const [rows, fields] = await model.query("select * from users")
    console.log(rows)
  } catch (err) {
    console.log(err)
  }
}

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
