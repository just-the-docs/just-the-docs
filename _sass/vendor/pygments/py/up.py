# -*- coding: utf-8 -*-
"""
    Up Colorscheme
    ~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Comment, Number, Generic, Keyword, String, Operator, Name

class UpStyle(Style):

    background_color = '#1B1B1B'
    styles = {
        Token:              'noinherit #e2e2e5 bg:#1B1B1B',
        Generic.Output:     'noinherit #333333 bg:#232323',
        Comment.Preproc:    'noinherit #faf4c6',
        Comment:            '#605A4E italic',
        Name.Entity:        'noinherit #ff9800',
        Generic.Subheading: '#f6f3e8 bold',
        Generic.Heading:    '#f6f3e8 bold',
        Number:             'noinherit #FEFFD5',
        Name.Function:      'noinherit #B7EF52',
        Keyword:            'noinherit #C8C8C8',
        Keyword.Type:       'noinherit #81C7FF',
        Name.Variable:      'noinherit #b1d631',
        Name.Constant:      'noinherit #ff9800',
        String:             'noinherit #758265',
        Name.Tag:           'noinherit #C8C8C8',
        Name.Attribute:     'noinherit #B7EF52',
    }
