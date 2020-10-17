# -*- coding: utf-8 -*-
"""
    Brookstream Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, String, Keyword, Comment, Operator, Number, Name, Generic

class BrookstreamStyle(Style):

    background_color = '#000000'
    styles = {
        Token:              'noinherit #bbbbbb bg:#000000',
        Name.Variable:      'noinherit #00e5ee',
        Generic.Error:      'noinherit #bb0000 bg:#000000',
        String:             'noinherit #4682b4',
        Name.Constant:      'noinherit #00aaaa',
        Generic.Inserted:   'noinherit #ffff00 bg:#080808',
        Generic.Emph:       '#4444ff bold',
        Name.Tag:           'noinherit #00ffff',
        Name.Attribute:     'noinherit #1e90ff',
        Name.Label:         'noinherit #ffffff',
        Number:             'noinherit #00aaaa',
        Generic.Heading:    'noinherit #ffffff',
        Generic.Subheading: 'noinherit #ffffff',
        Keyword:            'noinherit #00ffff',
        Generic.Output:     'noinherit #4444ff',
        Name.Function:      'noinherit #1e90ff',
        Keyword.Type:       'noinherit #ffffff',
        Comment:            'noinherit #696969',
        Comment.Preproc:    'noinherit #8470ff',
        Name.Entity:        'noinherit #87cefa',
        Name.Exception:     'noinherit #ffffff',
        Operator.Word:      'noinherit #00bfff',
        Generic.Traceback:  'noinherit #ffffff bg:#880000',
        Generic.Deleted:    'noinherit #444444 bg:#080808',
    }
