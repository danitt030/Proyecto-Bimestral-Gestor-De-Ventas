import { Router } from "express";
import { agregarProducto, listarProductos, listarProductoId, actualizarProducto, eliminarProducto, productosAgotados, productosMasVendidos, buscarProductosPorNombre, productosPorCategoria } from "./productos.controller.js";
import { createProductoValidator, listarProductosValidator, actualizarProductoValidator, eliminarProductoValidator, productosAgotadosValidator, productosMasVendidosValidator, buscarProductosNombreValidator, productosPorCategoriaValidator } from "../middlewares/productos-validators.js";

const router = Router()

router.post("/agregarProducto", createProductoValidator, agregarProducto)

router.get("/ListarProductos", listarProductosValidator, listarProductos)
 
router.get("/listarProductoPorId/:id", listarProductoId)

router.put("/actualizarProducto/:id", actualizarProductoValidator, actualizarProducto)

router.delete("/eliminarProducto/:id", eliminarProductoValidator, eliminarProducto)

router.get("/productosAgotados", productosAgotadosValidator, productosAgotados)

router.get("/productosMasVendidos", productosMasVendidosValidator, productosMasVendidos)

router.get("/buscarProductosPorNombre", buscarProductosNombreValidator, buscarProductosPorNombre)

router.get("/productosPorCategoria/:categoriaId", productosPorCategoriaValidator, productosPorCategoria)

export default router
