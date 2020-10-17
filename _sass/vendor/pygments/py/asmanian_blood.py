# -*- coding: utf-8 -*-
"""
    Asmanian_Blood Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, String, Number, Generic, Comment, Name, Operator, Keyword

class Asmanian_BloodStyle(Style):

    background_color = '#080404'
    styles = {
        Token:              'noinherit #b4b0b0 bg:#080404',
        Generic.Emph:       '#b4b0b0 bg:#080404 underline',
        Name.Variable:      'noinherit #c0b060 bg:#080404 italic',
        Number:             'noinherit #60d060 bg:#080404',
        Generic.Heading:    '#ffffff bg:#202020 underline',
        Name.Constant:      'noinherit #60d060 bg:#080404',
        Generic.Subheading: '#ffffff bg:#202020 underline',
        Name.Exception:     '#903020 bg:#080404 underline',
        Number.Float:       'noinherit #60d060 bg:#080404',
        Comment.Preproc:    'noinherit #a090a0 bg:#080404 italic',
        Name.Attribute:     'noinherit #60b050 bg:#080404 italic',
        Name.Function:      'noinherit #60b050 bg:#080404 italic',
        Comment:            'noinherit #686460 bg:#080404',
        Operator.Word:      'noinherit #705850 bg:#080404 italic',
        Generic.Output:     'noinherit #b4b0b0 bg:#181414',
        Name.Label:         'noinherit #705850 bg:#080404 italic',
        Name.Entity:        'noinherit #a06050 bg:#181414 italic',
        Name.Tag:           '#506090 bg:#080404 underline',
        Keyword.Type:       'noinherit #705850 bg:#080404 italic',
        String:             'noinherit #a06050 bg:#080404 italic',
        Keyword:            '#506090 bg:#080404 underline',
    }
