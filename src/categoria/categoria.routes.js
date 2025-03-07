import { Router } from "express";
import { crearCategoria, listarCategorias, editarCategoria, eliminarCategoria } from "./categoria.controller.js";
import { createCategoriaValidator, editarCategoriaValidator, eliminarCategoriaValidator  } from "../middlewares/categoria-validators.js";

const router = Router()

/**
 * @swagger
 * /crearCategoria:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categoría]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la categoría
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post("/crearCategoria", createCategoriaValidator, crearCategoria)

/**
 * @swagger
 * /listarCategorias:
 *   get:
 *     summary: Listar todas las categorías
 *     tags: [Categoría]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombre:
 *                     type: string
 */
router.get("/listarCategorias", listarCategorias)

/**
 * @swagger
 * /editarCategoria/{uid}:
 *   put:
 *     summary: Editar una categoría existente
 *     tags: [Categoría]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Categoría editada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Categoría no encontrada
 */
router.put("/editarCategoria/:uid", editarCategoriaValidator, editarCategoria)

/**
 * @swagger
 * /eliminarCategoria/{uid}:
 *   delete:
 *     summary: Eliminar una categoría existente
 *     tags: [Categoría]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/eliminarCategoria/:uid", eliminarCategoriaValidator, eliminarCategoria)

export default router