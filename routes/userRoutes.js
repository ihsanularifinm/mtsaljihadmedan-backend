const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const validate = require('../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../validators/userValidator');

router.post('/login', validate(loginSchema), loginUser);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API untuk manajemen user (admin)
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login untuk user admin
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: user
 *               password: 0123abcd
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan data user dan token JWT.
 *       401:
 *         description: Username atau password salah.
 */

router.post('/register', validate(registerSchema), registerUser);
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Mendaftarkan user admin baru (hanya untuk development)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - username
 *               - password
 *             properties:
 *               nama:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               nama: User
 *               username: user
 *               password: 0123abcd
 *     responses:
 *       201:
 *         description: User berhasil dibuat.
 *       400:
 *         description: Username sudah digunakan atau data tidak valid.
 */

module.exports = router;
