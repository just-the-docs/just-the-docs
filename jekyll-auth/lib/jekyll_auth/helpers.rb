# frozen_string_literal: true

class JekyllAuth
  module Helpers
    def whitelisted?
      return true if request.path_info == "/logout"
      !!(JekyllAuth.whitelist && JekyllAuth.whitelist.match(request.path_info))
    end

    def authentication_strategy
      if !ENV["GITHUB_TEAM_ID"].to_s.blank?
        :team
      elsif !ENV["GITHUB_TEAM_IDS"].to_s.blank?
        :teams
      elsif !ENV["GITHUB_ORG_NAME"].to_s.blank?
        :org
      end
    end
  end
end
