# -*- coding: utf-8 -*-
"""
    Dim2 Colorscheme
    ~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Name, Operator, Number, Comment, String, Generic, Keyword

class Dim2Style(Style):

    background_color = '#000000'
    styles = {
        Token:              'noinherit #bfbfbf bg:#000000',
        Comment.Preproc:    'noinherit #cd96cd',
        Operator.Word:      'noinherit #559955',
        Name.Label:         'noinherit #559955',
        Number:             'noinherit #cd6889',
        String:             'noinherit #cd6889',
        Name.Entity:        'noinherit #cdc673',
        Name.Attribute:     'noinherit #7ac5cd',
        Name.Function:      'noinherit #7ac5cd',
        Name.Exception:     'noinherit #559955',
        Name.Tag:           '#9B8E76 bold',
        Name.Variable:      'noinherit #7ac5cd',
        Generic.Error:      'noinherit bg:#cd0000',
        Keyword.Type:       'noinherit #559955',
        Comment:            'noinherit #6ca6cd',
        Keyword:            '#9B8E76 bold',
        Generic.Output:     'noinherit #8b8b00 bg:#1a1a1a',
        Name.Constant:      'noinherit #cd6889',
    }
