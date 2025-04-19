const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - auth
 *     summary: Registro de usuario
 *     description: Registra un nuevo usuario con un nombre de usuario, correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: demo
 *               email:
 *                 type: string
 *                 example: demo@gmail.com
 *               password:
 *                 type: string
 *                 example: demo
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "889c7727-15ad-4b46-82f8-1048e92e8192"
 *                     username:
 *                       type: string
 *                       example: demo
 *                     email:
 *                       type: string
 *                       example: demo@gmail.com
 *       400:
 *         description: Error en la solicitud.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login de usuario
 *     description: Permite a los usuarios autenticarse con su nombre de usuario y contraseña para recibir un token de acceso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del usuario.
 *                 example: demo
 *               password:
 *                 type: string
 *                 description: Contraseña asociada al usuario.
 *                 example: demo
 *     responses:
 *       200:
 *         description: Token de acceso generado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: El token JWT generado para el acceso.
 *                   example: "eyJhbGciOiJzI.DwMTIzfQ.KXACYaI-cnAHOhlYsxfilo5J4q4H5nzbiViyEWFOc"
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error interno del servidor.
 */

router.post('/login', authController.login);

module.exports = router;