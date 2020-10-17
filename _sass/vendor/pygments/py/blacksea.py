# -*- coding: utf-8 -*-
"""
    Blacksea Colorscheme
    ~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, String, Generic, Number, Name, Comment, Operator, Keyword

class BlackseaStyle(Style):

    background_color = '#000000'
    styles = {
        Token:              '#fff5ee bg:#000000',
        Name.Tag:           '#cd3333',
        Keyword.Type:       'noinherit',
        Comment.Preproc:    '#ff00ff',
        Generic.Inserted:   '#ffffff bg:#006400',
        Name.Variable:      '#00ffff',
        Keyword:            '#cd3333',
        Generic.Deleted:    '#000000 bg:#8b0000',
        Generic.Output:     '#fff0f5',
        Comment:            '#add8e6',
    }
