# -*- coding: utf-8 -*-
"""
    Synic Colorscheme
    ~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Name, Generic, Number, Comment, Operator, String, Keyword

class SynicStyle(Style):

    background_color = '#000000'
    styles = {
        Token:              'noinherit #fffff0 bg:#000000',
        Name.Entity:        'noinherit #daa520 bg:#000000',
        Number:             'noinherit #cdb7b5 bg:#000000',
        Generic.Heading:    'noinherit #eeee00 bg:#000000',
        Generic.Output:     'noinherit #008b8b bg:#000000',
        Operator.Word:      'noinherit #8673e8 bg:#000000',
        Name.Function:      '#68838b bg:#000000 bold',
        Name.Tag:           'noinherit #f0e68c bg:#000000',
        Comment:            'noinherit #708090 bg:#000000',
        Name.Attribute:     '#68838b bg:#000000 bold',
        Name.Variable:      '#68838b bg:#000000 bold',
        Generic.Error:      'noinherit #ff0000 bg:#faf0e6',
        Keyword.Type:       'noinherit #ffdead bg:#000000',
        Keyword:            'noinherit #f0e68c bg:#000000',
        Generic.Inserted:   'noinherit #0000ff bg:#e0ffff',
        Name.Constant:      'noinherit #cdb7b5 bg:#000000',
        Generic.Deleted:    'noinherit #add8e6 bg:#e0ffff',
        Generic.Traceback:  'noinherit #ff0000 bg:#faf0e6',
        Name.Exception:     'noinherit #ffdead bg:#000000',
        Generic.Subheading: 'noinherit #eeee00 bg:#000000',
        Name.Label:         'noinherit #ffdead bg:#000000',
        Generic.Emph:       '#fffff0 bg:#000000 underline',
        Comment.Preproc:    'noinherit #ffa0a0 bg:#000000',
        String:             'noinherit #9ac0cd bg:#000000',
    }
