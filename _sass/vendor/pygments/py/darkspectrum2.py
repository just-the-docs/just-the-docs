# -*- coding: utf-8 -*-
"""
    Darkspectrum2 Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Keyword, Name, String, Generic, Comment, Number, Operator

class Darkspectrum2Style(Style):

    background_color = '#2A2A2A'
    styles = {
        Token:              'noinherit #efefef bg:#2A2A2A',
        Operator.Word:      '#8ae234 bold',
        Generic.Emph:       '#ad7fa8 underline',
        Name.Variable:      'noinherit #729fcf',
        Name.Constant:      'noinherit #ef5939',
        String:             'noinherit #fce94f',
        Keyword.Type:       '#8ae234 bold',
        Name.Exception:     '#8ae234 bold',
        Name.Entity:        'noinherit #e9b96e',
        Name.Tag:           '#ffffff bold',
        Keyword:            '#ffffff bold',
        Comment.Preproc:    '#ffffff bold',
        Generic.Error:      '#FFFFFF bg:#ef5939 bold',
        Name.Function:      'noinherit #ad7fa8',
        Generic.Subheading: 'noinherit #ef5939',
        Generic.Inserted:   'noinherit #ffcc7f bg:#a67429',
        Generic.Deleted:    'noinherit #000000 bg:#000000',
        Generic.Heading:    'noinherit #ef5939',
        Number.Float:       'noinherit #fce94f',
        Name.Attribute:     'noinherit #ad7fa8',
        Comment:            'noinherit #8a8a8a',
        Name.Label:         '#8ae234 bold',
        Generic.Output:     'noinherit #535353 bg:#202020',
        Number:             'noinherit #fce94f',
    }
