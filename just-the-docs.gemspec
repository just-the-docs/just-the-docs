# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "just-the-docs"
  spec.version       = "0.4.0.rc3"
  spec.authors       = ["Patrick Marsceill", "Matthew Wang"]
  spec.email         = ["patrick.marsceill@gmail.com", "matt@matthewwang.me"]

  spec.summary       = %q{A modern, highly customizable, and responsive Jekyll theme for documention with built-in search.}
  spec.homepage      = "https://github.com/just-the-docs/just-the-docs"
  spec.license       = "MIT"
  spec.metadata      = {
    "bug_tracker_uri"   => "https://github.com/just-the-docs/just-the-docs/issues",
    "changelog_uri"     => "https://github.com/just-the-docs/just-the-docs/blob/main/CHANGELOG.md",
    "documentation_uri" => "https://just-the-docs.github.io/just-the-docs/",
    "source_code_uri"   => "https://github.com/just-the-docs/just-the-docs",
  }

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|bin|_layouts|_includes|lib|Rakefile|_sass|LICENSE|README|CHANGELOG|favicon)}i) }
  spec.executables   << 'just-the-docs'

  spec.add_development_dependency "bundler", "~> 2.3.5"
  spec.add_runtime_dependency "jekyll", ">= 3.8.5"
  spec.add_runtime_dependency "jekyll-seo-tag", ">= 2.0"
  spec.add_runtime_dependency "rake", ">= 12.3.1"
end
