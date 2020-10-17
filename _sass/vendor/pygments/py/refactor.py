# -*- coding: utf-8 -*-
"""
    Refactor Colorscheme
    ~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Operator, Number, Comment, Generic, Name, String, Keyword

class RefactorStyle(Style):

    background_color = '#151515'
    styles = {
        Token:              'noinherit #e8e8d3 bg:#151515',
        Name.Entity:        'noinherit #e9b96e',
        Comment:            'noinherit #888888 italic',
        Generic.Deleted:    '#0000ff bg:#008b8b bold',
        Keyword.Type:       'noinherit #FFFFB6',
        Generic.Subheading: '#ff00ff bold',
        Name.Function:      'noinherit #fad07a',
        Name.Variable:      'noinherit #C6C5FE',
        Comment.Preproc:    'noinherit #AFC4DB',
        Name.Constant:      'noinherit #cf6a4c',
        Keyword:            'noinherit #ffffff bold',
        Generic.Output:     '#cc0099 bold',
        Operator.Word:      'noinherit #ffffff',
        Number:             'noinherit #FF73FD',
        Name.Label:         'noinherit #E28964',
        Name.Attribute:     'noinherit #fad07a',
        Name.Tag:           'noinherit #ffffff bold',
        Generic.Traceback:  'noinherit #ffffff bg:#ff0000',
        Generic.Heading:    '#ff00ff bold',
        Generic.Error:      'noinherit #ffffff bg:#ff0000',
        String:             'noinherit #99ad6a',
        Name.Exception:     'noinherit #E28964',
        Generic.Emph:       '#ad7fa8 underline',
        Generic.Inserted:   'noinherit bg:#00008b',
        Number.Float:       'noinherit #527023',
    }
