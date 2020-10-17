# -*- coding: utf-8 -*-
"""
    Candycode Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Generic, Name, Number, String, Operator, Comment, Keyword

class CandycodeStyle(Style):

    background_color = '#050505'
    styles = {
        Token:              'noinherit #ffffff bg:#050505',
        Name.Entity:        '#9999aa bold',
        Comment.Preproc:    'noinherit #bb88dd',
        Operator.Word:      '#4093cc bold',
        Generic.Subheading: '#dd4452 bold',
        Generic.Error:      'noinherit #ffffff bg:#ff0000',
        Generic.Traceback:  '#ffffff bg:#ff0000 bold',
        Generic.Heading:    '#dd4452 bold',
        Generic.Deleted:    '#000000 bg:#be1923 bold',
        Name.Function:      'noinherit #eecc44',
        Keyword:            '#66d077 bold',
        Name.Variable:      'noinherit #eecc44',
        Number:             'noinherit #ff6050',
        Comment:            'noinherit #ff9922',
        Name.Tag:           '#66d077 bold',
        Name.Exception:     '#4093cc bold',
        Name.Constant:      'noinherit #ff6050',
        Name.Label:         '#4093cc bold',
        Generic.Emph:       '#80a0ff underline',
        Name.Attribute:     'noinherit #eecc44',
        Generic.Inserted:   'noinherit #ffffff bg:#126493',
        Keyword.Type:       '#4093cc bold',
        String:             'noinherit #ff6050',
        Generic.Output:     '#77ff22 bold',
    }
