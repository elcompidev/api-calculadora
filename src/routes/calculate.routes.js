const express = require('express');
const router = express.Router();
const controller = require('../controllers/calculate.controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/calculate:
 *   post:
 *     tags:
 *       - calculate
 *     summary: Realiza una operación matemática
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - operation
 *               - operandA
 *             properties:
 *               operation:
 *                 type: string
 *                 enum: [ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION, POWER, SQUARE_ROOT]
 *               operandA:
 *                 type: number
 *               operandB:
 *                 type: number
 *     responses:
 *       201:
 *         description: Resultado de la operación realizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 operation:
 *                   type: string
 *                 operandA:
 *                   type: number
 *                 operandB:
 *                   type: number
 *                 result:
 *                   type: number
 *                 userId:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Operación inválida.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/', auth, controller.calculate);

module.exports = router;