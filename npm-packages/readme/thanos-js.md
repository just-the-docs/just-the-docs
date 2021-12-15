# thanos-js

Thanos has now arrived on your PC and he will bring havoc to your files.
He will wipe out exactly half of your files when he snaps fingers wearing the infinity-gauntlet-glove

You are lucky though, he can only carry out destruction in the directory in which the command is executed.

## Install

`npm install -g thanos-js`

## Usage

-   Limited Power: `thanos-js snap-fingers`
-   Full Power: `thanos-js snap-fingers --with-infinity-gauntlet-glove`

## Technical Details

-   Yes, It deletes the files. [ for those who are confused about what this package does ]

-   It uses `fs.unlinkSync` to delete the files.

-   It traverses the whole directory structure down from where the command is executed. So files inside child directories might be deleted.

-   It does not traverse every directory. `node_modules`, `.git` and other directories starting with '`.`' are not traversed. [ Deleting random files from `.git` would be absolutely evil and Thanos would LOVE to do it 😈 ]
-   Exactly half of the files are deleted. Each file is given a `chance` at random and either the top 50% of the files or bottom 50% of files are chosen to be deleted.

## Other Similar Implementations

-   JAVA - [thanos.jar](https://github.com/aeris170/thanos.jar)
