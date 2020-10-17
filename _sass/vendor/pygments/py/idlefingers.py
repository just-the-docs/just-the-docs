# -*- coding: utf-8 -*-
"""
    Idle Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Comment, Name, Keyword, Generic, Number, Operator, String

class IdleStyle(Style):
    default_style = ""
    background_color = '#323232'
    styles = {
        Token:              'noinherit #ffffff bg:#323232',
        Comment.Preproc:    'noinherit #cc7833',
        Generic.Output:     'noinherit #404040 bg:#353637',
        Name.Constant:      'noinherit #6c99bb',
        Keyword.Type:       'noinherit #ffc66d',
        Operator.Word:      'noinherit #cc7833',
        Number.Float:       'noinherit #6c99bb',
        Generic.Traceback:  'noinherit #ffffff bg:#ff0000',
        Name.Function:      'noinherit #ffc66d',
        Name.Label:         'noinherit #a5c261',
        Number:             'noinherit #6c99bb',
        Keyword:            'noinherit #cc7833',
        Name.Tag:           'noinherit #cc7833',
        String:             'noinherit #a5c261',
        Name.Entity:        'noinherit #ffffff',
        Name.Attribute:     'noinherit #ffc66d',
        Comment:            '#bc9458 italic',
        Name.Variable:      'noinherit',
        Generic.Heading:    '#ffffff bold',
        Generic.Subheading: '#ffffff bold',
        Generic.Emph:       'underline'
    }
