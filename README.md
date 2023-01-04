Inspirado em: https://just-the-docs.github.io/just-the-docs/

Instalação de pacotes:

    sudo apt-get install libxml2-dev libxslt-dev build-essential libxml2 libxml2-dev libxslt1-dev ruby-dev ruby-bundler nodejs
    sudo gem install bundler

Subindo ambiente dev:

    bundle config set --local path 'vendor/bundle'
    bundle install
    bundle exec jekyll serve

