const { log } = require('console');
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

// Function to extract links and their titles from a file
function extractLinks(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Match Markdown links in the format [Title](URL){:target="_blank"}
        const matches = content.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g);
        // Add {:target="_blank"} to each match
        return matches ? matches.map(link => `${link}{:target="_blank"}`) : [];
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error.message);
        return [];
    }
}

// Main function to process a file and all its referenced files
function processFile(fileToProcess) {
    const referencedPaths = getReferencedPaths(fileToProcess);
    const allLinks = [];

    referencedPaths.forEach((refFilePath) => {
        const links = extractLinks(refFilePath);
        allLinks.push(...links);
    });

    return allLinks;
}

// Function to process a list of files and save the results to individual .md files
function processFiles(fileList) {
    fileList.forEach((filePath) => {
        const links = processFile(filePath);

        // Extract the title field of the original file
        const parentTitle = extractTitle(filePath);

        // Create the output .md file with the same name as the input file
        const outputFilePath = filePath.replace('.md', '-appendix.md');

        // Front matter to add at the top of the generated file
        const frontMatter = `---
layout: page
title: "Appendix"
parent: "${parentTitle}"
appendix: true
---\n\n

# Links for learing objective ${parentTitle}
These are all the links mentioned in the body of the text and in the sidepanels.
`;

        // Format the links as a Markdown list
        const linksContent = links.map(link => `- ${link}`).join('\n');

        // Combine the front matter and links content
        const fullContent = frontMatter + linksContent;

        // Write the combined content to the output file
        fs.writeFileSync(outputFilePath, fullContent, 'utf8');
        console.log(`Links for ${filePath} have been saved to ${outputFilePath}`);
    });
}

const BASE_DIR = '/workspaces/srch/docs';
const fileList = [
    // ADD TO THIS LIST TO GENERATE AN APPENDIX FOR A NEW LEARNING OBJECTIVE
    path.join(BASE_DIR, 'artificial-intelligence/2.c.i/index.md'),
    path.join(BASE_DIR, 'artificial-intelligence/2.c.ii/index.md'),
];
processFiles(fileList);
