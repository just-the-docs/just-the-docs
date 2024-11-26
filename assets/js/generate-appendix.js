const { match } = require('assert');
const fs = require('fs');
const path = require('path');

// Function to extract the "title" field from the front matter of a file
function extractTitle(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const match = content.match(/title:\s*["']?(.+?)["']?\n/);
        return match ? match[1] : 'Unknown Title';
    } catch (error) {
        console.error(`Error extracting title from file ${filePath}:`, error.message);
        return 'Unknown Title';
    }
}

// Function to extract referenced file paths from a file
function getReferencedPaths(filePath) {
    const referencedPaths = [];

    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Find all javascript:openPanel links
        const matches = content.match(/javascript:openPanel\('([^']+)'\)/g);
        if (!matches) {
            return referencedPaths;
        }

        matches.forEach((match) => {
            const panelId = match.match(/javascript:openPanel\('([^']+)'\)/)[1];
            const referencedFilePath = path.join(path.dirname(filePath), `${panelId}.md`);

            // Add the referenced file path to the list
            referencedPaths.push(referencedFilePath);
        });
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error.message);
    }

    return referencedPaths;
}

// Function to extract links and their titles from multiple files
function extractLinks(filePaths) {
    // const allLinks = [];
    var allLinks = {
        definitions: [],
        caseStudies: [],
        databases: [],
        other: []
    };

    filePaths.forEach((filePath) => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            console.log(`Processing file: ${filePath}`); // Debugging: Log file being processed
            // console.log(`File content:\n${content}\n`); // Debugging: Log file content

            // Match Markdown links in the format [Title](URL){:target="_blank"}<!-- tag:tagName -->
            const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)(\{:target="_blank"\})?(<!--.*?-->)?/g;
            const matches = content.match(regex);
            // console.log(`Found matches:`, matches); // Debugging: Log matches

            // Add {:target="_blank"} to each match and push to the result array
            if (matches) {
                matches.forEach(link => {
                    let category = 'other';  // Default to "other"
                    if (link.includes('tag:definition')) category = 'definitions';
                    if (link.includes('tag:case-study')) category = 'caseStudies';
                    if (link.includes('tag:database')) category = 'databases';
                    if (!link.includes('target=')) link = '${link}{:target="_blank"}'; // make it open in a new tab

                    const backlink = "https://www.google.com/"

                    allLinks[category].push([link, backlink]);
                });
            } else {
                console.log(`No links found in ${filePath}`);
            }

            // get links from sidepanels
            const referencedPaths = getReferencedPaths(filePath);
            const sidePanelLinks = extractLinks(referencedPaths) // recursive but shouldnt go deeper than 1 level
            allLinks = {
                definitions: [...allLinks.definitions, ...sidePanelLinks.definitions],
                caseStudies: [...allLinks.caseStudies, ...sidePanelLinks.caseStudies],
                databases: [...allLinks.databases, ...sidePanelLinks.databases],
                other: [...allLinks.other, ...sidePanelLinks.other]
            };

        } catch (error) {
            console.error(`ExtractLinks: Error processing file ${filePath}:`, error.message);
        }
    });

    return allLinks;
}

// Function to process a group of files and save the consolidated links to a new .md file
function processGroup(fileGroup) {
    // http://localhost:4000/srch/docs/artificial-intelligence/2.c.i/?panel=equity-equality#:~:text=Minow%3A%20Equality%20vs.%20Equity
    // http://localhost:4000/srch/docs/artificial-intelligence/2.c.i/?panel=equity-equality#:~:text=Minow%3A%20Equality%20vs.%20Equity
    if (fileGroup.length) {
        const allLinks = extractLinks(fileGroup);

        // Extract the title field of the first file in the group as the parent title
        const parentTitle = extractTitle(fileGroup[0]);
        const outputFileName = `index-appendix.md`;
        const parts = fileGroup[0].split('/');
        parts.pop();
        const base = parts.join('/');
        const outputFilePath = path.join(base, outputFileName);

        // Front matter to add at the top of the generated file
        const frontMatter = `---
layout: page
title: "Appendix"
parent: "${parentTitle}"
appendix: true
---

# Appendix for Learning Objective ${parentTitle}
These are all the external links mentioned in the body of the text and in the side panels, categorized by type.
`;
        const categoryToHeading = {
            'other': 'Uncategorized Links',
            'definitions': 'Definitions',
            'caseStudies': 'Case Studies',
            'databases': 'Databases',
        };
        // Format the links as a Markdown list
        var linksContent = ''
        for (const [category, items] of Object.entries(allLinks)) {
            if (items.length > 0) {
                linksContent += `### ${categoryToHeading[category]}\n`; // Add heading with category name
                items.forEach(item => {
                    // [View it on GitHub][Just the Docs repo]{: .btn .fs-5 .mb-4 .mb-md-0 }
                    itemWithBacklink = `${item[0]} [backlink](${item[1]}){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }`
                    linksContent += `- ${itemWithBacklink}\n`; // Add each item as a list
                });
                linksContent += '\n'; // Add a blank line after each category
            }
        }

        // TODO: if there is only one category, remove the heading? Or if all links are uncategorized, remove the heading.

        console.log(`All extracted links:\n${linksContent}`); // Debugging: Log extracted links

        // Combine the front matter and links content
        const fullContent = frontMatter + linksContent;

        // Write the combined content to the output file
        fs.writeFileSync(outputFilePath, fullContent, 'utf8');
        console.log(`Links for group written to ${outputFilePath}`);
    }
}

// Function to process a list of file groups
function processFiles(fileGroups) {
    fileGroups.forEach((fileGroup) => {
        processGroup(fileGroup);
    });
}

const BASE_DIR = '/workspaces/srch/docs';
const fileGroups = [
    // ADD TO THIS LIST TO GENERATE AN APPENDIX FOR A NEW LEARNING OBJECTIVE
    // you can generate links from multiple pages. Parent page will be the parent of the first file.
    [path.join(BASE_DIR, 'artificial-intelligence/2.c.i/index.md')], // this generates one appendix file for one page
    [path.join(BASE_DIR, 'artificial-intelligence/2.c.ii/index.md')],
    []
];

processFiles(fileGroups);
