import User from "../user/user.model.js"
import Categoria from "../categoria/categoria.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const categoriaExists = async (nombre) => {
    const categoria = await Categoria.findOne({ nombre })
    if (categoria) {
        throw new Error(`La categoría con el nombre ${nombre} ya existe`);
    }
};
