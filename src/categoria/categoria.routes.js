import { Router } from "express";
import { crearCategoria, listarCategorias, editarCategoria, eliminarCategoria } from "./categoria.controller.js";
import { createCategoriaValidator, editarCategoriaValidator, eliminarCategoriaValidator  } from "../middlewares/categoria-validators.js";

const router = Router()

router.post("/crearCategoria", createCategoriaValidator, crearCategoria)

router.get("/listarCategorias", listarCategorias)

router.put("/editarCategoria/:uid", editarCategoriaValidator, editarCategoria)

router.delete("/eliminarCategoria/:uid", eliminarCategoriaValidator, eliminarCategoria)

export default router