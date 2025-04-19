const { performCalculation } = require('../services/calculate.service');

exports.calculate = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const { operation, operandA, operandB } = req.body;

        const result = await performCalculation({ operation, operandA, operandB }, userId);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};