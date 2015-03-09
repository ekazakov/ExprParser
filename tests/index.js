var evalExpr = require('../src/index').evalExpr;
var parse = require('../src/index').parse;
var operations = require('../src/index').operations;

var utils = require('../src/utils');

describe('Tests', function () {
    describe('utils', function () {
        it('isOpHigher', function () {
            expect(utils.isOpHigher('*', '-')).to.be.true;
            expect(utils.isOpHigher('/', '+')).to.be.true;
            expect(utils.isOpHigher('/', '*')).to.be.false;
            expect(utils.isOpHigher('+', '+')).to.be.false;
        });
    });

    describe('parse', function () {
        function _parse (expr) {
            return parse(expr).join(' ');
        }

        it('work', function () {
            expect(_parse('1+1')).to.equal('1 1 +');
            expect(_parse('0')).to.equal('0');
            expect(_parse('2*2')).to.equal('2 2 *');
            expect(_parse('2+4/2*2-5')).to.equal('2 4 2 2 * / 5 - +');
            expect(_parse('1+2-1')).to.equal('1 2 1 - +');
        });
    });

    describe('evalExpr', function () {
        it('Parse addition', function () {
            expect(evalExpr('1+1')).to.be.equal(2);
            expect(evalExpr('2+1')).to.be.equal(3);
            expect(evalExpr('0+0')).to.be.equal(0);

            expect(evalExpr('1+2-1')).to.be.equal(2);
            expect(evalExpr('2+4/2*2-5')).to.be.equal(-2);
        });

        it.skip('Parse substraction', function () {
            expect(evalExpr('1-1')).to.be.equal(0);
            expect(evalExpr('2-1')).to.be.equal(1);
            expect(evalExpr('0-0')).to.be.equal(0);
        });
    });
});
