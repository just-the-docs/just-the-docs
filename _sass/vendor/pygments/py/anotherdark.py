# -*- coding: utf-8 -*-
"""
    Anotherdark Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Keyword, String, Generic, Number, Name, Comment, Operator

class AnotherdarkStyle(Style):

    background_color = '#333333'
    styles = {
        Token:              '#ffffff bg:#333333',
        Name.Tag:           '#f0e68c',
        Comment.Preproc:    '#cd5c5c',
        Name.Entity:        '#ffdead',
        Name.Constant:      '#ffa0a0',
        Keyword:            '#f0e68c',
        Generic.Deleted:    '#0000c0 bg:#008080 bold',
        Generic.Heading:    '#cd5c5c',
        Comment:            '#ff4500',
        Keyword.Type:       '#bdb76b',
        Generic.Emph:       '#c000c0 underline',
        Name.Variable:      '#98fb98',
        Generic.Error:      '#c0c0c0 bg:#c00000 bold',
        Generic.Subheading: '#cd5c5c',
        Generic.Output:     '#add8e6 bg:#4d4d4d bold',
        Generic.Traceback:  '#c0c0c0 bg:#c00000 bold',
        Generic.Inserted:   'bg:#0000c0',
    }
