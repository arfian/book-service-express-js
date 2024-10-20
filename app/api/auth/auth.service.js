const authRepository = require("../../config/memory/auth.memory");
const AppError = require("../../config/error.config");
const res = require("../../config/success.config");
const { signUser, guardIsOwner, extractUserId } = require("../../config/authorization.config");

/**
 * @openapi
 * /api/auth/{userId}:
 *   get:
 *     description: Get User ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: userId
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: user data
 */
const readById = async (id, userId) => {
  const current = await authRepository.selectById(id);
  if (!current) throw new AppError(`User with id: ${id} not found `, "NOT_FOUND", "credentials.service.readById");
  guardIsOwner(userId, current, "credentials.service.readById");
  return res.successRes(current);
};

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     description: Register User
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: token register
 */
const register = async (user) => {
  await create(user);
  const userData = getUserToken(user);
  return res.successRes(userData);
};

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     description: Login User
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: token login
 */
const login = async (credentials) => {
  const user = await readByEmail(credentials.email);
  if (user && user.password === credentials.password) {
    const userData = getUserToken(user);
    return res.successRes(userData);
  }
  throw new AppError("Invalid credentials", "FORBIDDEN", "credentials.service.login");
};

const refresh = async (oldToken) => {
  const userId = extractUserId(oldToken);
  const user = await readById(userId);
  const userData = getUserToken(user);
  return res.successRes(userData);
};

/**
 * @openapi
 * /api/auth/{userId}:
 *   delete:
 *     description: Get User ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: userId
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: user data
 */
const deleteById = async (id, userId) => {
  const current = await authRepository.selectById(id);
  if (!current) return;
  guardIsOwner(userId, current, "credentials.service.deleteById");
  const userData = await authRepository.deleteById(id);
  return res.successRes(userData);
};

const create = async (user) => {
  const current = await readByEmail(user.email);
  if (current) throw new AppError("User already exist", "CONFLICT", "credentials.service.create");
  user.id = new Date().getTime();
  user.createdAt = new Date().toISOString();
  return await authRepository.insert(user);
};

const readByEmail = async (email) => {
  const users = await authRepository.selectByKeyValue("email", email);
  return users[0] || undefined;
};

const getUserToken = (user) => {
  return {
    accessToken: signUser(user.id),
    id: user.id,
  };
};

const authService = {
  register,
  refresh,
  login,
  readById,
  deleteById,
};

module.exports = authService;