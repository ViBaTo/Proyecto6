// nos traemos el módulo mongoose que es todo lo que tiene que ver con la base de datos npm i mongoose
const mongoose = require('mongoose')
// npm i dotenv
require('dotenv').config()

// creamos una función asíncrona llamada como queramos, en este caso connectDB
const connectDB = async () => {
  // creamos un bloque trycatch ya que algo podría fallar y así lo controlamos
  try {
    // usamos await porque el proceso de conectarse será asíncrono y utilizamos el método connect de mongoose al cual le aportamos la url de la BBDD que la cogemos desde el .env
    await mongoose.connect(process.env.DB_URL, {
      /* useNewUrlParser: true,
      useUnifiedTopology: true */
    })
    console.log('Conectado con éxito a la BBDD')
  } catch (error) {
    console.log('Error en la conexión de la BBDD')
  }
}

// exportamos la función para poder usarla en el index.js
module.exports = { connectDB }
// con llaves cuando es una función
