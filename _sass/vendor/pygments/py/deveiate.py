# -*- coding: utf-8 -*-
"""
    Deveiate Colorscheme
    ~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Keyword, Number, Generic, String, Operator, Comment, Name

class DeveiateStyle(Style):

    background_color = '#00000f'
    styles = {
        Token:              'noinherit #f6dfb2 bg:#00000f',
        Name.Entity:        'noinherit #e9b96e',
        Number:             'noinherit #fce94f',
        Comment.Preproc:    '#00cbcd bold',
        Name.Constant:      'noinherit #76a3d7',
        Name.Attribute:     'noinherit #ad7fa8',
        Name.Tag:           'noinherit #ffffff bold',
        Comment:            'noinherit #a82419',
        Generic.Deleted:    'noinherit #f8f8f8 bg:#420e09',
        Generic.Inserted:   'noinherit #f8f8f8 bg:#253b22',
        Keyword:            'noinherit #ffffff bold',
        Name.Variable:      'noinherit #729fcf',
        Generic.Emph:       '#ad7fa8 underline',
        String:             'noinherit #da8d53',
        Name.Function:      'noinherit #ad7fa8',
        Generic.Output:     'noinherit #222222',
        Number.Float:       'noinherit #9bda8b',
    }
