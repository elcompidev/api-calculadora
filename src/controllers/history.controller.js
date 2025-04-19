const historyService = require('../services/history.service');

exports.getHistory = async(req, res, next) => {
    try {
        const result = await historyService.getHistory(req.user.id, req.query);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.getById = async(req, res, next) => {
    try {
        const operation = await historyService.getById(req.params.id, req.user.id);
        res.json(operation);
    } catch (err) {
        next(err);
    }
};

exports.deleteById = async(req, res, next) => {
    try {
        await historyService.deleteById(req.params.id, req.user.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};