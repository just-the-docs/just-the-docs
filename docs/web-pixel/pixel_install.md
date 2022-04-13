---
layout: default
title: Install the Web Pixel
parent: Web Pixel
---

{: .no_toc }
<details close markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

>ℹ Out of the box, the MRP Prelytix Web Pixel is GDPR compliant and does not collect any user-level data by utilizing cookies.

## Install the MRP Prelytix Web Pixel

The MRP Prelytix Web Pixel is a piece of code added to your website that provides statistics on which accounts are visiting your website, what pages they’re viewing, and how frequently they are doing so. This data is then coupled with other analytics to help score and prioritize the account for you.

### How to obtain the pixel snippet

In Prelytix, go to the Admin Studio and select ‘Implement Web Pixel’:

1. Input your website’s domain in the domain field
2. Select ‘Generate pixel’ to generate your snippet

### Prelytix Web Pixel implementation 

You can implement the pixel one of two ways: with or without a tag manager. It is recommended you implement with a tag manager for industry best practice. If you have a tag manager other than Google Tag Manager, consult with your web team on how to add the pixel.

### Implementing with Google Tag Manager

In Google Tag Manager, you will add a new tag.

- The web pixel should be implemented as a “custom image”. This will prevent it from having any performance impact on page load.
- Copy and paste the URL from the pixel snippet into the Image URL field.
- The web pixel is typically set to be triggered “on all pages”, but for a remarketing pixel you would select a subset of your website.

### Upload your site map

For Prelytix to display the web activity logically, a site map is needed. Your site map must have three columns: URL, Section Name, and Active. The file must be a CSV or XLSX and should be uploaded directly in the platform. 
