# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "just-the-docs"
  spec.version       = "0.1.0"
  spec.authors       = ["Patrick Marsceill"]
  spec.email         = ["patrick.marsceill@gmail.com"]

  spec.summary       = %q{A Jekyll theme for documentation}
  spec.homepage      = "https://github.com/pmarsceill/just-the-docs"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README|search-data)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.3"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
