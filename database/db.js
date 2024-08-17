const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DB, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('conectado con la base de datos');
    
  } catch (error) {
    console.error(error);
    process.exit(1); // detener la aplicación por completo
    
  }
};

module.exports = connectDB;