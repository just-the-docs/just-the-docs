# frozen_string_literal: true

# Summarize the axe rspec failures into aggregate counts
# TODO: This should be an RSpec formatter

require 'json'

RESULTS_PATH = File.join(File.dirname(__FILE__), '..', '..', 'tmp/rspec_output.json')
AXE_CASE_TITLE = /\n\s*\n\s*\d+\)\s+([-\w]+):/

def failing_specs(results_data)
  results_data['examples'].filter do |ex|
    ex['status'] == 'failed'
  end
end

def summarize_results(results)
  failing_specs(results).map do |ex|
    ex['exception']['message'].scan(AXE_CASE_TITLE)
  end.flatten.tally
end

# rubocop:disable Metrics/AbcSize
# rubocop:disable Metrics/MethodLength
def group_results(results)
  all_cases_list = failing_specs(results).map do |ex|
    msg = ex['exception']['message']
    msg.gsub!(/\nInvocation:.*;/, '')
    cases = msg.split(AXE_CASE_TITLE)
    cases.delete_at(0)
    Hash[*cases].transform_values { |v| { page: ex['full_description'], message: v } }
  end
  results = {}
  results.default = []
  all_cases_list.each do |test_hash|
    test_hash.each do |axe_name, failure|
      if results.key?(axe_name)
        results[axe_name] << failure
      else
        results[axe_name] = [failure]
      end
    end
  end
  results
end
# rubocop:enable Metrics/AbcSize
# rubocop:enable Metrics/MethodLength

def test_failures_with_pages(summary_group)
  summary_group.transform_values { |list| list.map { |h| h[:page] } }
end

def nicely_print(hash)
  hash.each do |key, values|
    puts "#{key}:"
    values.each { |item| puts("\t#{item}") }
  end
end

def print_summary
  results_data = JSON.parse(File.read(RESULTS_PATH))
  failing_tests_by_type = summarize_results(results_data)
  total_failures = failing_tests_by_type.values.sum
  puts "#{total_failures} total a11y failures."
  return if total_failures == 0

  pp(failing_tests_by_type)
  puts "Failing Pages:\n#{'-' * 16}"
  summary_group = group_results(results_data)
  nicely_print(test_failures_with_pages(summary_group))
end

print_summary
