# -*- coding: utf-8 -*-
"""
    Darkbone Colorscheme
    ~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Operator, Name, Keyword, Generic, String, Number, Comment

class DarkboneStyle(Style):

    background_color = '#000000'
    styles = {
        Token:              '#a0a0c0 bg:#000000',
        Generic.Emph:       '#a0a0c0 underline',
        Comment.Preproc:    'noinherit #e0e0ff',
        Generic.Error:      '#ee1111 bg:#000000',
        Generic.Inserted:   'noinherit #8090f0 bg:#000000',
        Name.Variable:      '#8090f0',
        Generic.Deleted:    'noinherit #8090f0 bg:#000000',
        Name.Entity:        'noinherit #808080 bg:#000000',
        Keyword.Type:       'noinherit #e0e0ff',
        Generic.Subheading: '#c0c0ff bg:#000000 bold',
        Name.Attribute:     '#f0b040',
        Comment:            '#606080',
        Keyword:            'noinherit #8090f0',
        Generic.Heading:    '#c0c0ff bg:#000000 bold',
        String:             '#d0e080 bg:#000000',
        Generic.Traceback:  '#ee1111 bg:#000000',
        Number:             '#d0e080 bg:#000000',
        Name.Function:      '#f0b040',
        Name.Tag:           'noinherit #8090f0',
        Generic.Output:     'noinherit #606080 bg:#101020',
        Name.Constant:      'noinherit #f0a0b0 bg:#000000',
    }
