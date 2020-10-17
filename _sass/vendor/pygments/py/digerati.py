# -*- coding: utf-8 -*-
"""
    Digerati Colorscheme
    ~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Name, Operator, Comment, String, Number, Generic, Keyword

class DigeratiStyle(Style):

    background_color = '#444444'
    styles = {
        Token:              'noinherit #f0f0f0 bg:#444444',
        Generic.Subheading: '#ffffff bold',
        Name.Variable:      'noinherit #cdff00',
        Generic.Output:     'noinherit #a0a0a0 bg:#303030',
        Name.Constant:      'noinherit #ff3b77',
        String:             '#cdff00 italic',
        Generic.Heading:    '#ffffff bold',
        Number:             'noinherit #ff3b77',
        Comment:            '#808080 italic',
        Name.Function:      '#ffffff bold',
        Keyword.Type:       'noinherit #77b4c7',
        Name.Attribute:     '#ffffff bold',
        Name.Tag:           'noinherit #77b4c7',
        Name.Entity:        'noinherit #ff3b77',
        Keyword:            'noinherit #77b4c7',
        Comment.Preproc:    'noinherit #b8b89f',
    }
