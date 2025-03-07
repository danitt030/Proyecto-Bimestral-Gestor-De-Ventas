import Factura from './factura.model.js';
import CarritoDeCompras from '../carritoDeCompras/carritoDeCompras.model.js';
import Producto from '../productos/productos.model.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const procesarCompra = async (req, res) => {
    try {
        const { usuario } = req;

        const carrito = await CarritoDeCompras.findOne({ idUsuario: usuario._id }).populate("productos.idProducto");

        if (!carrito || carrito.productos.length === 0) {
            return res.status(400).json({
                success: false,
                message: "El carrito de compras está vacío"
            });
        };

        const productosFactura = carrito.productos.map(producto => ({
            idProducto: producto.idProducto._id,
            nombreProducto: producto.idProducto.nombreProducto,
            cantidad: producto.cantidad,
            precioProducto: producto.precioProducto
        }))

        const factura = new Factura({
            idUsuario: usuario._id,
            productos: productosFactura,
            total: carrito.cantidadTotal
        })

        await factura.save();

        let totalProductosVendidos = 0;
        for (const producto of carrito.productos) {
            const productoDB = await Producto.findById(producto.idProducto._id);
            if (productoDB) {
                productoDB.stock -= producto.cantidad;
                productoDB.vendidos += producto.cantidad;
                await productoDB.save();
                totalProductosVendidos += producto.cantidad;
            }
        }

        carrito.productos = [];
        carrito.cantidadTotal = 0;
        await carrito.save();

        const facturasDir = path.resolve('../../public/uploads/Facturas');
        const pdfPath = path.join(facturasDir, `factura_${factura._id}.pdf`);

        await generarFacturaPDF(factura, pdfPath);

        return res.status(200).json({
            success: true,
            message: "Compra procesada exitosamente",
            factura,
            totalProductosVendidos,
            pdfPath
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al procesar la compra",
            error: err.message
        });
    };
}

export const editarFactura = async (req, res) => {
    try {
        const { idFactura } = req.params;
        const { productos } = req.body;

        const factura = await Factura.findById(idFactura);
        if (!factura) {
            return res.status(404).json({
                success: false,
                message: "Factura no encontrada"
            });
        };

        if (!Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({
                success: false,
                message: "La lista de productos es inválida o está vacía"
            });
        };

        for (let producto of factura.productos) {
            let productoDB = await Producto.findById(producto.idProducto);
            if (productoDB) {
                productoDB.stock += producto.cantidad; 
                productoDB.vendidos -= producto.cantidad; 
                await productoDB.save();
            }
        }

        factura.productos = productos.map(producto => {
            if (!producto.idProducto || !producto.cantidad || !producto.precioProducto || !producto.nombreProducto) {
                throw new Error("Todos los campos de producto son requeridos");
            }
            return {
                idProducto: producto.idProducto,
                cantidad: producto.cantidad,
                precioProducto: producto.precioProducto,
                nombreProducto: producto.nombreProducto
            }
        })

        factura.total = factura.productos.reduce((total, producto) => total + producto.precioProducto * producto.cantidad, 0);

        await factura.save();

        for (let producto of factura.productos) {
            let productoDB = await Producto.findById(producto.idProducto);
            if (productoDB) {
                productoDB.stock -= producto.cantidad; 
                productoDB.vendidos += producto.cantidad; 
                await productoDB.save();
            }
        }

        const pdfPath = await generarFacturaPDF(factura);

        return res.status(200).json({
            success: true,
            message: "Factura actualizada exitosamente",
            factura,
            pdfUrl: pdfPath 
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al editar la factura",
            error: err.message
        });
    }
}

export const obtenerFacturasPorUsuario = async (req, res) => {
    try {
        const { usuario } = req; 

        const facturas = await Factura.find({ idUsuario: usuario._id }).populate("productos.idProducto");

        if (!facturas || facturas.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron facturas para este usuario"
            });
        }

        return res.status(200).json({
            success: true,
            facturas
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las facturas del usuario",
            error: err.message
        });
    }
}

const generarFacturaPDF = async (factura) => {
    return new Promise((resolve, reject) => {
        try {
            const facturasDir = path.join(process.cwd(), 'public/uploads/Facturas');

            const filePath = path.join(facturasDir, `factura_${factura._id}.pdf`);
            const doc = new PDFDocument({
                margins: { top: 10, left: 10, right: 10, bottom: 10 },
                width: 200, 
                height: 350 + factura.productos.length * 15 
            });

            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            doc.font('Courier-Bold').fontSize(12).text('SUPERMERCADO EL REMONTADAS', { align: 'center' }); 
            doc.fontSize(10).text('""', { align: 'center' });
            doc.fontSize(9).text('FACTURA', { align: 'center' });
            doc.moveDown();

            factura.productos.forEach((producto) => {
                const nombre = producto.nombreProducto.toUpperCase().slice(0, 20).padEnd(20, ' ');
                const precio = producto.precioProducto.toFixed(2);
                doc.font('Courier').fontSize(10).text(`${nombre} ${precio} Q`, { align: 'left' });
            });

            doc.moveDown();
            doc.text('--------------------------', { align: 'center' });

            doc.font('Courier-Bold').fontSize(11).text(`TOTAL: Q${factura.total.toFixed(2)}`, { align: 'right' });

            doc.moveDown();
            doc.text('GRACIAS POR TU COMPRA VUELVE PRONTO', { align: 'center' });

            doc.end();

            stream.on('finish', () => resolve(filePath));
            stream.on('error', (err) => reject(err));

        } catch (error) {
            reject(error);
        }
    });
}