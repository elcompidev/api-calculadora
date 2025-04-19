const express = require('express');
const router = express.Router();
const controller = require('../controllers/history.controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/history:
 *   get:
 *     tags:
 *       - history
 *     summary: Obtener historial de operaciones realizadas por el usuario
 *     security:
 *       - BearerAuth: []
 *     description: Retorna una lista paginada y filtrable de las operaciones matemáticas realizadas, según los criterios proporcionados.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "Número de página (por defecto: 1)."
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "Cantidad de resultados por página (por defecto: 10)."
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: "Campo por el cual ordenar (por ejemplo: timestamp, operation)."
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: "Orden de clasificación: ascendente o descendente."
 *       - in: query
 *         name: operation
 *         schema:
 *           type: string
 *           enum: [ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION, POWER, SQUARE_ROOT]
 *         description: Filtrar por tipo de operación.
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha y hora inicial del rango (ISO 8601).
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha y hora final del rango (ISO 8601).
 *     responses:
 *       200:
 *         description: Lista paginada de operaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total de operaciones encontradas.
 *                 page:
 *                   type: integer
 *                   description: Página actual.
 *                 size:
 *                   type: integer
 *                   description: Cantidad de registros por página.
 *                 records:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       operation:
 *                         type: string
 *                         enum: [ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION, POWER, SQUARE_ROOT]
 *                       operandA:
 *                         type: string
 *                       operandB:
 *                         type: string
 *                       result:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                       userId:
 *                         type: string
 *             example:
 *               total: 12
 *               page: 1
 *               size: 10
 *               records:
 *                 - id: "1066a7d3-76f3-40f8-a9df-d05b292fe782"
 *                   operation: "ADDITION"
 *                   operandA: "5.1"
 *                   operandB: "2.3"
 *                   result: "7.4"
 *                   timestamp: "2025-04-18T18:59:37.000Z"
 *                   userId: "c9ddd4ea-a397-4131-8aa0-105346cfb0b4"
 */
router.get('/', auth, controller.getHistory);

/**
 * @swagger
 * /api/history/{id}:
 *   get:
 *     tags:
 *       - history
 *     summary: Obtener el detalle de una operación histórica por su ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID único de la operación para obtener su detalle.
 *     responses:
 *       200:
 *         description: Detalle de la operación histórica solicitada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Identificador único de la operación.
 *                 operation:
 *                   type: string
 *                   description: Tipo de operación realizada (ADDITION, SUBTRACTION, etc.).
 *                 operandA:
 *                   type: string
 *                   description: Primer operando de la operación, en formato decimal.
 *                 operandB:
 *                   type: string
 *                   description: Segundo operando de la operación, en formato decimal.
 *                 result:
 *                   type: string
 *                   description: Resultado de la operación, en formato decimal.
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: Marca de tiempo de cuando la operación fue realizada.
 *                 userId:
 *                   type: string
 *                   description: ID del usuario que realizó la operación.
 *       400:
 *         description: Parámetros inválidos.
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontró una operación con el ID proporcionado.
 *       500:
 *         description: Error interno en el servidor.
 */

router.get('/:id', auth, controller.getById);

/**
 * @swagger
 * /api/history/{id}:
 *   delete:
 *     tags:
 *       - history
 *     summary: Eliminar una operación histórica por su ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID único de la operación histórica que se desea eliminar.
 *     responses:
 *       204:
 *         description: La operación fue eliminada con éxito.
 *       400:
 *         description: Parámetros inválidos, el ID debe ser un string válido.
 *       401:
 *         description: No autorizado, se requiere autenticación mediante token Bearer.
 *       404:
 *         description: No se encontró una operación con el ID proporcionado.
 *       500:
 *         description: Error interno en el servidor.
 */

router.delete('/:id', auth, controller.deleteById);

module.exports = router;