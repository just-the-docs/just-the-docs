# -*- coding: utf-8 -*-
"""
    Sahara Colorscheme
    ~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Name, Keyword, Generic, String, Comment, Operator, Number

class SaharaStyle(Style):

    background_color = '#151515'
    styles = {
        Token:              'noinherit #e8e8d3 bg:#151515',
        Name.Attribute:     'noinherit #fad07a',
        Comment:            'noinherit #888888 italic',
        Generic.Output:     'noinherit #3a3a3a',
        Number:             'noinherit #FF73FD',
        Name.Exception:     'noinherit #afaf5f',
        Generic.Subheading: 'noinherit #c6c6c6',
        Generic.Heading:    'noinherit #c6c6c6',
        Comment.Preproc:    'noinherit #d75f5f',
        Name.Entity:        'noinherit #e9b96e',
        Name.Tag:           'noinherit #ffffff bold',
        Keyword.Type:       'noinherit #afaf5f',
        Keyword:            'noinherit #ffffff bold',
        String:             'noinherit #99ad6a',
        Generic.Emph:       'noinherit #ad7fa8 underline',
        Name.Function:      'noinherit #fad07a',
        Name.Constant:      'noinherit #cf6a4c',
        Operator.Word:      'noinherit #ffffff',
        Name.Label:         'noinherit #afaf5f',
        Generic.Deleted:    'noinherit bg:#5f0000',
        Name.Variable:      'noinherit #C6C5FE',
        Generic.Inserted:   'noinherit bg:#005f00',
    }
