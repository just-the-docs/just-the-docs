---
layout: default
title: Create a Site
description: SCDS Do More with Digital Scholarship workshop series
nav_order: 101
---

# How to Create a Workshop Site!

If you'd like to see an example of this template being used, see <https://multipixels.github.io/github-pages-temporary/>.

Follow these steps to create a new workshop website from this template repository:

1. TOC
{:toc}

## 1. Create a new repository using this template
1. Navigate to the [SCDS template repository](https://github.com/scds/scds-template)
2. Above the file list, click `Use this template > Create New Repository`
3. Select scds as the repository owner 
4. Give the new repository a name (we try to keep it to a few words and use hyphens to delimit words--e.g. *intro-voyant*)
  - Description: Repository for workshop website: "Workshop Name"
5. Set the repository visibility to **Public**
6. Click **Create repository from template**
- Full instructions (from GitHub) [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template).

## 2. Configure GitHub Pages
1. In the new repository, go to **Settings**
2. On the left hand side, select **Pages** (it should be the last item for **Code and automation**)
3. Under **Build and deployment**, switch the **None** branch to **main**
4. Click save. The URL to your new website will be displayed. It will take the form ```https://scds.github.io/<repository_name>```, where ```<repository_name>``` is the name you created in step 4 of the previous section. 

## 3. Set up Google Analytics
1. Go to the [admin page](https://analytics.google.com/analytics/web/#/a2574088p251711101/admin) for the SCDS workshop pages
2. Click Data Streams
3. Click **Add Stream > Web**
4. Enter the GitHub Pages URL created in previous section (i.e. ```https://scds.github.io/<repository_name>```). Provide a name.

## 4. Edit the README file 
1. Enter the workshop name, workshop URL, and contributor name(s) where prompted
2. Remove the \<\< \>\>

## 5. Add necessary documents, images, and data  

{: .important-title }
> assets/docs/
>
> Add any PDFs (slides, worksheets, etc.) that you will either embed or link to in the main text

{: .new-title }
> assets/img/
>
> Add any workshop-specific image(s), including the title image and any images to be shown in the main content

{: .note-title }
> data/
>
> Add any datasets or other files that are required for the workshop.
  
## 6. Edit the config.yml file 
1. Update/verify lines above "Edit Above" text. Put text in double quotes. These include the following variables:
    - **title** - workshop title
    - **github_repo_url** - GitHub Pages URL from Section 2
        - example: <https://github.com/scds/github-pages>
    - **gh_edit_repository** - GitHub repository URL from Section 1
        - example: <https://github.com/scds/github-pages>
    - **ga_tracking** - Measurement ID from GoogleAnalytics from Section 3
2. Series specific settings
    - **DMDS** - Skip this step. <br>
    - **DASH** - Comment out the lines under DMDS (using the # symbol), and uncomment the lines under DASH (remove the # symbol)
    - **Other/Custom** - Comment out the lines under DMDS (using the # symbol), and uncomment the lines under OTHER (remove the # symbol).
        - nav_footer_logo_bottom: Replace this with your series logo link. Leaving it as "" will show no logo.
            - Go to the [assets/images](https://github.com/scds/jtd-mcmaster/tree/main/assets/images) directory in the theme and open your logo. If it isn't there, upload it there. Open the image, right click it and click "Copy image address". Use this address. It should look like this: <https://raw.githubusercontent.com/scds/jtd-mcmaster/main/assets/images/scds-logo.png>
        - nav_footer_logo_bottom_href: If your series has a dedicated website, put your website link here. This will let users click on the image to go to your website.
        - nav_footer_logo_top: An optional, secondary logo. Default is no logo.  
        - nav_footer_logo_top_ref: Link address for your secondary logo. Default is no link.
        - subtitle: A short line attributing the workshop to your series. This appears in the footer of all pages.

## 7. Add content to workshop pages 
There are two places to find content.

### Root directory

{: .warning-title }
> index.md
>
> This is the home page of your site. 
> 
> Edit:
> - the page header
> - the link to the title image 
> - the brief description of the workshop
> - the prerequisites (if any)
> - the learning objectives 
> - the duration (if possible)

{: .highlight-title }
> introduction.md
>
> Some workshops may have an introduction to the content before diving in. This is where you'll put it.
>
> Since not all workshops need this page, feel free to remove it.
>
> Edit:
> - the page header
> - the introductory paragraph
> - video iframe (if applicable)
> - slides/content iframe/links (if applicable)
> - text version (if applicable)

{: .important-title }
> preparation.md
>
> Some workshops may need attendees to install software, create accounts, or download files before attending/starting the workshop. This is where you outline the requirements and/or steps for any preparation needed prior to the workshop. If there is nothing to prepare, mention it on the page.
>
> Edit:
> - are there any accounts needed?
> - are there any files needed?
> - are there any software applications needed?

{: .new-title }
> lessonsPage.md
>
> If lesson pages are not done, set has_children to false (at the top of the page) and leave an "In Construction" text. 
>
> If your workshop only has a workshop recording and no lessons, follow the instructions in lessonsPage.md to turn it into a Workshop Recording page.

{: .note-title }
> conclusion.md
>
> This is where you wrap up the workshop. Remind the attendees what they did/learned, any key points to remember, and point them to additional resources.
>
> Edit:
> - the learning objectives
> - the additional resources

### Lessons Directory

{: .warning }
> If your workshop doesn't have Lessons (and is instead one long workshop video), do the following.
>
> - Delete the lessons folder.
> - At the top of `lessonsPage.md`, change the `title` to `Workshop Recording` and the permalink to `/workshop-recording/`.
> - Use the `lessonsPage.md` to embed your workshop recordings.
> - Change the "next" button to the conclusion page.

This is where any lessons you create go. 

Make sure all the lessons are ordered right (nav_order should be the lesson number).
Set parent to "Lessons".

There are already a couple premade lesson pages, including a lesson page with sublesson pages. Use these as examples. Duplicate lessons or delete any that you don't need.

Edit:
- the brief description
- the learning objectives
- the lesson video (if applicable)
- the lesson slides/resources (if applicable)
- the text (if applicable)
- the keypoints/summary
- the additional resources (if applicable)

## 8. Final Check and Touchups

- Make sure all the previous/next page buttons work!
  - Note: href locations use relative locations
- Delete the `kitchen_sink_DELETE.md`, `common_elements_DELETE.md`, and `how_to_create_a_site_DELETE.md` files.
- Delete any `lesson_.md` files you didn't use.

# Congratulations!

Your website should be up and ready to be used 😊.