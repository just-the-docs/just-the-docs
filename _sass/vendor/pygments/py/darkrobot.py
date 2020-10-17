# -*- coding: utf-8 -*-
"""
    Darkrobot Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, String, Generic, Number, Name, Operator, Keyword, Comment

class DarkrobotStyle(Style):

    background_color = '#1D1D1D'
    styles = {
        Token:              'noinherit #FFFFFF bg:#1D1D1D',
        Name.Attribute:     'noinherit #7EFAFF',
        Name.Variable:      'noinherit #7EFAFF',
        String:             'noinherit #DAC5FF bg:#141414',
        Generic.Subheading: 'noinherit #FFFFFF',
        Generic.Heading:    'noinherit #FFFFFF',
        Generic.Output:     'noinherit #A6A6A6 bg:#222222',
        Keyword:            'noinherit #FF6262',
        Generic.Traceback:  'noinherit #FFFFFF bg:#FF0000',
        Name.Constant:      'noinherit #DAC5FF bg:#141414',
        Name.Entity:        'noinherit #466EFF',
        Name.Label:         'noinherit #FEFFBA',
        Comment:            'noinherit #B8B8B8',
        Comment.Preproc:    'noinherit #FFA41B',
        Number:             'noinherit #DAC5FF bg:#141414',
        Name.Exception:     'noinherit #FEFFBA',
        Generic.Inserted:   'noinherit #07AF07 bg:#1D1D1D',
        Keyword.Type:       'noinherit #FEFFBA',
        Operator.Word:      'noinherit #FEFFBA',
        Generic.Deleted:    'noinherit #FF0000 bg:#1D1D1D',
        Name.Function:      'noinherit #7EFAFF',
        Generic.Emph:       'noinherit #20b0eF',
        Name.Tag:           'noinherit #FF6262',
    }
