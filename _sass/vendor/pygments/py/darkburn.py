# -*- coding: utf-8 -*-
"""
    Darkburn Colorscheme
    ~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Number, Comment, String, Keyword, Name, Generic, Operator

class DarkburnStyle(Style):

    background_color = '#3f3f3f'
    styles = {
        Token:              '#dcdccc bg:#3f3f3f',
        Number.Float:       '#c0bed1',
        Keyword.Type:       '#dfdfbf bold',
        Comment:            '#7f9f7f italic',
        Name.Tag:           'noinherit #6fb86f',
        Generic.Error:      'noinherit #e37170 bg:#332323 bold',
        Name.Variable:      '#dcdcdc',
        Number:             '#8cd0d3',
        Generic.Emph:       '#dcdccc bold underline',
        Generic.Traceback:  '#80d4aa bg:#2f2f2f bold',
        Keyword:            'noinherit #6fb86f',
        Generic.Heading:    '#efefef bold',
        Name.Attribute:     '#efef8f',
        Name.Constant:      '#dca3a3 bold',
        Name.Label:         '#dfcfaf underline',
        Generic.Subheading: '#efefef bold',
        Generic.Output:     '#404040',
        Generic.Inserted:   '#709080 bg:#313c36 bold',
        Name.Exception:     '#c3bf9f bold',
        String:             '#b75151',
        Operator.Word:      '#f0efd0',
        Name.Entity:        '#9fbfd6',
        Generic.Deleted:    '#333333 bg:#464646',
        Comment.Preproc:    '#ffb23f bold',
        Name.Function:      '#efef8f',
    }
