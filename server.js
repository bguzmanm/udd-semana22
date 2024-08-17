const express = require('express');
const app = express();

const User = require('./models/user');
const connectDB = require('./database/db');

require('dotenv').config();

connectDB();

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error obteniendo los usuarios' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error obteniendo al usuario' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, username, password, active } = req.body;
    const nuevoUsuario = await User.create({ name, username, password, active });
    res.json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error creando un usuario' });
  }
});

app.put('/users/:id', async (req, res) => {
   try {
    const { name, username, password, active } = req.body;
    const usuarioActualizado = await User.findByIdAndUpdate(req.params.id, { name, username, password, active }, { new:true });
    res.json(usuarioActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error actualizando un usuario' });
  }
});

app.delete('/users/:id', async (req, res) => {
   try {
    const usuarioBorrado = await User.findByIdAndDelete(req.params.id);
    res.json(usuarioBorrado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error borrando un usuario' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`listen in port ${process.env.PORT}`);
});