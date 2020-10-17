# -*- coding: utf-8 -*-
"""
    Birds_Of_Paradise Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Number, Keyword, Generic, String, Comment, Operator, Name

class Birds_Of_ParadiseStyle(Style):

    background_color = '#372725'
    styles = {
        Token:              'noinherit #ffffff bg:#372725',
        Name.Variable:      '#ef5d32 bold',
        Generic.Deleted:    'noinherit bg:#000000',
        Number:             'noinherit #6c99bb',
        Name.Function:      '#ffffff bold',
        Operator.Word:      '#efac32 bold',
        Generic.Emph:       '#ef5d32 underline',
        Name.Constant:      '#ffffff bold',
        Name.Attribute:     '#ffffff bold',
        Comment:            'noinherit #6b4e32',
        Generic.Heading:    '#ffffff bold',
        Generic.Subheading: '#ffffff bold',
        Generic.Inserted:   'noinherit bg:#008b8b',
        Name.Tag:           '#efac32 bold',
        Comment.Preproc:    'noinherit #ef5d32',
        Keyword.Type:       '#ef5d32 bold',
        Name.Label:         '#efac32 bold',
        Name.Entity:        'noinherit #ef5d32',
        Number.Float:       'noinherit #6c99bb',
        Keyword:            '#efac32 bold',
        Name.Exception:     'noinherit #ef5d32',
        String:             'noinherit #d9d762',
        Generic.Error:      '#ef5d32 bold',
        Generic.Traceback:  '#7b5f40 bg:#b22222',
        Generic.Output:     'noinherit #ffffff bg:#372725',
    }
