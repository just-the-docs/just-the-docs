# -*- coding: utf-8 -*-
"""
    Darkerdesert Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Number, Operator, String, Comment, Generic, Keyword, Name

class DarkerdesertStyle(Style):

    background_color = '#121212'
    styles = {
        Token:              'noinherit #9090a0 bg:#121212',
        Name.Exception:     'noinherit #655723',
        Generic.Output:     'noinherit #add8e6 bg:#252525',
        Number:             'noinherit #a16261',
        Name.Entity:        'noinherit #c9b37e',
        Name.Label:         'noinherit #655723',
        Operator.Word:      'noinherit #655723',
        Generic.Heading:    'noinherit #38d9ff',
        Generic.Subheading: 'noinherit #38d9ff',
        Generic.Error:      'noinherit #ffffff bg:#b03030',
        Comment:            'noinherit #5080a0',
        Name.Attribute:     'noinherit #308040',
        Comment.Preproc:    'noinherit #a54140',
        Name.Constant:      'noinherit #a16261',
        Keyword.Type:       'noinherit #655723',
        Keyword:            'noinherit #a4a338',
        Name.Tag:           'noinherit #a4a338',
        Name.Variable:      'noinherit #308040',
        String:             'noinherit #a16261',
        Generic.Traceback:  'noinherit #ffffff bg:#b03030',
        Name.Function:      'noinherit #308040',
    }
