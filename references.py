"""
The intent here is to:

1. Extract all links (including other references)  and markdown filenames/titles.
2. Save the graph of references in a JSON file.
3. Use javascript (?) to append external references on pages from the JSON.
"""
import json
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

def fname_to_slug(s):
    return slugify(s[:-3])

# maps page-slug to referrer list.
# {'operations': [{'index'}], ... }
refs = {} # external links by page
paths = {} # mapping of page names to url
links = {} # outbound links by page

class HighlightRenderer(mistune.Renderer):

    def set_file_slug(self, fname):
        self.file_slug = fname_to_slug(fname)
        links[self.file_slug] = {
           'outbound': []
        }
        
    def link(self, link, title, content):
        if hasattr(self, 'file_slug'):
            if not link.startswith('http://') and \
                not link.startswith('https://') and \
                not link.startswith ("#") and \
                not link.startswith('mailto:'):
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
    web_path = str(f)[:-3]
    node = fname_to_slug(f.name)

    # Do not include README files in this generator.
    if node == 'readme':
        continue
    else:
        print("NODE:", node)

    if node in paths:
        raise Exception("Duplicate node detected {} != {}. Please never have 2 markdown files with the same name, as filenames are used as node IDs for bidirectional links.".format(
        web_path, paths[node]
    ))

    # If the path ends with 'index', that means we can remove the last token since this is the default, root file.
    if web_path.endswith('index'):
        web_path = web_path[:-5]
    paths[node] = web_path
    markdown.renderer.set_file_slug(f.name)
    markdown(md)

for k, v in links.items():
    for target in v['outbound']:
        target_slug = slugify(target.strip("/").split("/")[-1])
        if target_slug not in refs:
            refs[target_slug] = {}
        if target_slug not in links.keys():
            print('no source file found, for slug: {}, referred by {}'.format(target_slug, k))
        else:
            refs[target_slug][k] = True

# Should be handled above already, TODO: remove this.
# for k in list(refs.keys()):
#     if k not in links.keys():
#         # exclude refs that do not resolve.
#         del refs[k]

print("INBOUND LINKS:")
refs = {k:list(v.keys()) for k,v in refs.items()}

output = {
    'refs': refs,
    'paths': paths
}
pp.pprint(output)
open('references.json','w').write(json.dumps(output))
