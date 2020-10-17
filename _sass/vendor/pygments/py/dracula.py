# -*- coding: utf-8 -*-
"""
    Dracula Colorscheme
    ~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Operator, Keyword, Name, Generic, Comment, Number, String

class DraculaStyle(Style):

    background_color = '#282a36'
    styles = {
        Token:              'noinherit #f8f8f2 bg:#282a36',
        Name.Function:      'noinherit #50fa7b',
        Name.Label:         'noinherit #f1fa8c',
        Generic.Heading:    '#f8f8f2 bold',
        Name.Attribute:     'noinherit #50fa7b',
        Operator.Word:      'noinherit #ff79c6',
        Name.Entity:        'noinherit #f8f8f2',
        Generic.Emph:       'underline',
        Generic.Subheading: '#f8f8f2 bold',
        Comment:            'noinherit #6272a4',
        Name.Variable:      'noinherit #8be9fd italic',
        String:             'noinherit #f1fa8c',
        Keyword:            'noinherit #ff79c6',
        Generic.Deleted:    'noinherit #8b080b',
        Keyword.Type:       'noinherit #8be9fd',
        Name.Constant:      'noinherit',
        Comment.Preproc:    'noinherit #ff79c6',
        Generic.Output:     'noinherit #525563 bg:#282a36',
        Name.Tag:           'noinherit #ff79c6',
        Number.Float:       'noinherit #bd93f9',
        Generic.Inserted:   '#f8f8f2 bg:#468410 bold',
        Number:             'noinherit #bd93f9',
        Generic.Traceback:  'noinherit #f8f8f0 bg:#ff79c6',
    }
