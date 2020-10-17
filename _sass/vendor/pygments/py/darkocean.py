# -*- coding: utf-8 -*-
"""
    Darkocean Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Name, Keyword, Comment, String, Generic, Number, Operator

class DarkoceanStyle(Style):

    background_color = '#000000'
    styles = {
        Token:              'noinherit #e0ffff bg:#000000',
        Generic.Heading:    'noinherit #5cacee bg:#000000',
        Keyword:            'noinherit #72a5ee bg:#000000',
        Name.Function:      'noinherit #009acd bg:#000000',
        Name.Exception:     'noinherit #3b9c9c bg:#000000',
        Name.Tag:           'noinherit #72a5ee bg:#000000',
        Name.Variable:      'noinherit #009acd bg:#000000',
        Generic.Deleted:    'noinherit #e0ffff bg:#7e354d',
        Comment:            'noinherit #8db6cd bg:#102520',
        String:             'noinherit #c34a2c bg:#000000',
        Name.Attribute:     'noinherit #009acd bg:#000000',
        Operator.Word:      'noinherit #3b9c9c bg:#000000',
        Generic.Error:      'noinherit #ffffe0 bg:#b22222',
        Generic.Subheading: 'noinherit #5cacee bg:#000000',
        Name.Label:         'noinherit #3b9c9c bg:#000000',
        Number:             'noinherit #c34a2c bg:#000000',
        Keyword.Type:       'noinherit #3b9c9c bg:#000000',
        Generic.Inserted:   'noinherit #e0ffff bg:#7e354d',
        Generic.Traceback:  'noinherit #ffffe0 bg:#b22222',
        Comment.Preproc:    'noinherit #c12869 bg:#000000',
        Name.Constant:      'noinherit #c34a2c bg:#000000',
        Generic.Output:     'noinherit #87cefa bg:#0f0f0f',
    }
