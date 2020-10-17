# -*- coding: utf-8 -*-
"""
    Darkblue2 Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Number, Generic, Keyword, Name, Comment, Operator, String

class Darkblue2Style(Style):

    background_color = '#233b5a'
    styles = {
        Token:              '#fff8dc bg:#233b5a',
        Name.Label:         '#00ffff',
        Number:             '#ffec8b bold',
        Keyword:            '#00ffff bold',
        Name.Tag:           '#00ffff bold',
        String:             '#7fffd4',
        Generic.Error:      '#ffffff bg:#ff0000 bold',
        Comment:            '#66cdaa italic',
        Name.Attribute:     '#87cefa',
        Name.Constant:      '#ffec8b bold',
        Keyword.Type:       '#98fb98 bold',
        Generic.Emph:       'underline',
        Comment.Preproc:    '#b0c4de',
        Operator.Word:      '#00ffff',
        Generic.Traceback:  '#ffffff bg:#d9d9d9 bold',
        Number.Float:       '#ffec8b bold',
        Name.Function:      '#87cefa',
        Name.Variable:      '#98fb98 bold',
    }
