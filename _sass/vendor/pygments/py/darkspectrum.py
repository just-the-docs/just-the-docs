# -*- coding: utf-8 -*-
"""
    Darkspectrum Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Generic, String, Name, Comment, Number, Operator, Keyword

class DarkspectrumStyle(Style):

    background_color = '#2A2A2A'
    styles = {
        Token:              '#efefef bg:#2A2A2A',
        Keyword.Type:       '#8ae234 bold',
        String:             '#fce94f',
        Generic.Inserted:   'noinherit #ffcc7f bg:#a67429',
        Name.Variable:      '#729fcf',
        Name.Tag:           '#ffffff bold',
        Generic.Heading:    '#ef5939',
        Name.Attribute:     '#ad7fa8',
        Name.Constant:      'noinherit #ef5939',
        Comment.Preproc:    '#ffffff bold',
        Generic.Output:     '#535353 bg:#202020',
        Name.Function:      '#ad7fa8',
        Generic.Emph:       '#ad7fa8 underline',
        Name.Entity:        '#e9b96e',
        Number:             '#fcaf3e',
        Comment:            '#8a8a8a',
        Generic.Deleted:    'noinherit #000000 bg:#000000',
        Keyword:            '#ffffff bold',
        Generic.Subheading: '#ef5939',
    }
