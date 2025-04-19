const Operation = require('../models/operation.model');
const { calculate } = require('../utils/calculator');

const format = (value) => parseFloat(value.toFixed(1));

exports.performCalculation = async({ operation, operandA, operandB }, userId) => {
    if (operandA < -1000000 || operandA > 1000000 || (operandB !== undefined && (operandB < -1000000 || operandB > 1000000))) {
        const details = ['Operands must be between -1,000,000 and 1,000,000'];
        const err = new Error('Invalid operation parameters');
        err.status = 400;
        err.details = details;
        throw err;
    }

    const formattedA = format(operandA);
    const formattedB = operandB !== undefined ? format(operandB) : undefined;

    const result = calculate(operation, formattedA, formattedB);

    const newOperation = await Operation.create({
        operation,
        operandA: formattedA,
        operandB: formattedB,
        result,
        userId,
        timestamp: new Date()
    });

    return newOperation;
};