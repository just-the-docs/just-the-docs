## Troubleshooting

### `ERROR: YOUR SITE COULD NOT BE BUILT` During install, either locally or on Heroku.

You likely need to add `exclude: [vendor]` to `_config.yml` in your branch's root directory (create the file if it does not exist already). If you still have problems on the *local* install, you may have better luck using `bundle install --deployment`, but be sure to add the resulting 'vendor' directory to .gitignore. For completeness, the full error may look something like this:


```
remote:        Configuration file: none
remote:                     ERROR: YOUR SITE COULD NOT BE BUILT:
remote:                            ------------------------------------
remote:                            Invalid date '0000-00-00': Post '/vendor/bundle/ruby/2.0.0/gems/jekyll-2.5.3/lib/site_template/_posts/0000-00-00-welcome-to-jekyll.markdown.erb' does not have a valid date in the filename.
```

### Pushing to heroku

If you are working from a new GitHub-cloned repo (where you have not run `heroku create`), you may also want to push to Heroku. Instead of adding the remote in the standard way with Git, do this:


```
heroku git:remote -a my-site
```

### Upgrading from Jekyll Auth &lt; 0.1.0

1. `cd` to your project directory
2. `rm config.ru`
3. `rm Procfile`
4. Remove any Jekyll Auth specific requirements from your `Gemfile`
5. Follow [the instructions above](https://github.com/benbalter/jekyll-auth#add-jekyll-auth-to-your-site) to get started
6. When prompted, select "n" if Heroku is already set up
