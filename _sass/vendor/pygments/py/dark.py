# -*- coding: utf-8 -*-
"""
    Dark Colorscheme
    ~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Name, String, Comment, Operator, Keyword, Generic, Number

class DarkStyle(Style):

    background_color = '#333333'
    styles = {
        Token:              'noinherit #f8f8ff bg:#333333',
        Keyword.Type:       'noinherit #ffa500',
        Generic.Output:     'noinherit #cdcd00 bg:#262626',
        Number:             'noinherit #FF7070',
        Name.Exception:     'noinherit #ffa500',
        Generic.Error:      'noinherit bg:#cd0000',
        String:             'noinherit #ffa0a0',
        Comment:            'noinherit #87ceeb',
        Comment.Preproc:    'noinherit #ee7ae9',
        Name.Function:      'noinherit #60DD60',
        Keyword:            'noinherit #d2b48c',
        Name.Constant:      'noinherit #FF7070',
        Name.Variable:      'noinherit #60DD60',
        Name.Tag:           'noinherit #d2b48c',
        Operator.Word:      'noinherit #ffa500',
        Name.Label:         'noinherit #ffa500',
        Name.Attribute:     'noinherit #60DD60',
        Name.Entity:        'noinherit #DDDD00',
    }
