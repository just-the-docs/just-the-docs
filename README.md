# Hosted Site
https://src-handbook-infrastructure-team.github.io/srch/docs/artificial-intelligence/fairness-justice/

# Just the Docs documentation

[View the documentation](https://just-the-docs.com/) for usage information.


# Run the site locally

1. Clone the repo
2. Run `bundle install` from the root directory in your IDE.
3. Run `bundle exec jekyll serve --baseurl "/srch" --port 4001` and open your browser at `http://127.0.0.1:4001/srch/`. This starts a Jekyll server so you can test any changes locally before pushing, your site will regenerate and you should see the changes in the browser after a refresh.

# Important folders for editing content
## docs
In the docs folder, you'll find the markdown files of each page in the handbook. Within each markdown file, you can configure the order in which each page shows up in the left nav.
To add a new page to the site, simply add a markdown file. After adding a page, if you are running this project locally, make sure to run `jekyll build` so that it turns the markdown into html. 

## Side Panels
Side panels can be added by creating a folder for the main page and then putting the side panels inside as a markdown file.
For example, within a page's folder, if you have a markdown called 'example', you can simply use this command to open up the side panel.
```
[Side Panel](javascript:openPanel('example'))
```
You can also link to a particular side panel with its URL. For example, you can link to a harms side panel in the Fairness and justice page using this link:
```
[Link to Harms Panel](/srch/docs/artificial-intelligence/fairness-justice/?panel=harms-panel/)
```
where `harms-panel` is the name of the side panel we are going to. This will take you to exactly the fairness and justice page with the side panel open.
<img width="1469" alt="Screenshot 2024-11-05 at 3 00 17 AM" src="https://github.com/user-attachments/assets/1063d026-78e3-49d7-816e-7253a480af6d">

## Appendices
Each learning objective should have an appendix containing all the links in the body of the text and the sidepanels.

**After adding or removing links, or adding a new learning objective, you should regenerate the appendix file** by adding the filepath to the list at the bottom of assets/js/generate-appendix.js and running the script.

To run the script, run the following command.
```
node /workspaces/srch/assets/js/generate-appendix.js
```

You can generate one appendix for multiple files if desired. For example, if the learning objective has sub-pages.

Note that the appendix files are overwritten every time the command is run. To make custom edits to specific appendicies, you need to modify the script.

To caregorize links, add a tag comment of the form `<!-- tag:tagName -->` after the link. For example:
```
[United States Federal AI Use Case Inventory](https://ai.gov/ai-use-cases/){:target="_blank"}<!-- tag:database -->
```
Currently supported tags are `tag:database`, `tag:definition`, and `tag:case-study`. Modifying `generate-appendix.js` to add tag categories should be straighforward.

Untagges links appear under the "Uncategorized Links" heading.

## default.html
This defines the basic structure of the site. This was what I tweaked to adjust the navigation sidebar and tweak the structure to include a side panel.

## layout.scss
This file contains the css of many important components like the nav-side-bar (navigation bar), side-panel (the popup side panels we can toggle) and various other layout-related css elements.
