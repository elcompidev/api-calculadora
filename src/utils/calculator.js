const Decimal = require('decimal.js');

const calculate = (operation, operandA, operandB = null) => {
    const a = new Decimal(operandA);
    const b = operandB !== null ? new Decimal(operandB) : null;

    const format = (value) => parseFloat(value.toNumber().toFixed(1));

    switch (operation) {
        case 'ADDITION':
            return format(a.plus(b));
        case 'SUBTRACTION':
            return format(a.minus(b));
        case 'MULTIPLICATION':
            return format(a.times(b));
        case 'DIVISION':
            if (b.isZero()) throw new Error('Division by zero is not allowed');
            return format(a.div(b));
        case 'POWER':
            return format(a.pow(b));
        case 'SQUARE_ROOT':
            if (a.isNegative()) throw new Error('Cannot calculate square root of negative number');
            return format(a.sqrt());
        default:
            throw new Error('Unsupported operation');
    }
};


module.exports = { calculate };