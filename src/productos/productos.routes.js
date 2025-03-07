import { Router } from "express";
import { agregarProducto, listarProductos, listarProductoId, actualizarProducto, eliminarProducto, productosAgotados, productosMasVendidos, buscarProductosPorNombre, productosPorCategoria } from "./productos.controller.js";
import { createProductoValidator, listarProductosValidator, actualizarProductoValidator, eliminarProductoValidator, productosAgotadosValidator, productosMasVendidosValidator, buscarProductosNombreValidator, productosPorCategoriaValidator } from "../middlewares/productos-validators.js";

const router = Router()

/**
 * @swagger
 * /agregarProducto:
 *   post:
 *     summary: Agregar un nuevo producto
 *     parameters:
 *       - in: body
 *         name: producto
 *         description: Datos del producto a agregar
 *         schema:
 *           type: object
 *           required:
 *             - nombre
 *             - precio
 *             - categoria
 *           properties:
 *             nombre:
 *               type: string
 *             precio:
 *               type: number
 *             categoria:
 *               type: string
 *     responses:
 *       201:
 *         description: Producto agregado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post("/agregarProducto", createProductoValidator, agregarProducto)

/**
 * @swagger
 * /ListarProductos:
 *   get:
 *     summary: Listar todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *       500:
 *         description: Error interno del servidor
 */
router.get("/ListarProductos", listarProductosValidator, listarProductos)
 
/**
 * @swagger
 * /listarProductoPorId/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/listarProductoPorId/:id", listarProductoId)

/**
 * @swagger
 * /actualizarProducto/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *       - in: body
 *         name: producto
 *         description: Datos del producto a actualizar
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             precio:
 *               type: number
 *             categoria:
 *               type: string
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Producto no encontrado
 */
router.put("/actualizarProducto/:id", actualizarProductoValidator, actualizarProducto)

/**
 * @swagger
 * /eliminarProducto/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/eliminarProducto/:id", eliminarProductoValidator, eliminarProducto)

/**
 * @swagger
 * /productosAgotados:
 *   get:
 *     summary: Listar productos agotados
 *     responses:
 *       200:
 *         description: Lista de productos agotados
 *       500:
 *         description: Error interno del servidor
 */
router.get("/productosAgotados", productosAgotadosValidator, productosAgotados)

/**
 * @swagger
 * /productosMasVendidos:
 *   get:
 *     summary: Listar productos más vendidos
 *     responses:
 *       200:
 *         description: Lista de productos más vendidos
 *       500:
 *         description: Error interno del servidor
 */
router.get("/productosMasVendidos", productosMasVendidosValidator, productosMasVendidos)

/**
 * @swagger
 * /buscarProductosPorNombre:
 *   get:
 *     summary: Buscar productos por nombre
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         description: Nombre del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos encontrados
 *       404:
 *         description: Producto no encontrado
 */
router.get("/buscarProductosPorNombre", buscarProductosNombreValidator, buscarProductosPorNombre)

/**
 * @swagger
 * /productosPorCategoria/{categoriaId}:
 *   get:
 *     summary: Listar productos por categoría
 *     parameters:
 *       - in: path
 *         name: categoriaId
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos por categoría
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/productosPorCategoria/:categoriaId", productosPorCategoriaValidator, productosPorCategoria)

export default router
