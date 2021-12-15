# nhentai.net API
A API wrapper that reads the HTML of the site and extracts info

This library supports fetching:
- Manga, 
- List of Manga, 
- tags/characters/parodies/catagories/groups/artists

# Install
``` npm install --save api-nhentai-net ```

# API
```
const NHentaiAPI = require('api-nhentai-net') 
const api = new NHentaiAPI();
api.manga.id(295051).then((manga)=> console.log(JSON.stringify(manga, null, 2)));
```
