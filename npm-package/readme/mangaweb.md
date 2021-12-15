# MangaWeb

 Use this command line tool to download manga
 
    npm install mangaweb -g

Don't forget the `-g`

When you first download MangaWeb, type `mangaweb -s ~/path/to/folder`
Then, to download a manga use the mangaweb command in any of the following formats:

    mangaweb name-of-manga
    mangaweb name of manga
    mangaweb "name of manga"
    mangaweb NaME-oF-MAnGA

You can access the options using `--help` or `-h` options are as follows:

	mangaweb name-of-manga -r
	mangaweb -p /path/to/file

`-r` downloads the pages in reverse for Japanese manga (works better if you are reading in iBooks on an iPhone, but you need to start from the back of the book) and `-p` signifies a path to a file containing multiple manga names for sequential download. Titles must be separated by `\n`'s (return's) eg:

	berserk
	claymore
	7 seeds
	ajin
	doubt
	...


please let me know if you run into any errors or have any suggestions by emailing me at mangawebcrawler@gmail.com

