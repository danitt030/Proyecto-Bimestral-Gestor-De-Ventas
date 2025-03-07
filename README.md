# Proyecto-Bimestral-Gestor-De-Ventas

Este proyecto consiste en una API desarrollada con Node.js, Express y MongoDB, diseñada para gestionar un sistema de ventas. Permite a los administradores gestionar productos, categorías y usuarios, mientras que los clientes pueden explorar productos, realizar compras y administrar su perfil.

# Pasos para iniciar el proyecto 

## 1. clonamos el repositorio en el cmd 
```
git clone https://github.com/danitt030/Proyecto-Bimestral-Gestor-De-Ventas.git
```
## 2. Creamos el proyecto
```
npm init -y
```
## 3. Descargamos el proyecto
```
npm i
```
## 4. Encendemos el servidor
```
npm run dev
```

# Coleccion y data
Dirigirse al directorio configs para acceder a la coleccion y la carpeta data para importar cada data del proyecto


# Credenciales del administrador por defecto
- **username:** `danitt030`
-  **email:** `danieltuy@gmail.com`
- **password:** `Cremas30*`
  
## Endpoints de la API

### ADMINISTRADOR Y CLIENTES
### Autenticación

- **Registrar ADMINISTRADOR O CLIENTE**
  - **URL:** `/gestorDeVentas/v1/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "surname": "string",
      "username": "string",
      "email": "string",
      "phone": "string",
      "password": "string",
      "role": "string",
    }
    ```

- **LOGIN**
  - **URL:** `/gestorDeVentas/v1/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "username": "String"
      "email": "string",
      "password": "string"
    }
    ```
    Puede ingresar el username o el email

- **LISTAR USUARIOS**
  - **URL:** `/gestorDeVentas/v1/user`
  - **Método:** `GET`

    
- **Actualizar Usuario**
  - **URL:** `/gestorDeVentas/v1/user/updateUser/:uid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "surname": "string",
      "username": "string",
      "email": "string",
      "phone": "string",
    }
    ```
    BEARER TOKEN, colocar el token si es de admin o usuario
    
- **Cambiar contraseña**
  - **URL:** `/gestorDeVentas/v1/user/updatePassword/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    {
      "oldPassword": "String",
      "newPassword": "String"
    }
    ```
    BEARER TOKEN, colocar el token si es de admin o usuario
    
- **Eliminar cuenta**
  - **URL:** `/gestorDeVentas/v1/user/eliminarCuenta/:uid`
  - **Método:** `DELETE`
  - **Cuerpo:**
    ```json
    {
      "Password": "String"
    }
    ```
    BEARER TOKEN, colocar el token si es de admin o usuario

- **Modificar Role**
  - **URL:** `/gestorDeVentas/v1/user/updateRole/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    {
      "newRole": "String"
    }
    ```
    BEARER TOKEN, colocar el token si es de admin o usuario

### Categoria
- **Registrar Categoria**
  - **URL:** `/gestorDeVentas/v1/categoria/crearCategoria`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
    "nombre": "String",
    "descripcion": "String"
    }
    ```
    Bearer TOKEN con el administrador

- **Listar Categoria**
  - **URL:** `/gestorDeVentas/v1/categoria/listarCategorias`
  - **Método:** `GET`
    Bearer TOKEN con el administrador

- **Editar Categoria**
  - **URL:** `/gestorDeVentas/v1/categoria/editarCategoria/:uid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
    "nombre": "String",
    "descripcion": "String"
    }
    ```
    Bearer TOKEN con el administrador

- **Editar Categoria**
  - **URL:** `/gestorDeVentas/v1/categoria/eliminarCategoria/:uid`
  - **Método:** `DELETE`
    Bearer TOKEN con el administrador
  
### Producto
- **Registrar Producto**
  - **URL:** `/gestorDeVentas/v1/productos/agregarProducto`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
    "nombreProducto": "String",
    "descripcionProducto": "String",
    "precioProducto": "Number",
    "stock": "Number",
    "categoria": "String"
    }
    ```
    Bearer TOKEN con el administrador

- **Listar Productos**
  - **URL:** `/gestorDeVentas/v1/productos/ListarProductos`
  - **Método:** `GET`
    Bearer TOKEN con el administrador

- **Listar Productos ID**
  - **URL:** `/gestorDeVentas/v1/productos/listarProductoPorId/:id`
  - **Método:** `GET`
    Bearer TOKEN con el administrador

- **Editar Producto**
  - **URL:** `/gestorDeVentas/v1/productos/actualizarProducto/:id`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
    "nombreProducto": "String",
    "descripcionProducto": "String",
    "precioProducto": "Number",
    "stock": "Number",
    "categoria": "String"
    }
    ```
    Bearer TOKEN con el administrador

- **Eliminar Producto**
  - **URL:** `/gestorDeVentas/v1/productos/eliminarProducto/:id`
  - **Método:** `DELETE`
    Bearer TOKEN con el administrador

- **Productos agotados**
  - **URL:** `/gestorDeVentas/v1/productos/productosAgotados`
  - **Método:** `GET`
    Bearer TOKEN con el administrador

- **Productos mas vendidos**
  - **URL:** `/gestorDeVentas/v1/productos/productosMasVendidos`
  - **Método:** `GET`
    Bearer TOKEN con el administrador

- **Productos por categoria**
  - **URL:** `/gestorDeVentas/v1/productos/productosPorCategoria/:id`
  - **Método:** `GET`
    Bearer TOKEN con el administrador
    
- **Productos por categoria**
  - **URL:** `gestorDeVentas/v1/productos/buscarProductosPorNombre`
  - **Método:** `GET`
  - **Cuerpo:**
    ```json
    {
    "nombreProducto": "String"
    }
    ```
    Bearer TOKEN con el administrador

### Carrito de Compras
- **Agregar producto al carrito**
  - **URL:** `/gestorDeVentas/v1/carrito/agregarProducto`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
    "idProducto": "String", 
    "cantidad": "Number"
    }
    ```
    Bearer TOKEN con el cliente

- **Listar Carrito**
  - **URL:** `/gestorDeVentas/v1/productos/ListarProductos`
  - **Método:** `GET`
    Bearer TOKEN con el administrador o cliente

- **Eliminar Carrito producto**
  - **URL:** `/gestorDeVentas/v1/carrito/eliminarProducto/:id`
  - **Método:** `DELETE`
    Bearer TOKEN con el administrador o cliente

### FACTURA
- **Proceso de compra**
  - **URL:** `/gestorDeVentas/v1/factura/procesarCompra`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "usuario": {
        "_id": "String"
      }
    }
    ```
    Bearer TOKEN con el administrador o cliente

- **Editar Factura**
  - **URL:** `/gestorDeVentas/v1/factura/editarFactura/:idFactura`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "productos": [
          {
            "idProducto": "String",
            "cantidad": "Number",
            "precioProducto": "Number",
            "nombreProducto": "String"
          }
      ]
    }
    ```
    Bearer TOKEN con el administrador 

- **Obtener factura por usuario**
  - **URL:** `/gestorDeVentas/v1/factura/obtenerFacturasPorUsuario`
  - **Método:** `GET`
  -   - **Cuerpo:**
    ```json
    {
      "usuario": {
        "_id": "String"
      }
    }
    ```
    Bearer TOKEN con el cliente

## API DOCS RUTA 
```
http://127.0.0.1:3002/api-docs
```
