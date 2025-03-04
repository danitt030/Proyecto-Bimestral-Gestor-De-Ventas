import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Gestor de ventas API",
            version: "1.0.0",
            description: "API de gestor de ventas sobre un supermercado",
            contact:{
                name: "Daniel Tuy",
                email: "dtuy-2023313@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/gestorDeVentas/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}