# ShotGrid Developer Documentation Theme

This is a clone of [just-the-docs](https://pmarsceill.github.io/just-the-docs) extended and tailored to
serve the documentation needs of the ShotGrid Ecosystem. For more information, see [tk-doc-generator](https://github.com/shotgunsoftware/tk-doc-generator).

----

# Just The Docs

A modern, high customizable, responsive Jekyll theme for documentation with built-in search.<br>Easily hosted on GitHub pages with few dependencies.

[See it in action](https://pmarsceill.github.io/just-the-docs)

![jtd](https://user-images.githubusercontent.com/896475/47384541-89053c80-d6d5-11e8-98dc-dba16e192de9.gif)

## Installation

Add this line to your Jekyll site's Gemfile:

```ruby
gem "just-the-docs"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: just-the-docs
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install just-the-docs

## Usage

[View the documentation](https://pmarsceill.github.io/just-the-docs/) for usage information.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/pmarsceill/just-the-docs. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

### Submitting code changes:

- Open a [Pull Request](https://github.com/pmarsceill/just-the-docs/pulls)
- Ensure all CI tests pass
- Await code review
- Bump the version number in `just-the-docs.gemspec` and `package.json` according to [semantic versioning](https://semver.org/).

### Design and development principles of this theme:

1. As few dependencies as possible
2. No build script needed
3. First class mobile experience
4. Make the content shine

## Development

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When the theme is released, only the files in `_layouts`, `_includes`, and `_sass` tracked with Git will be released.

## License

The theme is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
