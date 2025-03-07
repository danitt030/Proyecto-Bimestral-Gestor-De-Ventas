import { Router } from "express";
import { getUserById, getUsers, deleteUser, updatePassword, updateUser, updateRole, eliminarCuenta } from "./user.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator, updateRoleValidator, confirmacionEliminarCuentaValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", getUsers);

/**
 * @swagger
 * /deleteUser/{uid}:
 *   delete:
 *     summary: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

/**
 * @swagger
 * /updatePassword/{uid}:
 *   patch:
 *     summary: Update user password
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /updateUser/{uid}:
 *   put:
 *     summary: Update user information
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.put("/updateUser/:uid", updateUserValidator, updateUser);

/**
 * @swagger
 * /updateRole/{uid}:
 *   patch:
 *     summary: Update user role
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Role updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.patch("/updateRole/:uid", updateRoleValidator, updateRole);

/**
 * @swagger
 * /eliminarCuenta/{uid}:
 *   delete:
 *     summary: Delete user account
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Account deleted
 *       404:
 *         description: User not found
 */
router.delete("/eliminarCuenta/:uid", confirmacionEliminarCuentaValidator, eliminarCuenta);

export default router;
