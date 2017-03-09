'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultRaw = {
    colon: ': ',
    indent: '  ',
    commentLeft: ' ',
    commentRight: ' '
};

var Stringifier = function () {
    function Stringifier(builder) {
        _classCallCheck(this, Stringifier);

        this.builder = builder;
    }

    Stringifier.prototype.stringify = function stringify(node, semicolon) {
        this[node.type](node, semicolon);
    };

    Stringifier.prototype.root = function root(node) {
        this.body(node);
        if (node.raws.after) this.builder(node.raws.after);
    };

    Stringifier.prototype.comment = function comment(node) {
        var left = defaultRaw.commentLeft;
        var right = defaultRaw.commentRight;
        if (this.has(node.raws.left)) left = node.raws.left;

        if (node.raws.inline) {
            if (this.has(node.raws.inlineRight)) {
                right = node.raws.inlineRight;
            } else {
                right = '';
            }
            this.builder('//' + left + node.text + right, node);
        } else {
            if (this.has(node.raws.right)) right = node.raws.right;
            this.builder('/*' + left + node.text + right + '*/', node);
        }
    };

    Stringifier.prototype.decl = function decl(node) {
        var between = node.raws.between || defaultRaw.colon;
        var string = node.prop + between + this.rawValue(node, 'value');

        if (node.important) {
            string += node.raws.important || ' !important';
        }

        this.builder(string, node);
    };

    Stringifier.prototype.rule = function rule(node) {
        this.block(node, this.rawValue(node, 'selector'));
    };

    Stringifier.prototype.atrule = function atrule(node) {
        var name = '@' + node.name;
        var params = node.params ? this.rawValue(node, 'params') : '';

        if (this.has(node.raws.afterName)) {
            name += node.raws.afterName;
        } else if (params) {
            name += ' ';
        }

        this.block(node, name + params);
    };

    Stringifier.prototype.body = function body(node) {
        var indent = node.root().raws.indent || defaultRaw.indent;

        for (var i = 0; i < node.nodes.length; i++) {
            var child = node.nodes[i];
            var before = child.raws.before.replace(/[^\n]*$/, '') + this.indent(node, indent);
            if (child.type === 'comment' && child.raws.before.indexOf('\n') === -1) {
                before = child.raws.before;
            }
            if (before) this.builder(before);
            this.stringify(child);
        }
    };

    Stringifier.prototype.block = function block(node, start) {
        var between = node.raws.sssBetween || '';
        this.builder(start + between, node, 'start');
        if (this.has(node.nodes)) this.body(node);
    };

    Stringifier.prototype.indent = function indent(node, step) {
        var result = '';
        while (node.parent) {
            result += step;
            node = node.parent;
        }
        return result;
    };

    Stringifier.prototype.has = function has(value) {
        return typeof value !== 'undefined';
    };

    Stringifier.prototype.rawValue = function rawValue(node, prop) {
        var value = node[prop];
        var raw = node.raws[prop];
        if (raw && raw.value === value) {
            return raw.sss || raw.raw;
        } else {
            return value;
        }
    };

    return Stringifier;
}();

exports.default = Stringifier;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmaWVyLmVzNiJdLCJuYW1lcyI6WyJkZWZhdWx0UmF3IiwiY29sb24iLCJpbmRlbnQiLCJjb21tZW50TGVmdCIsImNvbW1lbnRSaWdodCIsIlN0cmluZ2lmaWVyIiwiYnVpbGRlciIsInN0cmluZ2lmeSIsIm5vZGUiLCJzZW1pY29sb24iLCJ0eXBlIiwicm9vdCIsImJvZHkiLCJyYXdzIiwiYWZ0ZXIiLCJjb21tZW50IiwibGVmdCIsInJpZ2h0IiwiaGFzIiwiaW5saW5lIiwiaW5saW5lUmlnaHQiLCJ0ZXh0IiwiZGVjbCIsImJldHdlZW4iLCJzdHJpbmciLCJwcm9wIiwicmF3VmFsdWUiLCJpbXBvcnRhbnQiLCJydWxlIiwiYmxvY2siLCJhdHJ1bGUiLCJuYW1lIiwicGFyYW1zIiwiYWZ0ZXJOYW1lIiwiaSIsIm5vZGVzIiwibGVuZ3RoIiwiY2hpbGQiLCJiZWZvcmUiLCJyZXBsYWNlIiwiaW5kZXhPZiIsInN0YXJ0Iiwic3NzQmV0d2VlbiIsInN0ZXAiLCJyZXN1bHQiLCJwYXJlbnQiLCJ2YWx1ZSIsInJhdyIsInNzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsYUFBYTtBQUNmQyxXQUFjLElBREM7QUFFZkMsWUFBYyxJQUZDO0FBR2ZDLGlCQUFjLEdBSEM7QUFJZkMsa0JBQWM7QUFKQyxDQUFuQjs7SUFPcUJDLFc7QUFFakIseUJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsYUFBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0g7OzBCQUVEQyxTLHNCQUFVQyxJLEVBQU1DLFMsRUFBVztBQUN2QixhQUFLRCxLQUFLRSxJQUFWLEVBQWdCRixJQUFoQixFQUFzQkMsU0FBdEI7QUFDSCxLOzswQkFFREUsSSxpQkFBS0gsSSxFQUFNO0FBQ1AsYUFBS0ksSUFBTCxDQUFVSixJQUFWO0FBQ0EsWUFBS0EsS0FBS0ssSUFBTCxDQUFVQyxLQUFmLEVBQXVCLEtBQUtSLE9BQUwsQ0FBYUUsS0FBS0ssSUFBTCxDQUFVQyxLQUF2QjtBQUMxQixL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QkFBT0QsS0FBUDtBQUNIO0FBQ0osSzs7Ozs7a0JBeEdnQnpDLFciLCJmaWxlIjoic3RyaW5naWZpZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWZhdWx0UmF3ID0ge1xuICAgIGNvbG9uOiAgICAgICAgJzogJyxcbiAgICBpbmRlbnQ6ICAgICAgICcgICcsXG4gICAgY29tbWVudExlZnQ6ICAnICcsXG4gICAgY29tbWVudFJpZ2h0OiAnICdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0cmluZ2lmaWVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGJ1aWxkZXIpIHtcbiAgICAgICAgdGhpcy5idWlsZGVyID0gYnVpbGRlcjtcbiAgICB9XG5cbiAgICBzdHJpbmdpZnkobm9kZSwgc2VtaWNvbG9uKSB7XG4gICAgICAgIHRoaXNbbm9kZS50eXBlXShub2RlLCBzZW1pY29sb24pO1xuICAgIH1cblxuICAgIHJvb3Qobm9kZSkge1xuICAgICAgICB0aGlzLmJvZHkobm9kZSk7XG4gICAgICAgIGlmICggbm9kZS5yYXdzLmFmdGVyICkgdGhpcy5idWlsZGVyKG5vZGUucmF3cy5hZnRlcik7XG4gICAgfVxuXG4gICAgY29tbWVudChub2RlKSB7XG4gICAgICAgIGxldCBsZWZ0ICA9IGRlZmF1bHRSYXcuY29tbWVudExlZnQ7XG4gICAgICAgIGxldCByaWdodCA9IGRlZmF1bHRSYXcuY29tbWVudFJpZ2h0O1xuICAgICAgICBpZiAoIHRoaXMuaGFzKG5vZGUucmF3cy5sZWZ0KSApIGxlZnQgPSBub2RlLnJhd3MubGVmdDtcblxuICAgICAgICBpZiAoIG5vZGUucmF3cy5pbmxpbmUgKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMuaGFzKG5vZGUucmF3cy5pbmxpbmVSaWdodCkgKSB7XG4gICAgICAgICAgICAgICAgcmlnaHQgPSBub2RlLnJhd3MuaW5saW5lUmlnaHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJpZ2h0ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJ1aWxkZXIoJy8vJyArIGxlZnQgKyBub2RlLnRleHQgKyByaWdodCwgbm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMuaGFzKG5vZGUucmF3cy5yaWdodCkgKSByaWdodCA9IG5vZGUucmF3cy5yaWdodDtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRlcignLyonICsgbGVmdCArIG5vZGUudGV4dCArIHJpZ2h0ICsgJyovJywgbm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWNsKG5vZGUpIHtcbiAgICAgICAgbGV0IGJldHdlZW4gPSBub2RlLnJhd3MuYmV0d2VlbiB8fCBkZWZhdWx0UmF3LmNvbG9uO1xuICAgICAgICBsZXQgc3RyaW5nICA9IG5vZGUucHJvcCArIGJldHdlZW4gKyB0aGlzLnJhd1ZhbHVlKG5vZGUsICd2YWx1ZScpO1xuXG4gICAgICAgIGlmICggbm9kZS5pbXBvcnRhbnQgKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gbm9kZS5yYXdzLmltcG9ydGFudCB8fCAnICFpbXBvcnRhbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idWlsZGVyKHN0cmluZywgbm9kZSk7XG4gICAgfVxuXG4gICAgcnVsZShub2RlKSB7XG4gICAgICAgIHRoaXMuYmxvY2sobm9kZSwgdGhpcy5yYXdWYWx1ZShub2RlLCAnc2VsZWN0b3InKSk7XG4gICAgfVxuXG4gICAgYXRydWxlKG5vZGUpIHtcbiAgICAgICAgbGV0IG5hbWUgICA9ICdAJyArIG5vZGUubmFtZTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5vZGUucGFyYW1zID8gdGhpcy5yYXdWYWx1ZShub2RlLCAncGFyYW1zJykgOiAnJztcblxuICAgICAgICBpZiAoIHRoaXMuaGFzKG5vZGUucmF3cy5hZnRlck5hbWUpICkge1xuICAgICAgICAgICAgbmFtZSArPSBub2RlLnJhd3MuYWZ0ZXJOYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKCBwYXJhbXMgKSB7XG4gICAgICAgICAgICBuYW1lICs9ICcgJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYmxvY2sobm9kZSwgbmFtZSArIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgYm9keShub2RlKSB7XG4gICAgICAgIGxldCBpbmRlbnQgPSBub2RlLnJvb3QoKS5yYXdzLmluZGVudCB8fCBkZWZhdWx0UmF3LmluZGVudDtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBub2RlLm5vZGVzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgbGV0IGNoaWxkICA9IG5vZGUubm9kZXNbaV07XG4gICAgICAgICAgICBsZXQgYmVmb3JlID0gY2hpbGQucmF3cy5iZWZvcmUucmVwbGFjZSgvW15cXG5dKiQvLCAnJykgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZW50KG5vZGUsIGluZGVudCk7XG4gICAgICAgICAgICBpZiAoIGNoaWxkLnR5cGUgPT09ICdjb21tZW50JyAmJlxuICAgICAgICAgICAgICAgICBjaGlsZC5yYXdzLmJlZm9yZS5pbmRleE9mKCdcXG4nKSA9PT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgYmVmb3JlID0gY2hpbGQucmF3cy5iZWZvcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIGJlZm9yZSApIHRoaXMuYnVpbGRlcihiZWZvcmUpO1xuICAgICAgICAgICAgdGhpcy5zdHJpbmdpZnkoY2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmxvY2sobm9kZSwgc3RhcnQpIHtcbiAgICAgICAgbGV0IGJldHdlZW4gPSBub2RlLnJhd3Muc3NzQmV0d2VlbiB8fCAnJztcbiAgICAgICAgdGhpcy5idWlsZGVyKHN0YXJ0ICsgYmV0d2Vlbiwgbm9kZSwgJ3N0YXJ0Jyk7XG4gICAgICAgIGlmICggdGhpcy5oYXMobm9kZS5ub2RlcykgKSB0aGlzLmJvZHkobm9kZSk7XG4gICAgfVxuXG4gICAgaW5kZW50KG5vZGUsIHN0ZXApIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICB3aGlsZSAoIG5vZGUucGFyZW50ICkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHN0ZXA7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBoYXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgcmF3VmFsdWUobm9kZSwgcHJvcCkge1xuICAgICAgICBsZXQgdmFsdWUgPSBub2RlW3Byb3BdO1xuICAgICAgICBsZXQgcmF3ICAgPSBub2RlLnJhd3NbcHJvcF07XG4gICAgICAgIGlmICggcmF3ICYmIHJhdy52YWx1ZSA9PT0gdmFsdWUgKSB7XG4gICAgICAgICAgICByZXR1cm4gcmF3LnNzcyB8fCByYXcucmF3O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=