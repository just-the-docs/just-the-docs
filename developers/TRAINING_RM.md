---
layout: default
title: rm (Remove)
parent: The Shell
grand_parent: Programming
nav_order: 11
---

# rm (Remove)

Now I think we have too many files, let’s remove some files. To remove files you can use the rm command. The rm (remove) command is used to delete files and directories.

```
$ rm file1
```

Take caution when using rm, there is no magical trash can that you can fish out removed files. Once they are gone, they are gone for good, so be careful.

Fortunately there are some safety measures put into place, so the average joe can’t just remove a bunch of important files. Write-protected files will prompt you for confirmation before deleting them. If a directory is write-protected it will also not be easily removed.

Now if you don’t care about any of that, you can absolutely remove a bunch of files.

```
$ rm -f file1
```

`-f` or force option tells rm to remove all files, whether they are write protected or not, without prompting the user (as long as you have the appropriate permissions).

```
$ rm -i file
```

Adding the `-i` flag like many of the other commands, will give you a prompt on whether you want to actually remove the files or directories.

```
$ rm -r directory
```

You can’t just rm a directory by default, you’ll need to add the **`-r`** flag (recursive) to remove all the files and any subdirectories it may have.

You can remove a directory with the rmdir command.

```
$ rmdir directory
```

--https://web.archive.org/web/20221020151944/https://linuxjourney.com/lesson/remove-rm-command
