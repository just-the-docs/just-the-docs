"""
The intent here is to:

1. Extract all links (including other references)  and markdown filenames/titles.
2. Save the graph of references in a JSON file.
3. Use javascript (?) to append external references on pages from the JSON.
"""
import pprint
pp = pprint.PrettyPrinter(width=41, compact=True)

from pathlib import Path
import re
import mistune
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import html


def slugify(s):
    return s.lower().replace(" ", "-").replace("_","-")

# maps page-slug to referrer list.
# {'operations': [{'index'}], ... }
refs = {}

links = {}

class HighlightRenderer(mistune.Renderer):

    def set_file_slug(self, fpath):
        self.fpath = fpath
        self.file_slug = slugify(fpath[:-3])
        links[self.file_slug] = {
           'full_link': self.fpath,
           'outbound': []
        }
        
    def link(self, link, title, content):
        if hasattr(self, 'file_slug'):
            if not link.startswith('http://') and not link.startswith('https://'):
                links[self.file_slug]['outbound'].append(link)
        return super().link(link, title, content)

    def wiki_link(self, link, text):
        return "Wiki link detected, but this renderer is not used."


class WikiLinkInlineLexer(mistune.InlineLexer):
    def enable_wiki_link(self):
        # add wiki_link rules
        self.rules.wiki_link = re.compile(
            r'\[\['                   # [[
            r'([\s\S]+?)'   # Page 2|Page 2
            r'\]\](?!\])'             # ]]
        )

        # Add wiki_link parser to default rules
        # you can insert it some place you like
        # but place matters, maybe 3 is not good
        self.default_rules.insert(3, 'wiki_link')

    def output_wiki_link(self, m):
        text = m.group(1)
        alt, link = text.split('|')
        # you can create an custom render
        # you can also return the html if you like
        return self.renderer.wiki_link(alt, link)


renderer = HighlightRenderer()
inline = WikiLinkInlineLexer(renderer)
inline.enable_wiki_link()
markdown = mistune.Markdown(renderer=renderer, inline=inline)
print(markdown('''

[abc](https://google.com)

[[def|ghi]]

'''))


files = ['index.md', 'operations/OPERATIONS.md']

for f in list(Path(".").rglob("*.[mM][dD]")):
    md = open(f).read()
    markdown.renderer.set_file_slug(f.name)
    markdown(md)

for k, v in links.items():
    for target in v['outbound']:
        target_slug = slugify(target.strip("/").split("/")[-1])
        if target_slug not in refs:
            refs[target_slug] = {}
        refs[target_slug][k] = True

for k in list(refs.keys()):
    if k not in links.keys():
        print('no source file found, for slug: {}'.format(k))
        del refs[k]

print("INBOUND LINKS:")
pp.pprint({k:list(v.keys()) for k,v in refs.items()})
