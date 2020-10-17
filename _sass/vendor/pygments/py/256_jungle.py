# -*- coding: utf-8 -*-
"""
    256_Jungle Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Comment, Number, Operator, Generic, Name, String, Keyword

class 256_JungleStyle(Style):

    background_color = '#1c1c1c'
    styles = {
        Token:              'noinherit #dadada bg:#1c1c1c',
        Name.Label:         'noinherit #d75f00',
        Number:             'noinherit #5fd700',
        Keyword.Type:       'noinherit #d75f00',
        Name.Tag:           'noinherit #d78700',
        Operator.Word:      'noinherit #d75f00',
        Name.Attribute:     'noinherit #afaf00',
        Comment:            'noinherit #585858',
        Name.Entity:        'noinherit #d78700',
        Name.Function:      'noinherit #afaf00',
        Comment.Preproc:    'noinherit #767676',
        Name.Variable:      'noinherit #afaf00',
        Name.Exception:     'noinherit #d75f00',
        String:             'noinherit #5fd700',
        Generic.Error:      'noinherit bg:#ff0000',
        Generic.Output:     'noinherit #8787ff',
        Name.Constant:      'noinherit #5fd700',
        Keyword:            'noinherit #d78700',
        Generic.Traceback:  'noinherit #d70000 bg:#8a8a8a',
    }
