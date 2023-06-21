# cp (Copy)

Let’s start making some copies of these files. Much like copy and pasting files in other operating systems, the shell gives us an even simpler way of doing that.

```
$ cp mycoolfile /home/pete/Documents/cooldocs
```

mycoolfile is the file you want to copy and /home/pete/Documents/cooldocs is where you are copying the file to.

You can copy multiple files and directories as well as use wildcards. A wildcard is a character that can be substituted for a pattern based selection, giving you more flexibility with searches. You can use wildcards in every command for more flexibility.

- \* the wildcard of wildcards, it's used to represent all single characters or any string.
- ? used to represent one character
- [] used to represent any character within the brackets

```
$ cp *.jpg /home/pete/Pictures
```

This will copy all files with the .jpg extension in your current directory to the Pictures directory.

A useful command is to use the -r flag, this will recursively copy the files and directories within a directory.

Try to do a cp on a directory that contains a couple of files to your Documents directory. Didn’t work did it? Well that’s because you’ll need to copy over the files and directories inside as well with -r command.

```
$ cp -r Pumpkin/ /home/pete/Documents
```

One thing to note, if you copy a file over to a directory that has the same filename, the file will be overwritten with whatever you are copying over. This is no bueno if you have a file that you don’t want to get accidentally overwritten. You can use the -i flag (interactive) to prompt you before overwriting a file.

```
$ cp -i mycoolfile /home/pete/Pictures
```

--https://web.archive.org/web/20221020150207/https://linuxjourney.com/lesson/copy-cp-command
