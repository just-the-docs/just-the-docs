---
layout: default
title: ls (List Directories)
parent: The Shell
grand_parent: Programming
nav_order: 7
---

# ls (List Directories)

Now that we know how to move around the system, how do we figure out what is available to us? Right now it’s like we are moving around in the dark. Well, we can use the wonderful ls command to list directory contents. The ls command will list directories and files in the current directory by default, however you can specify which path you want to list the directories of.

```
$ ls

$ ls /home/pete
```

ls is a quite useful tool, it also shows you detailed information about the files and directories you are looking at.

Also note that not all files in a directory will be visible. Filenames that start with . are hidden, you can view them however with the ls command and pass the -a flag to it (a for all).

```
$ ls -a
```

There is also one more useful ls flag, -l for long, this shows a detailed list of files in a long format. This will show you detailed information, starting from the left: file permissions, number of links, owner name, owner group, file size, timestamp of last modification, and file/directory name.

```
$ ls -l
```
```
pete@icebox:~$ ls -l

total 80

drwxr-x--- 7 pete penguingroup   4096 Nov 20 16:37 Desktop

drwxr-x--- 2 pete penguingroup   4096 Oct 19 10:46  Documents

drwxr-x--- 4 pete penguingroup   4096 Nov 20 09:30 Downloads

drwxr-x--- 2 pete penguingroup   4096 Oct  7 13:13   Music

drwxr-x--- 2 pete penguingroup   4096 Sep 21 14:02 Pictures

drwxr-x--- 2 pete penguingroup   4096 Jul 27 12:41   Public

drwxr-x--- 2 pete penguingroup   4096 Jul 27 12:41   Templates

drwxr-x--- 2 pete penguingroup   4096 Jul 27 12:41   Videos
```

Commands have things called flags (or arguments or options, whatever you want to call it) to add more functionality. See how we added -a and -l, well you can add them both together with -la. The order of the flags determines which order it goes in, most of the time this doesn’t really matter so you can also do ls -al and it would still work.

```
$ ls -la
```

--https://web.archive.org/web/20221020145212/https://linuxjourney.com/lesson/list-directories-ls-commmand
