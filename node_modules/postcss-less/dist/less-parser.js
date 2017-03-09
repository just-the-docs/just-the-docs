'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _comment = require('postcss/lib/comment');

var _comment2 = _interopRequireDefault(_comment);

var _parser = require('postcss/lib/parser');

var _parser2 = _interopRequireDefault(_parser);

var _rule = require('./rule');

var _rule2 = _interopRequireDefault(_rule);

var _findExtendRule = require('./find-extend-rule');

var _findExtendRule2 = _interopRequireDefault(_findExtendRule);

var _isMixinToken = require('./is-mixin-token');

var _isMixinToken2 = _interopRequireDefault(_isMixinToken);

var _lessTokenize = require('./less-tokenize');

var _lessTokenize2 = _interopRequireDefault(_lessTokenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var blockCommentEndPattern = /\*\/$/;

var LessParser = function (_Parser) {
    _inherits(LessParser, _Parser);

    function LessParser() {
        _classCallCheck(this, LessParser);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LessParser).apply(this, arguments));
    }

    _createClass(LessParser, [{
        key: 'tokenize',
        value: function tokenize() {
            this.tokens = (0, _lessTokenize2.default)(this.input);
        }
    }, {
        key: 'rule',
        value: function rule(tokens) {
            tokens.pop();

            var node = new _rule2.default();

            this.init(node, tokens[0][2], tokens[0][3]);
            node.raws.between = this.spacesFromEnd(tokens);
            this.raw(node, 'selector', tokens);
            this.current = node;
        }
    }, {
        key: 'comment',
        value: function comment(token) {
            var node = new _comment2.default();
            var content = token[1];
            var text = content.slice(2).replace(blockCommentEndPattern, '');

            this.init(node, token[2], token[3]);
            node.source.end = {
                line: token[4],
                column: token[5]
            };

            node.raws.content = content;
            node.raws.begin = content[0] + content[1];
            node.inline = token[6] === 'inline';
            node.block = !node.inline;

            if (/^\s*$/.test(text)) {
                node.text = '';
                node.raws.left = text;
                node.raws.right = '';
            } else {
                var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);

                node.text = match[2];

                // Add extra spaces to generate a comment in a common style /*[space][text][space]*/
                node.raws.left = match[1] || ' ';
                node.raws.right = match[3] || ' ';
            }
        }

        /**
         * @description Create a Rule node
         * @param options {{start: number, params: Array}}
         */

    }, {
        key: 'createRule',
        value: function createRule(options) {
            this.rule(this.tokens.slice(options.start, this.pos + 1));

            /**
             * By default in PostCSS `Rule.params` is `undefined`. There are rules to save the compability with PostCSS:
             *  - Don't set empty params for Rule node.
             *  - Set params fro Rule node only if it can be a mixin or &:extend rule.
             */
            if (options.params[0] && (options.isMixin || options.isExtendRule)) {
                this.raw(this.current, 'params', options.params);
            }
        }

        /**
         * @description Create a Declaration
         * @param options {{start: number}}
         */

    }, {
        key: 'createDeclaration',
        value: function createDeclaration(options) {
            this.decl(this.tokens.slice(options.start, this.pos + 1));
        }

        /**
         * @description Create a Rule block and close it, because this mixin doesn't have a body
         * @param options
         */

    }, {
        key: 'ruleWithoutBody',
        value: function ruleWithoutBody(options) {
            this.createRule(options);

            /**
             * @description Mark mixin without body.
             * @type {boolean}
             */
            this.current.ruleWithoutBody = true;

            // remove `nodes` property from rules without body
            // eslint-disable-next-line
            delete this.current.nodes;
            this.current.extendRule = this.current.selector.indexOf('&:extend') >= 0;
            this.current.important = this.current.selector.indexOf('!important') >= 0;

            this.pos--;

            this.end(this.tokens[this.pos]);
        }

        /**
         * @description
         * @param options
         * @returns {boolean}
         */

    }, {
        key: 'processEndOfRule',
        value: function processEndOfRule(options) {
            var start = options.start;


            if (options.isExtendRule || options.isMixin) {
                this.ruleWithoutBody(options);
                return true;
            }

            if (options.colon) {
                if (options.isEndOfBlock) {
                    while (this.pos > start) {
                        var token = this.tokens[this.pos][0];

                        if (token !== 'space' && token !== 'comment') {
                            break;
                        }

                        this.pos -= 1;
                    }
                }

                this.createDeclaration({ start: start });
                return true;
            }

            return false;
        }

        /* eslint-disable max-statements, complexity */

    }, {
        key: 'word',
        value: function word() {
            var end = false;
            var colon = false;
            var bracket = null;
            var brackets = 0;
            var start = this.pos;
            var isMixin = (0, _isMixinToken2.default)(this.tokens[start]);
            var isExtendRule = Boolean((0, _findExtendRule2.default)(this.tokens, start));
            var params = [];

            this.pos += 1;

            while (this.pos < this.tokens.length) {
                var token = this.tokens[this.pos];
                var type = token[0];

                if (type === '(') {
                    if (!bracket) {
                        bracket = token;
                    }

                    brackets += 1;
                } else if (brackets === 0) {
                    if (type === ';') {
                        var foundEndOfRule = this.processEndOfRule({
                            start: start,
                            params: params,
                            colon: colon,
                            isMixin: isMixin,
                            isExtendRule: isExtendRule
                        });

                        if (foundEndOfRule) {
                            return;
                        }

                        break;
                    } else if (type === '{') {
                        this.createRule({ start: start, params: params, isMixin: isMixin });
                        return;
                    } else if (type === '}') {
                        this.pos -= 1;
                        end = true;
                        break;
                    } else if (type === ':') {
                        colon = true;
                    }
                } else if (type === ')') {
                    brackets -= 1;
                    if (brackets === 0) {
                        bracket = null;
                    }
                }

                if (brackets || type === 'brackets' || params[0]) {
                    params.push(token);
                }

                this.pos += 1;
            }

            if (this.pos === this.tokens.length) {
                this.pos -= 1;
                end = true;
            }

            if (brackets > 0) {
                this.unclosedBracket(bracket);
            }

            if (end) {
                var _foundEndOfRule = this.processEndOfRule({
                    start: start,
                    params: params,
                    colon: colon,
                    isMixin: isMixin,
                    isExtendRule: isExtendRule,
                    isEndOfBlock: true
                });

                if (_foundEndOfRule) {
                    return;
                }
            }

            this.unknownWord(start);
        }

        /* eslint-enable max-statements */

    }, {
        key: 'loop',
        value: function loop() {
            while (this.pos < this.tokens.length) {
                var token = this.tokens[this.pos];

                switch (token[0]) {
                    case 'word':
                    case ':':
                        this.word();
                        break;

                    case '}':
                        this.end(token);
                        break;

                    case 'comment':
                        this.comment(token);
                        break;

                    case 'at-word':
                        this.atrule(token);
                        break;

                    case '{':
                        this.emptyRule(token);
                        break;

                    case ';':
                        {
                            var lastNode = this.current && this.current.last;

                            // mark semicolon, but don't save it
                            if (lastNode && lastNode.ruleWithoutBody) {
                                lastNode.raws.semicolon = true;
                            } else {
                                this.spaces += token[1];
                            }

                            break;
                        }
                    default:
                        this.spaces += token[1];
                        break;
                }

                this.pos += 1;
            }

            this.endFile();
        }

        /* eslint-enable complexity */

    }]);

    return LessParser;
}(_parser2.default);

exports.default = LessParser;
module.exports = exports['default'];