## Running locally

Want to run it locally?

### Without authentication

Just run `jekyll serve` as you would normally.

### With authentication

1. `export GITHUB_CLIENT_ID=[your github app client id]`
2. `export GITHUB_CLIENT_SECRET=[your github app client secret]`
3. `export GITHUB_ORG_NAME=[org name]` or `export GITHUB_TEAM_ID=[team id]` or `export GITHUB_TEAM_IDS=1234,5678`
4. `jekyll-auth serve`

*Pro-tip #1:* For sanity's sake, and to avoid problems with your callback URL, you may want to have two apps, one with a local Oauth callback, and one for production if you're going to be testing auth locally.

*Pro-tip #2*: Jekyll Auth supports [dotenv](https://github.com/bkeepers/dotenv) out of the box. You can create a `.env` file in the root of site and add your configuration variables there. It's ignored by `.gitignore` if you use `jekyll-auth new`, but be sure not to accidentally commit your `.env` file. Here's what your `.env` file might look like:

```
GITHUB_CLIENT_SECRET=abcdefghijklmnopqrstuvwxyz0123456789
GITHUB_CLIENT_ID=qwertyuiop0001
GITHUB_TEAM_ID=12345
```
