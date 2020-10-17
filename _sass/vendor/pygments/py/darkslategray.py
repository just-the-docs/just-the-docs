# -*- coding: utf-8 -*-
"""
    Darkslategray Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Number, Generic, Keyword, Operator, Comment, String, Name

class DarkslategrayStyle(Style):

    background_color = '#2f4f4f'
    styles = {
        Token:              '#f5deb3 bg:#2f4f4f',
        Name.Entity:        '#ff6347',
        Comment.Preproc:    '#cdcd00',
        Keyword.Type:       '#98fb98 bold',
        Name.Tag:           '#4682b4 bold',
        Keyword:            '#4682b4 bold',
        Number.Float:       '#ff6347',
        Name.Label:         '#4682b4 bold',
        Generic.Error:      '#ffffff bg:#ff0000 bold',
        String:             '#7fffd4',
        Name.Exception:     '#4682b4 bold',
        Generic.Output:     '#ffffff bold',
        Generic.Traceback:  '#ffffff bg:#ff0000 bold',
        Operator.Word:      '#4682b4 bold',
        Number:             '#ff6347',
        Generic.Deleted:    'bg:#000000 bold',
        Name.Variable:      '#afeeee',
        Generic.Emph:       'underline',
        Name.Constant:      '#cdcd00',
        Name.Function:      '#ffffff',
        Comment:            '#da70d6',
        Name.Attribute:     '#ffffff',
        Generic.Inserted:   'bg:#528b8b',
        Generic.Subheading: '#ff6347 bold',
        Generic.Heading:    '#ff6347 bold',
    }
