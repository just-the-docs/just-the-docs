var list = require('postcss/lib/list')
var pats = {
  attrcc: '[^\\~|^$*\\]]*',
  brackets: /(\[[^\]]*\]|\([^\)]*\))/.source,
  nobrackets: /[^\[\]\(\)]/.source
}
function matchOutsideOfBrackets (pat) {
  if (pat instanceof RegExp) {
    pat = pat.source
  }
  return new RegExp('^(' + pats.brackets + '?' + pats.nobrackets + '*)*' + pat)
}

module.exports = {
  'border-radius': {
    properties: [
      'border-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius'
    ]
  },
  'css-boxshadow': { properties: ['box-shadow'] },
  'css-animation': {
    properties: [
      'animation',
      'animation-name',
      'animation-duration',
      'animation-delay',
      'animation-direction',
      'animation-fill-mode',
      'animation-iteration-count',
      'animation-play-state',
      'animation-timing-function',
      '@keyframes'
    ]
  },
  'css-transitions': {
    properties: [
      'transition',
      'transition-property',
      'transition-duration',
      'transition-delay',
      'transition-timing-function'
    ]
  },
  transforms2d: {
    properties: [
      'transform',
      'transform-origin'
    ]
  },
  transforms3d: {
    properties: [
      'perspective',
      'perspective-origin',
      'transform-style',
      'backface-visibility'
    ]
  },
  'css-gradients': {
    properties: [
      'background',
      'background-image',
      'border-image'
    ],
    values: [
      /(^|[^-])linear-gradient/,
      /(^|[^-])radial-gradient/
    ]
  },
  'css3-boxsizing': { properties: ['box-sizing'] },
  'css-filters': { properties: ['filter'] },
  multicolumn: {
    properties: [
      'columns',
      'column-width',
      'column-gap',
      'column-rule',
      'column-rule-color',
      'column-rule-width',
      'column-count',
      'column-rule-style',
      'column-span',
      'column-fill',
      'break-before',
      'break-after',
      'break-inside'
    ]
  },
  'user-select-none': { properties: ['user-select'] },
  flexbox: {
    properties: ['display'],
    values: [
      'display-flex',
      'inline-flex',
      'flex',
      'flex-grow',
      'flex-shrink',
      'flex-basis',
      'flex-direction',
      'flex-wrap',
      'flex-flow',
      'justify-content',
      'order',
      'align-items',
      'align-self',
      'align-content'
    ]
  },
  calc: {
    values: ['calc'],
    properties: ['']
  },
  'background-img-opts': {
    properties: [
      'background-clip',
      'background-origin',
      'background-size'
    ]
  },
  'font-feature': {
    properties: [
      'font-feature-settings',
      'font-variant-ligatures',
      'font-language-override',
      'font-kerning'
    ]
  },
  'border-image': { properties: ['border-image'] },
  'css-selection': {
    properties: ['::selection'],
    selector: true
  },
  'css-placeholder': {
    properties: ['::placeholder'],
    selector: true
  },
  'css-hyphens': { properties: ['hyphens'] },
  fullscreen: {
    properties: [':fullscreen'],
    selector: true
  },
  'css3-tabsize': { properties: ['tab-size'] },
  'intrinsic-width': {
    properties: [
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height'
    ],
    values: [
      'max-content',
      'min-content',
      'fit-content',
      'fill-available'
    ]
  },
  'css3-cursors-newer': {
    properties: ['cursor'],
    values: [
      'zoom-in',
      'zoom-out',
      'grab',
      'grabbing'
    ]
  },
  'css-sticky': {
    properties: ['position'],
    values: ['sticky']
  },
  pointer: { properties: ['touch-action'] },
  'text-decoration': {
    properties: [
      'text-decoration-style',
      'text-decoration-line',
      'text-decoration-color'
    ]
  },
  'text-size-adjust': { properties: ['text-size-adjust'] },
  'css-masks': {
    properties: [
      'clip-path',
      'mask',
      'mask-clip',
      'mask-composite',
      'mask-image',
      'mask-origin',
      'mask-position',
      'mask-repeat',
      'mask-size'
    ]
  },
  fontface: { atrules: ['font-face'] },
  multibackgrounds: {
    properties: [/^background-?/],
    values: [function (value) {
      return list.comma(value).length > 1
    }]
  },
  'css-table': {
    properties: ['display'],
    values: [
      'table',
      'table-cell',
      'table-row',
      'table-layout'
    ]
  },
  'css-gencontent': {
    selectors: [
      ':before',
      ':after'
    ]
  },
  'css-fixed': {
    properties: ['position'],
    values: ['fixed']
  },
  'css-sel2': {
    selectors: [
      matchOutsideOfBrackets(/\*/),
      matchOutsideOfBrackets(/>/),
      matchOutsideOfBrackets(/\+/),
      matchOutsideOfBrackets(/\./),
      matchOutsideOfBrackets(/#/),
      ':first-child',
      ':link',
      ':visited',
      ':active',
      ':hover',
      ':focus',
      ':lang',
      new RegExp('\\[' + pats.attrcc + '\\]'),
      new RegExp('\\[' + pats.attrcc + '=' + pats.attrcc + '\\]'),
      new RegExp('\\[' + pats.attrcc + '\\~=' + pats.attrcc + '\\]'),
      new RegExp('\\[' + pats.attrcc + '\\|=' + pats.attrcc + '\\]')
    ]
  },
  'css-sel3': {
    selectors: [
      new RegExp('\\[' + pats.attrcc + '\\^=' + pats.attrcc + '\\]'),
      new RegExp('\\[' + pats.attrcc + '\\$=' + pats.attrcc + '\\]'),
      new RegExp('\\[' + pats.attrcc + '\\*=' + pats.attrcc + '\\]'),
      ':root',
      ':nth-child',
      ':nth-last-child',
      'nth-of-type',
      'nth-last-of-type',
      ':last-child',
      ':first-of-type',
      ':last-of-type',
      ':only-child',
      ':only-of-type',
      ':empty',
      ':target',
      ':enabled',
      ':disabled',
      ':checked',
      ':not',
      /^[^\[]*~/
    ]
  },
  'css-textshadow': { properties: ['text-shadow'] },
  'css3-colors': {
    properties: [''],
    values: [
      'rgba',
      'hsl',
      'hsla'
    ]
  },
  'css-mediaqueries': { atrules: ['media'] },
  'css-canvas': {
    properties: [/^background/],
    values: [/^-webkit-canvas/]
  },
  'css-reflections': { properties: ['box-reflect'] },
  'svg-css': { unimplemented: true },
  'css-featurequeries': { atrules: ['supports'] },
  'css-opacity': { properties: ['opacity'] },
  'text-overflow': { properties: ['text-overflow'] },
  wordwrap: { properties: ['overflow-wrap'] },
  'object-fit': { properties: ['object-fit'] },
  minmaxwh: {
    properties: [
      'min-width',
      'max-width',
      'min-height',
      'max-height'
    ]
  },
  'text-stroke': { unimplemented: true },
  'inline-block': {
    properties: ['display'],
    values: ['inline-block']
  },
  'css-grid': { unimplemented: true },
  rem: {
    properties: [''],
    values: ['rem']
  },
  ttf: { unimplemented: true },
  'pointer-events': { properties: ['pointer-events'] },
  'css-regions': { unimplemented: true },
  'css-counters': {
    properties: [
      'counter-reset',
      'counter-increment'
    ]
  },
  'css-resize': { properties: ['resize'] },
  'css-repeating-gradients': {
    properties: [''],
    values: [
      'repeating-linear-gradient',
      'repeating-radial-gradient'
    ]
  },
  'word-break': { properties: ['word-break'] },
  'viewport-units': {
    properties: [''],
    values: [
      'vw',
      'vh',
      'vmin',
      'vmax'
    ]
  },
  outline: {
    properties: [
      'outline',
      'outline-style',
      'outline-width',
      'outline-color'
    ]
  },
  'css3-cursors': {
    properties: ['cursor'],
    values: [
      'none',
      'context-menu',
      'cell',
      'vertical-text',
      'alias',
      'copy',
      'no-drop',
      'not-allowed',
      'nesw-resize',
      'nwse-resize',
      'col-resize',
      'row-resize',
      'all-scroll'
    ]
  },
  'css-variables': { unimplemented: true },
  'css-backgroundblendmode': { properties: ['background-blend-mode'] },
  'css-mixblendmode': { properties: ['mix-blend-mode'] },
  'will-change': { properties: ['will-change'] },
  'css-shapes': {
    properties: [
      'shape-outside',
      'shape-image-threshold',
      'shape-margin'
    ]
  },
  'kerning-pairs-ligatures': {
    properties: ['text-rendering'],
    values: ['optimizeLegibility']
  },
  'css-image-orientation': { properties: ['image-orientation'] },
  'css-appearance': { properties: ['appearance'] },
  'css-background-offsets': { unimplemented: true },
  'css-touch-action': { properties: ['touch-action'] },
  'css-clip-path': { properties: ['clip-path'] },
  'font-unicode-range': {
    atrules: ['font-face'],
    properties: ['unicode-range']
  },
  'css-font-stretch': { properties: ['font-stretch'] },
  'font-size-adjust': { properties: ['font-size-adjust'] },
  'css-media-resolution': {
    atrules: ['media'],
    params: [
      'min-resolution',
      'max-resolution'
    ]
  },
  'css-image-set': {
    properties: [''],
    values: ['image-set']
  }
}
