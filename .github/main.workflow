workflow "Publish to RubyGems" {
  on = "release"
  resolves = [
    "Publish to GPR",
    "Publish to Ruby Gems",
  ]
}

action "Build from Gemspec" {
  uses = "scarhand/actions-ruby@master"
  runs = "gem build just-the-docs.gemspec"
}

action "Publish to Ruby Gems" {
  uses = "scarhand/actions-ruby@master"
  needs = ["Build from Gemspec"]
  runs = "gem push *.gem"
  secrets = ["RUBYGEMS_AUTH_TOKEN"]
}

action "Publish to GPR" {
  uses = "scarhand/actions-ruby@master"
  needs = ["Build from Gemspec"]
  secrets = ["GPR_AUTH_TOKEN"]
  runs = " gem push --key [\"GPR_AUTH_TOKEN\"] --host https://rubygems.pkg.github.com/pmarsceill *.gem"
}
