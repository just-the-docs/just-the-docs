workflow "Publish to RubyGems" {
  on = "release"
  resolves = ["scarhand/actions-ruby@master"]
}

action "Build from Gemspec" {
  uses = "scarhand/actions-ruby@master"
  runs = "build *.gemspec"
}

action "scarhand/actions-ruby@master" {
  uses = "scarhand/actions-ruby@master"
  needs = ["Build from Gemspec"]
  runs = "push *.gem"
  secrets = ["RUBYGEMS_AUTH_TOKEN"]
}
