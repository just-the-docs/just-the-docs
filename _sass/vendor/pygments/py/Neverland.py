# -*- coding: utf-8 -*-
"""
    Neverland Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Keyword, String, Generic, Name, Comment, Operator, Number

class NeverlandStyle(Style):

    background_color = '#121212'
    styles = {
        Token:              '#ffd7ff bg:#121212',
        Generic.Inserted:   'bg:#005f87',
        Number.Float:       '#af5fff',
        Keyword:            '#d78700 bold',
        Name.Variable:      '#afd75f',
        Name.Exception:     '#87ff00 bold',
        Generic.Error:      '#ffafff bg:#87005f',
        String:             '#d7af5f',
        Name.Function:      '#87ff00',
        Comment.Preproc:    '#ffafd7',
        Generic.Deleted:    '#d70087 bg:#5f005f',
        Number:             '#0087ff',
        Operator.Word:      '#afd700',
        Generic.Output:     '#121212 bg:#121212',
        Generic.Emph:       'noinherit #87af00',
        Generic.Traceback:  '#ff00af bg:#000000 bold',
        Name.Label:         'noinherit #ffffaf',
        Name.Tag:           '#d78700 bold',
        Name.Constant:      '#87af00 bold',
        Generic.Subheading: '#5faf5f',
        Comment:            '#af875f',
        Generic.Heading:    '#5faf5f',
        Keyword.Type:       'noinherit #d75f00',
        Name.Entity:        '#5fd7ff bg:#080808',
        Name.Attribute:     '#87ff00',
    }
