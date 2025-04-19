const Operation = require('../models/operation.model');
const { Op } = require('sequelize');

exports.getHistory = async(userId, query) => {
    const {
        page = 1,
            size = 10,
            sort = 'timestamp',
            order = 'desc',
            operation,
            from,
            to
    } = query;

    const where = { userId };

    if (operation) {
        where.operation = operation;
    }

    if (from || to) {
        where.timestamp = {};
        if (from) where.timestamp[Op.gte] = new Date(from);
        if (to) where.timestamp[Op.lte] = new Date(to);
    }

    const result = await Operation.findAndCountAll({
        where,
        order: [
            [sort, order.toUpperCase()]
        ],
        offset: (page - 1) * size,
        limit: parseInt(size),
    });

    return {
        total: result.count,
        page: parseInt(page),
        size: parseInt(size),
        records: result.rows
    };
};

exports.getById = async(id, userId) => {
    const op = await Operation.findOne({ where: { id, userId } });
    if (!op) {
        const err = new Error('Operation not found');
        err.status = 404;
        throw err;
    }
    return op;
};

exports.deleteById = async(id, userId) => {
    const deleted = await Operation.destroy({ where: { id, userId } });
    if (!deleted) {
        const err = new Error('Operation not found');
        err.status = 404;
        throw err;
    }
};