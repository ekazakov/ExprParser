var _ = require('lodash');

module.exports = {
    isNum: function isNum (token) {
        return _.isNumber(Number(token)) && !_.isNaN(Number(token));
    },

    isOp: function isOp (token) {
        return ['+', '-', '*', '/'].indexOf(token) != -1;
    },

    isOpHigher: function isOpHigher (op1, op2) {
        var ops = {'+': 0, '-': 0, '*': 1, '/': 1};

        return ops[op1] > ops[op2];
    },
};
