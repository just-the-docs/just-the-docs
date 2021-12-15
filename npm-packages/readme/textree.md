# Textree

Textree is a NodeJS dynamic HTTP framework to build websites easily
using a Jade-like syntax.

## Feature summary

### Jade-like syntax

The Jade syntax is a way to write HTML (or XML) in a human-friendly
way. The Textree synax adds extra syntaxic features, such as dot-based
attribute writing and inline tags:

```jade
html
  head
    title Hello page
    link.ref=stylesheet.type=text/css
      .href=/assets/style.css

  body
    h1 Hello world!
    section
      h2 Sub title
      p This is some paragraph.
      p Another paragraphe with {span inline {b tags}}
      
      // This is an HTML comment
```


### Asynchronous javascript control

Like with Jade, textree bring javascript controls, such as ```:if```,
```:each```, ```:var```.

Better: they all work with promises, which means that ```:var content
= asyncFunction()``` will be resolved with the promised
value. Asynchonous calls are managed transparently!

For example, to show the GitHub issues of the official NodeJS
repository (the ```requestHttpJson()``` function is provided by
textree and returns a promise):
```jade

section
  h2 GitHub issues
  :each issue in requestHttpJson("https://api.github.com/repos/nodejs/node/issues")
  
      section.issue

        div.floatr.right
          a.target=_blank
            :attr.href = issue.user.html_url
            img.width=60
              :attr.src = issue.user.avatar_url
            br
            span.author
              :process issue.user.login

        h3
          a
            :attr.href = issue.html_url
            :process issue.title

        p
          .style = whitespace:pre
          :process issue.body

```


## Streaming magic

Textree is stream-oriented. It is compound of classes inheriting from
Nodejs' ```stream.Transform```.

```:process``` is a smart instruction which pipes input from a newly
instanciated stream transform object. For example:

```jade
section
  h2 Parsing "inline" Markdown
  pre
    :process.ParseMarkdown.
      # This is Markdown content
      ## Sub-title

      The Textree parser interprets this as a text block
      (because of the dot after ".ParseMarkdown"), which
      goes through ParseMarkdown where the Markdown syntax
      is transformed to HTML nodes as if they where written
      in Textree format in the first place.

section
  h2 Including a plain text file
  pre
    :process.ReadFile
      fs:path README

section
  h2 Including parsed nodes from a Markdown file
  pre
    :process.ParseMarkdown
      :process.ReadFile
        fs:path README.md

section
  h2 Including parsed nodes from Textree files
  pre
    :process.ParseTextree
      :process.ReadFile
        fs:path README.tt
        fs:glob features/*.tt
```


## Transform custom tags using in-flow templates

The ```:on``` instruction lets you capture a custom tag whenever it is
met and replace it with a specific node structure:

```jade
:on ext
  a.ext.target=_blank
    :attr += ext.attributes
    :process ext.children

p
  ext.some-class
    .href = http://www.example.com/
    | This link will open in a new tab
    | and it has 

```

Templating is a core feature of Textree, meant to ease as much as
possible the writing and maintenance of HTML/textree content.

We use templates for everything: building HTML documents, managing
image frames with legend, extending markdown...


## Serving HTTP content from a Git repository

All content is accessed from a Git repository branch.  The environment
variable ```TEXTREE_GIT_DIR``` must point to a valid and possibly bare
Git repository (such as ```/var/lib/textree/repository```).

Naturally, git-push is the favorite way to update the website. A
```post-update``` hook can send ```SIGHUP``` to tell the textree
server that the branch has been updated.

This push-to-deploy strategy is a clean way to deploy atomic updates
of the website: use any Git client to push your website content and
once the transfer is done, the Textree server will start serving from
the new tree. **Absolutely no downtime!**

Git is a powerful approach to managing content, since it archives all
versions automatically, eases collaborations and provides
interoperability through GitHub and the wide Git ecosystem.
