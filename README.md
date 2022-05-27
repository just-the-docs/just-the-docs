## Installation
And then execute:

    $ bundle

Or install it yourself as:

    $ gem install just-the-docs

Alternatively, you can run it inside Docker while developing your site

    $ docker-compose up

## Usage

[View the documentation](https://just-the-docs.github.io/just-the-docs/) for usage information.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/just-the-docs/just-the-docs. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

### Submitting code changes:

- Open a [Pull Request](https://github.com/just-the-docs/just-the-docs/pulls)
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

A modern [devcontainer configuration](https://code.visualstudio.com/docs/remote/containers) for VSCode is included.

This docs is set up just like a normal Jekyll site! To test your code, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`.

When the theme is released, only the files in `_layouts`, `_includes`, and `_sass` tracked with Git will be released.


