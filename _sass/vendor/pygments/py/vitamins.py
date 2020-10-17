# -*- coding: utf-8 -*-
"""
    Vitamins Colorscheme
    ~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, String, Keyword, Generic, Comment, Operator, Name, Number

class VitaminsStyle(Style):

    background_color = '#242424'
    styles = {
        Token:              'noinherit #f6f3f0 bg:#242424',
        Name.Function:      'noinherit #cdd129',
        String:             '#ff5d28 italic',
        Name.Variable:      'noinherit #ff5d28',
        Name.Tag:           'noinherit #af5f5f',
        Keyword:            'noinherit #af5f5f',
        Generic.Subheading: '#f6f3e8 bold',
        Name.Constant:      'noinherit #acf0f2',
        Keyword.Type:       'noinherit #cdd129',
        Name.Attribute:     'noinherit #cdd129',
        Comment:            '#808080 italic',
        Generic.Heading:    '#f6f3e8 bold',
        Comment.Preproc:    'noinherit #ede39e',
        Name.Entity:        'noinherit #acf0f2',
        Number:             'noinherit #ede39e',
        Generic.Output:     'noinherit #808080 bg:#303030',
    }
