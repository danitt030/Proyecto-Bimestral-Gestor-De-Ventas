import { Router } from "express";
import { procesarCompra, editarFactura, obtenerFacturasPorUsuario } from "./factura.controller.js";
import { procesarCompraValidator, editarFacturaValidator, obtenerFacturasPorUsuarioValidator } from "../middlewares/factura-validators.js";

const router = Router();

/**
 * @swagger
 * /procesarCompra:
 *   post:
 *     summary: Procesar una compra
 *     tags: [Factura]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // ...detallar los parámetros esperados...
 *     responses:
 *       200:
 *         description: Compra procesada exitosamente
 *       400:
 *         description: Error en la validación de la compra
 */
router.post("/procesarCompra", procesarCompraValidator, procesarCompra);

/**
 * @swagger
 * /editarFactura/{idFactura}:
 *   put:
 *     summary: Editar una factura existente
 *     tags: [Factura]
 *     parameters:
 *       - in: path
 *         name: idFactura
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // ...detallar los parámetros esperados...
 *     responses:
 *       200:
 *         description: Factura editada exitosamente
 *       400:
 *         description: Error en la validación de la factura
 *       404:
 *         description: Factura no encontrada
 */
router.put("/editarFactura/:idFactura", editarFacturaValidator, editarFactura);

/**
 * @swagger
 * /obtenerFacturasPorUsuario:
 *   get:
 *     summary: Obtener facturas por usuario
 *     tags: [Factura]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario para obtener sus facturas
 *     responses:
 *       200:
 *         description: Lista de facturas obtenida exitosamente
 *       400:
 *         description: Error en la validación del usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/obtenerFacturasPorUsuario", obtenerFacturasPorUsuarioValidator, obtenerFacturasPorUsuario);

export default router;