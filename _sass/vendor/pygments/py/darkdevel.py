# -*- coding: utf-8 -*-
"""
    Darkdevel Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Name, Generic, Keyword, Comment, String, Operator, Number

class DarkdevelStyle(Style):

    background_color = '#000000'
    styles = {
        Token:              'noinherit #F0F0F0 bg:#000000',
        Operator.Word:      'noinherit #64C864',
        Comment:            'noinherit #646464',
        String:             'noinherit #64C896',
        Generic.Traceback:  'noinherit #FF0000',
        Generic.Heading:    'noinherit #F0F0F0',
        Generic.Subheading: 'noinherit #F0F0F0',
        Name.Tag:           'noinherit #C89664',
        Keyword.Type:       'noinherit #DC4B32',
        Name.Attribute:     'noinherit #FFC864',
        Name.Exception:     'noinherit #C89664',
        Keyword:            'noinherit #C89664',
        Generic.Inserted:   'noinherit #32BE32',
        Name.Function:      'noinherit #FFC864',
        Name.Constant:      'noinherit #6496C8',
        Number.Float:       'noinherit #64C896',
        Comment.Preproc:    'noinherit #DCDCDC',
        Generic.Output:     'noinherit #777777 bg:#000000',
        Generic.Deleted:    'noinherit #BE3232',
        Name.Variable:      'noinherit #6496C8',
        Name.Label:         'noinherit #C89664',
        Number:             'noinherit #64C896',
    }
