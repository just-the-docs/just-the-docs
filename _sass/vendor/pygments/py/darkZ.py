# -*- coding: utf-8 -*-
"""
    Darkz Colorscheme
    ~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, String, Number, Name, Generic, Comment, Keyword, Operator

class DarkzStyle(Style):

    background_color = '#292929'
    styles = {
        Token:              'noinherit #DFD6C1 bg:#292929',
        Comment:            '#8c8c8c italic',
        Name.Entity:        'noinherit #ff4500',
        Generic.Traceback:  'noinherit #ffffff bg:#ff0000 bold',
        Generic.Output:     'noinherit #00ffff bold',
        Name.Tag:           'noinherit #FCFC63',
        Generic.Emph:       '#c000c0 underline',
        Name.Variable:      'noinherit #6FDEF8',
        Generic.Subheading: 'noinherit #ff4400 bold',
        Generic.Heading:    'noinherit #ff4400 bold',
        Comment.Preproc:    'noinherit #82EF2A',
        Name.Function:      'noinherit #82EF2A',
        Name.Attribute:     'noinherit #82EF2A',
        Keyword:            'noinherit #FCFC63',
        Generic.Inserted:   '#000000 bg:#ffe7ba',
        Name.Constant:      'noinherit #FF77FF',
        Generic.Deleted:    'noinherit #000000 bg:#737373 bold',
        Generic.Error:      '#c0c0c0 bg:#c00000 bold',
        Keyword.Type:       'noinherit #33AFF3',
    }
