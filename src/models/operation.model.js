const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Operation = sequelize.define('Operation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    operation: {
        type: DataTypes.ENUM('ADDITION', 'SUBTRACTION', 'MULTIPLICATION', 'DIVISION', 'POWER', 'SQUARE_ROOT'),
        allowNull: false,
    },
    operandA: {
        type: DataTypes.DECIMAL(20, 1),
        allowNull: false,
    },
    operandB: {
        type: DataTypes.DECIMAL(20, 1),
        allowNull: true,
    },
    result: {
        type: DataTypes.DECIMAL(20, 1),
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

User.hasMany(Operation, { foreignKey: 'userId' });
Operation.belongsTo(User, { foreignKey: 'userId' });

module.exports = Operation;