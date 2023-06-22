---
layout: default
title: history
parent: The Shell
grand_parent: Programming
nav_order: 5
---

# history

In your shell, there is a history of the commands that you previously entered, you can actually look through these commands. This is quite useful when you want to find and run a command you used previously without actually typing it again.

```
$ history
```

Want to run the same command you did before, just hit the up arrow.

Want to run the previous command without typing it again? Use **`!!`**. If you typed `cat file1` and want to run it again, you can actually just go `!!` and it will run the last command you ran.

Another history shortcut is **`ctrl-R`**, this is the reverse search command, if you hit ctrl-R and you start typing parts of the command you want it will show you matches and you can just navigate through them by hitting the ctrl-R key again. Once you found the command you want to use again, just hit the Enter key.

Our terminal is getting a little cluttered no? Let’s do a little cleanup, use the clear command to clear up your display.

```
$ clear
```

There that looks better doesn’t it?

While we are talking about useful things, one of the most useful features in any command-line environment is **tab completion**. If you start typing the beginning of a command, file, directory, etc and hit the **Tab key**, it will autocomplete based on what it finds in the directory you are searching as long as you don’t have any other files that start with those letters. For example if you were trying to run the command chrome, you can type chr and press Tab and it will autocomplete chrome.

--https://web.archive.org/web/20221020145838/https://linuxjourney.com/lesson/history-command
