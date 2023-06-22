---
layout: default
title: mv (Move)
parent: The Shell
grand_parent: Programming
nav_order: 9
---

# mv (Move)

Used for moving files and also renaming them. Quite similar to the cp command in terms of flags and functionality.

You can rename files like this:

```
$ mv oldfile newfile
```

Or you can actually move a file to a different directory:

```
$ mv file2 /home/pete/Documents
```

And move more than one file:

```
$ mv file_1 file_2 /somedirectory
```

You can rename directories as well:

```
$ mv directory1 directory2
```

Like cp, if you mv a file or directory it will overwrite anything in the same directory. So you can use the -i flag to prompt you before overwriting anything.

```
mv -i directory1 directory2
```

Let’s say you did want to mv a file to overwrite the previous one. You can also make a backup of that file and it will just rename the old version with a ~.

```
$ mv -b directory1 directory2
```

--https://web.archive.org/web/20221020150809/https://linuxjourney.com/lesson/move-mv-command
