import { Schema, model } from "mongoose";

const FacturaSchema = new Schema({
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    productos: [{
        idProducto: {
            type: Schema.Types.ObjectId,
            ref: "Producto",
            required: true
        },
        nombreProducto: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        precioProducto: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Factura", FacturaSchema);