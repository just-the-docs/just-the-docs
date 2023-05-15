# Porting/verifying old workshops from the forked just-the-docs to the new jtd-mcmaster

## Lessons [OPTIONAL]
- Move any lessons to a lessons folder.
- Verify links within markdown still work.

## 404.html
- Add 404.html to root folder. https://github.com/scds/scds-template/blob/master/404.html

## favicon.ico
- Add favicon.ico to assets/img/template. https://github.com/scds/scds-template/blob/master/assets/img/template/favicon.ico

## \_layouts/default.html
- Insert the following piece of code between these two lines (approximately line 85.) This fixes the invisible copy/paste icon bug. [View blame here](https://github.com/scds/github-pages/blame/60bc37c5c0f4329f358b02e0640be4c30cbd233b/_layouts/default.html#:~:text=%7B%25%20include%20icons/icons.html%20%25%7D)

```html
  </footer>
  </div>
  {% include icons/icons.html %}         <!-- THIS IS THE LINE TO ADD -->
  <div class="main" id="top">
    <div id="main-header" class="main-header">
```

- Include the following piece of code before the ending body and HTML tags. [View blame here](https://github.com/scds/github-pages/blame/60bc37c5c0f4329f358b02e0640be4c30cbd233b/_layouts/default.html#:~:text=%7B%25%20if%20site.mermaid,%7B%25%20endif%20%25%7D)

```html
  {% if site.mermaid %}
    {% include components/mermaid.html %}
  {% endif %}
</body>
</html>
```

## \_includes/footer_custom.html 
- Comment out existing code and include this piece of code.
    - This adds the "Last Modified" date.
```
<p style="font-size:0.75em">
    Brought to you by the <a href="https://library.mcmaster.ca">McMaster University Library</a> and the <a href="https://scds.ca">Lewis & Ruth Sherman Centre for Digital Scholarship</a>.
    <br>
    Site last modified: {{ site.time | date_to_long_string: "ordinal", "US" }}
</p>
```

## config.yml

- Change color_scheme to "mcmaster"
- Change remote_theme to scds/jtd-mcmaster
- Add the following code to the bottom of config.yml
```
# Callout titles and colors
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
    
# Web icon
favicon_ico: "/assets/img/template/favicon.ico"
```

- [OPTIONAL] Comment out last_edit_timestamp and last_edit_time_format
- [OPTIONAL] Move workshop-dependent fields to top

```
title: Workshop Name # *** Enter workshop title here 
github_repo_url: "https://scds.github.io/dmds-template/" # *** Enter workshop URL (in github pages) here
gh_edit_repository: "https://github.com/scds/dmds-template" # *** Enter the github URL for your repo
ga_tracking: "" # *** This needs to be set up in Google Analytics once you know the website URL (ask Jay to do this). Then the tracking code needs to be taken from Google Analytics and pasted here.  

subtitle: 'SCDS Do More with Digital Scholarship series' ## SCDS
#subtitle: 'A Data Analysis Support Hub Tutorial'        ## DASH

#  _____       _   _   _          _      _                            
# | ____|   __| | (_) | |_       / \    | |__     ___   __   __   ___ 
# |  _|    / _` | | | | __|     / _ \   | '_ \   / _ \  \ \ / /  / _ \
# | |___  | (_| | | | | |_     / ___ \  | |_) | | (_) |  \ V /  |  __/
# |_____|  \__,_| |_|  \__|   /_/   \_\ |_.__/   \___/    \_/    \___|
```

SCDS:
- Change subtitle to 'SCDS Do More with Digital Scholarship series'

DASH:
- Change subtitle to 'A Data Analysis Support Hub Tutorial'

