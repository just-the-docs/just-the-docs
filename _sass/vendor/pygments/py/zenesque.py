# -*- coding: utf-8 -*-
"""
    Zenesque Colorscheme
    ~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, String, Keyword, Number, Operator, Comment, Name, Generic

class ZenesqueStyle(Style):

    background_color = '#0f1216'
    styles = {
        Token:              'noinherit #adadad bg:#0f1216',
        String:             'noinherit #5d7a64 italic',
        Name.Function:      'noinherit #9784a2 bold',
        Generic.Output:     '#7e7e7e bold',
        Comment.Preproc:    'noinherit #5567a1 italic',
        Generic.Error:      '#727272',
        Generic.Traceback:  'noinherit #6f6f6f',
        Generic.Inserted:   'noinherit bg:#5a7e5d',
        Name.Constant:      'noinherit #8d5c57 bold',
        Keyword.Type:       '#518991 bold italic',
        Name.Tag:           '#5a89a4 italic',
        Name.Variable:      'noinherit #a16f51 bold',
        Name.Entity:        'noinherit #a7a863',
        Generic.Deleted:    'noinherit #bf6a6a bg:#2d1212',
        Comment:            'noinherit #777777 italic',
        Generic.Subheading: '#6d6d6d bold',
        Generic.Heading:    '#6d6d6d bold',
        Keyword:            '#5a89a4 italic',
        Name.Attribute:     'noinherit #9784a2 bold',
    }
