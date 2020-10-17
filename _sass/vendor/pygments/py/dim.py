# -*- coding: utf-8 -*-
"""
    Dim Colorscheme
    ~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Operator, Number, String, Generic, Name, Keyword, Comment

class DimStyle(Style):

    background_color = '#000000'
    styles = {
        Token:              'noinherit #bfbfbf bg:#000000',
        Comment.Preproc:    'noinherit #cd96cd',
        Name.Constant:      'noinherit #cd6889',
        Generic.Output:     'noinherit #8b8b00 bg:#1a1a1a',
        Keyword.Type:       'noinherit #BD7550',
        Name.Label:         'noinherit #BD7550',
        Number:             'noinherit #cd6889',
        Comment:            'noinherit #6ca6cd',
        String:             'noinherit #cd6889',
        Name.Function:      'noinherit #559955',
        Name.Exception:     'noinherit #BD7550',
        Name.Attribute:     'noinherit #559955',
        Name.Tag:           '#9B8E76 bold',
        Generic.Error:      'noinherit bg:#cd0000',
        Name.Entity:        'noinherit #cdc673',
        Keyword:            '#9B8E76 bold',
        Operator.Word:      'noinherit #BD7550',
        Name.Variable:      'noinherit #559955',
    }
