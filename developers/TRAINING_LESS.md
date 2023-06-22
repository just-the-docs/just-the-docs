---
layout: default
title: less
parent: The Shell
grand_parent: Programming
nav_order: 6
---

# less

If you are viewing text files larger than a simple output, less is more. (There is actually a command called more that does something similar, so this is ironic.) The text is displayed in a paged manner, so you can navigate through a text file page by page.

Go ahead and look at the contents of a file with less. Once you’re in the less command, you can actually use other keyboard commands to navigate in the file.

```
$ less /home/pete/Documents/text1
```

Use the following command to navigate through less:

- q - Used to quit out of less and go back to your shell.
- Page up, Page down, Up and Down - Navigate using the arrow keys and page keys.
- g - Moves to beginning of the text file.
- G - Moves to the end of the text file.
- /search - You can search for specific text inside the text document. Prefacing the words you want to search with /
- h - If you need a little help about how to use less while you’re in less, use help.
    
--https://web.archive.org/web/20221020145723/https://linuxjourney.com/lesson/less-command
