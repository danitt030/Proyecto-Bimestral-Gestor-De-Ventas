import { Router } from "express";
import { agregarProductoCarrito, listarProductosCarrito, eliminarProductoCarrito} from "./CarritoDeCompras.controller.js";
import { agregarProductoAlCarritoValidator, listarProductoCarritoValidator, eliminarProductoDelCarritoValidator } from "../middlewares/carritoDeCompras-validators.js";

const router = Router();

/**
 * @swagger
 * /agregarProducto:
 *   post:
 *     summary: Agrega un producto al carrito
 *     parameters:
 *       - in: body
 *         name: producto
 *         description: Producto a agregar al carrito
 *         schema:
 *           type: object
 *           required:
 *             - idProducto
 *             - cantidad
 *           properties:
 *             idProducto:
 *               type: string
 *             cantidad:
 *               type: integer
 *     responses:
 *       200:
 *         description: Producto agregado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post("/agregarProducto", agregarProductoAlCarritoValidator, agregarProductoCarrito);

/**
 * @swagger
 * /listarCarrito:
 *   get:
 *     summary: Lista los productos en el carrito
 *     responses:
 *       200:
 *         description: Lista de productos en el carrito
 *       400:
 *         description: Error en la validación de los datos
 */
router.get("/listarCarrito", listarProductoCarritoValidator, listarProductosCarrito);

/**
 * @swagger
 * /eliminarProducto/{idProducto}:
 *   delete:
 *     summary: Elimina un producto del carrito
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/eliminarProducto/:idProducto", eliminarProductoDelCarritoValidator, eliminarProductoCarrito);

export default router;