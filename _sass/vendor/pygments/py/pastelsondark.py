# -*- coding: utf-8 -*-
"""
    Pastelsondark Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Comment, Keyword, Generic, String, Number, Name, Operator

class PastelsondarkStyle(Style):

    background_color = '#2B2B2B'
    styles = {
        Token:              '#E6E1DC bg:#2B2B2B',
        Name.Variable:      'noinherit #C1C144',
        Generic.Inserted:   '#E6E1DC bg:#519F50',
        Comment:            '#555555',
        Name.Attribute:     '#6782D3',
        Name.Entity:        '#47B8D6',
        Name.Constant:      '#A1A1FF',
        Generic.Deleted:    '#E6E1DC bg:#660000',
        Keyword:            'noinherit #4D74D0',
        Keyword.Type:       'noinherit #C1C144',
        Generic.Error:      '#FFC66D bg:#990000',
        Generic.Heading:    '#FFFFFF',
        Comment.Preproc:    '#E6E1DC',
        String:             '#AD9361',
        Number:             '#A5C261',
        Name.Function:      '#6782D3',
        Name.Tag:           'noinherit #4D74D0',
        Generic.Subheading: '#FFFFFF',
    }
