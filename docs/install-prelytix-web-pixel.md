---
layout: default
title: Install the Prelytix Web Pixel
parent: Admin Studio
nav_order: 1
---
---

# <font color="#c54092">Install the MRP Prelytix Web Pixel</font>

<div style="background: ghostwhite; font-size: 20px; padding: 10px; border: 1px solid lightgray; margin: 10px;">
  &#x1F6C8; Only Company Admins can upload a sitemap or create a web pixel.

If you don’t have Admin permissions, you won’t see the Web Pixel section and you won't be able to upload a site map or create a pixel. </div>
<div style="background: ghostwhite; font-size: 20px; padding: 10px; border: 1px solid lightgray; margin: 10px;">
  &#x1F6C8; Out of the box, the MRP Prelytix Web Pixel is GDPR compliant and does not collect any user-level data by utilizing cookies.
</div>

The MRP Prelytix Web Pixel is a piece of code added to your website that provides statistics on which accounts are visiting your website, what pages they’re viewing, and how frequently they are doing so. This data is then coupled with other analytics to help score and prioritize the account for you.

## How to obtain the pixel snippet

In Prelytix, go to the Admin Studio and select ‘Web Pixel’:

1. Select 'Create a Pixel'
2. Add your website's domain
3. Upload and confirm your site map using the provided template. The template requires three columns: URL, Section Name, and Active (T or F or Y or N). The file is required to be a .csv or .xlsx. 
4. Copy your web pixel 

## Prelytix Web Pixel implementation 

You can implement the pixel one of two ways: with or without a tag manager. It is recommended you implement with a tag manager for industry best practice. If you have a tag manager other than Google Tag Manager, consult with your web team on how to add the pixel.

### Implementing with Google Tag Manager

In Google Tag Manager, you will add a new tag.

- The web pixel should be implemented as a “custom image”. This will prevent it from having any performance impact on page load.
- Copy and paste the URL from the pixel snippet into the Image URL field.
- The web pixel is typically set to be triggered “on all pages”, but for a remarketing pixel you would select a subset of your website.
