aux_links:
  "SCDS Workshops":
    - "https://scds.ca/online-learning/"

navigation: true

# Override Default SCDS Web Icon
favicon_ico: ""

remote_theme: scds/jtd-mcmaster
color_scheme: mcmaster

# Heading anchor links appear on hover over h1-h6 tags in page content
# allowing users to deep link to a particular heading on a page.
#
# Supports true (default) or false
heading_anchors: true

# Back to top link
back_to_top: true
back_to_top_text: "Back to top"

# Removed by Richie - Requires manual updating. Automatic updating alternative is done in footer_custom.html.
# Footer last edited timestamp
# last_edit_timestamp: true # show or hide edit time - page must have `last_modified_date` defined in the frontmatter
# last_edit_time_format: "%b %e %Y at %I:%M %p" # uses ruby's time format: https://ruby-doc.org/stdlib-2.7.0/libdoc/time/rdoc/Time.html

# Footer "Edit this page on GitHub" link text
gh_edit_link: true # show or hide edit this page link
gh_edit_link_text: "View this content on GitHub"
gh_edit_branch: "main" # the branch that your docs is served from
# gh_edit_source: docs # the source that your files originate from
gh_edit_view_mode: "tree" # "tree" or "edit" if you want the user to jump into the editor immediately

plugins:
  - jekyll-remote-theme
  - jekyll-seo-tag
  - jekyll-relative-links

# Google Analytics Tracking
ga_tracking_anonymize_ip: true # Use GDPR compliant Google Analytics settings (true by default)
license_url: "http://creativecommons.org/licenses/by/4.0/"
license_name: "Creative Commons Attribution 4.0 International License"
license_image_url: "https://i.creativecommons.org/l/by/4.0/88x31.png"

# Callout titles an colors
callouts_level: quiet # or loud
callouts:
  highlight:
    color: yellow
  important:
    title: Important
    color: blue
  new:
    title: New
    color: green
  note:
    title: Note
    color: purple
  warning:
    title: Warning
    color: red
