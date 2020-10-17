# -*- coding: utf-8 -*-
"""
    Dark2 Colorscheme
    ~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Keyword, Name, Operator, Generic, Number, Comment, String

class Dark2Style(Style):

    background_color = '#000000'
    styles = {
        Token:              'noinherit #f8f8ff bg:#000000',
        Name.Entity:        'noinherit #DDDD00',
        Keyword:            'noinherit #d2b48c',
        Name.Tag:           'noinherit #d2b48c',
        Name.Function:      'noinherit #87ceeb',
        Name.Attribute:     'noinherit #87ceeb',
        Generic.Output:     'noinherit #cdcd00 bg:#1a1a1a',
        Name.Label:         'noinherit #efface',
        Comment.Preproc:    'noinherit #FF7070',
        Keyword.Type:       'noinherit #efface',
        Comment:            'noinherit #80CC80',
        Name.Exception:     'noinherit #efface',
        String:             'noinherit #ee9a00',
        Operator.Word:      'noinherit #efface',
        Generic.Error:      'noinherit bg:#cd0000',
        Name.Variable:      'noinherit #87ceeb',
    }
