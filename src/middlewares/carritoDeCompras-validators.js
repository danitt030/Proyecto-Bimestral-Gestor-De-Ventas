import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const agregarProductoAlCarritoValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    body("idProducto").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("cantidad").isInt().withMessage("El campo cantidad debe ser un número entero"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const listarProductoCarritoValidator = [
    validateJWT,
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const eliminarProductoDelCarritoValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    param("idProducto").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]
