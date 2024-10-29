# Hosted Site
https://src-handbook-infrastructure-team.github.io/srch/docs/artificial-intelligence/fairness-justice/

# Just the Docs documentation

[View the documentation][Just the Docs] for usage information.


# Run the site locally

1. Clone the repo
2. Run `bundle install` from the root directory in your IDE.
3. Run `bundle exec jekyll serve --baseurl "/srch" --port 4001` and open your browser at `http://127.0.0.1:4001/srch/`. This starts a Jekyll server so you can test any changes locally before pushing, your site will regenerate and you should see the changes in the browser after a refresh.

# Important folders for editing content
## docs
In the docs folder, you'll find the markdown files of each page in the handbook. Within each markdown file, you can configure the order in which each page shows up in the left nav.
To add a new page to the site, simply add a markdown file. After adding a page, if you are running this project locally, make sure to run `jekyll build` so that it turns the markdown into html. 

## docs/popups
Here, you can add any side panel popups needed within any page. They are formatted as markdown files.
To add a popup within a page, use the following format:
```
[Side Panel](javascript:openPanel('example'))
```
where the text in brackets are highlighted, and the text in 'example' is the name of markdown file within docs/popups:
<img width="1469" alt="Screenshot 2024-10-29 at 1 22 21 AM" src="https://github.com/user-attachments/assets/6eaaf719-5326-423c-9555-38558f2e2212">

## default.html
This defines the basic structure of the site. This was what I tweaked to adjust the navigation sidebar and tweak the structure to include a side panel.

## layout.scss
This file contains the css of many important components like the nav-side-bar (navigation bar), side-panel (the popup side panels we can toggle) and various other layout-related css elements.
