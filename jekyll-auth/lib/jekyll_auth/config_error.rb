# frozen_string_literal: true

class JekyllAuth
  class ConfigError < RuntimeError
    def message
      "Jekyll Auth is refusing to serve your site because your oauth credentials are not properly configured."
    end
  end
end
