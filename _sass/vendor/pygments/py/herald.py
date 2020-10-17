# -*- coding: utf-8 -*-
"""
    Herald Colorscheme
    ~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Generic, Number, Comment, String, Keyword, Name, Operator

class HeraldStyle(Style):

    background_color = '#151515'
    styles = {
        Token:              'noinherit #e8e8d3 bg:#151515',
        Name.Entity:        'noinherit #FFB539 bg:#1F1F1F',
        Name.Exception:     'noinherit #FC4234 bg:#1F1F1F',
        Name.Attribute:     'noinherit #fad07a bg:#1F1F1F',
        Comment.Preproc:    'noinherit #BF81FA bg:#1F1F1F',
        Keyword:            'noinherit #E783E9 bg:#1F1F1F',
        String:             'noinherit #99ad6a bg:#1F1F1F',
        Name.Tag:           'noinherit #E783E9 bg:#1F1F1F',
        Keyword.Type:       'noinherit #FFEE68 bg:#1F1F1F',
        Generic.Output:     'noinherit #FC6984 bg:#1F1F1F',
        Generic.Subheading: '#6DF584 bg:#1F1F1F bold',
        Number:             'noinherit #6DF584 bg:#1F1F1F',
        Name.Label:         'noinherit #FFEE68 bg:#1F1F1F',
        Comment:            'noinherit #888888 bg:#1F1F1F italic',
        Generic.Heading:    '#6DF584 bg:#1F1F1F bold',
        Generic.Error:      'noinherit #FC4234 bg:#1F1F1F',
        Generic.Emph:       '#FC4234 bg:#1F1F1F underline',
        Generic.Inserted:   'noinherit #ED9000 bg:#006124',
        Name.Constant:      'noinherit #cf6a4c bg:#1F1F1F',
        Name.Function:      'noinherit #fad07a bg:#1F1F1F',
        Generic.Traceback:  'noinherit #D0D0D0 bg:#A32024',
        Name.Variable:      'noinherit #c6b6ee bg:#1F1F1F',
        Generic.Deleted:    'noinherit #ED9000 bg:#081F38',
        Operator.Word:      'noinherit #FC6984 bg:#1F1F1F',
    }
