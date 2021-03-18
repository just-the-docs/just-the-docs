# frozen_string_literal: true

module Sinatra
  module Auth
    module Github
      module Helpers
        # Like the native github_team_authenticate! but accepts an array of team ids
        def github_teams_authenticate!(teams)
          authenticate!
          halt([401, "Unauthorized User"]) unless teams.any? { |team_id| github_team_access?(team_id) }
        end
      end
    end
  end
end
