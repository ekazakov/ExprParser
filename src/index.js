var _ = require('lodash');
var isNum = require('./utils').isNum;
var isOp = require('./utils').isOp;
var isOpHigher = require('./utils').isOpHigher;

var operations = {
    '+': function (a, b) { return a + b; },
    '-': function (a, b) { return a - b; },
    '*': function (a, b) { return a * b; },
    '/': function (a, b) { return a / b; }
};








function tokenIterator (expr) {
    var i = 0;

    return {
        next: function () {
            if (i < expr.length) {
                return expr[i++];
            }

            return null;
        }
    };
}

function firstOpIndex (rpn) {
    var i = 0;

    while (i < rpn.length) {
        if (isOp(rpn[i])) return i;
        i++;
    }

    return -1;
}

function evalExpr (expr) {
    var rpn = parse(expr);

    while (rpn.length != 1) {
        var opIndex = firstOpIndex(rpn);

        var a = rpn[opIndex - 2];
        var b = rpn[opIndex - 1];

        var op = operations[rpn[opIndex]];

        rpn.splice(opIndex - 2, 3, op(a, b));
    }

    return rpn[0];
}

function parse (expr) {
    var iterator = tokenIterator(expr);
    var token;
    var output = [];
    var operators = [];

    while((token = iterator.next()) != null) {
        iter(token);
    }

    return output.concat(operators.reverse());

    function iter (token) {
        if (isNum(token)) {
            output.push(Number(token));
            return;
        }

        if (isOp(token)) {
            while (!_.isEmpty(operators) && isOpHigher(_.last(operators), token)) {
                output.push(operators.pop());
            }

            operators.push(token);
        }
    }
}

module.exports = {
    evalExpr: evalExpr,
    operations: operations,
    parse: parse
};
