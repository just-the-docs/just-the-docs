---
layout: default
title: Data Studio Upload
parent: Data Studio
nav_order: 1
---

# <font color="#c54092"> Uploading an Account List in Data Studio</font>

This documentation provides templates, requirements and best practices for using <strong>Upload</strong> to upload and match your own lists of accounts with Prelytix accounts. 

<div style="background: ghostwhite; font-size: 20px; padding: 10px; border: 1px solid lightgray; margin: 10px;">
  &#x1F6C8; Company Admins and Members can upload a list
</div>

## Getting Started with Account Lists
Every team has their own objectives when it comes to targeting and measuring the success of their tactics and campaigns. The way that you choose to onboard data will have an impact on how you can identify positive and negative outcomes and continually improve campaign performance. 

## Upload Template

To upload an Account List, you must use the provided template on the <strong>Upload</strong> page. The file must be a .csv and is limited to 100,000 rows or 10MB. Here's what the template is comprised of:

<table>
  <tr>
    <th>Column</th>
    <th>Required (T/F) </th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Account ID</td>
    <td>F</td>
    <td>A unique identifier to represent that account record</td>
  </tr>
  <tr>
    <td>Account Name</td>
    <td>T (if Account Domain is blank)</td>
    <td>Name of the account</td>
  </tr>
   <tr>
    <td>Account Domain</td>
    <td>T (if Account Name is blank)</td>
    <td>Domain/URL of the account</td>
  </tr>
   <tr>
    <td>Address</td>
    <td>F</td>
    <td>The address of the account record</td>
  </tr>
   <tr>
    <td>Address 2</td>
    <td>F</td>
    <td>The building floor or secondary address information of the account record</td>
  </tr>
   <tr>
    <td>City</td>
    <td>F</td>
    <td>The city of the account record</td>
  </tr>
   <tr>
    <td>State/Territory</td>
    <td>F</td>
    <td>Name or ISO 2 code referring to the region (state in the United States) related to the account record</td>
  </tr>
   <tr>
    <td>Country</td>
    <td>F</td>
    <td>Name or ISO 2 or ISO 3 code referring to the country related to the account record</td>
  </tr>
   <tr>
    <td>Postal Code</td>
    <td>F</td>
    <td>The postal code of the account record</td>
  </tr>
   <tr>
    <td>Account Phone</td>
    <td>F</td>
    <td>The main phone number of the account record</td>
  </tr>
   <tr>
    <td>Account Owner</td>
    <td>F</td>
    <td>The user responsible for any closed business with the account</td>
  </tr>
</table>

## Best Practices

<strong>Here are some ways you may want to segment and Upload your Lists:</strong>
<ul style = “list-style-type:square”>
<li> Industry or Vertical: (ex) Financial and Healthcare Accounts
<li> Account Size: (ex) SMB, Mid-Market, and Enterprise
<li> Sales Regions: (ex) East, Central, West </ul>

<strong>Managing Match Results</strong>

Prelytix can match accounts with just the account name, or by using the name and domain. For the best results, provide both the name and domain. 

When including location data in your upload, you will ensure the account
Prelytix matches to are only the locations you care about. If location specific data is less important to your objective, then only provide account name and domain. The List will then include all known Organization Locations. 
<ul>
  <li>For example, if your file includes MRP | mrpfd.com | Philadelphia | PA
 <ol style="list-style-type: lower-alpha; padding-bottom: 0;">
  <li style="margin-left:2em">Then you wouldn’t see IP activity from MRP Boston, Sydney, or Belfast
offices</li>
  <li style="margin-left:2em; padding-bottom: 0;">If you are interested in data from those locations - then only include
MRP | mrpfd.com in your file upload and Prelytix will match to all available locations</li>
 </ol>
 </li>
 </ol>