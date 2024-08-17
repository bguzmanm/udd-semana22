const Product = require('../models/product');

const findAll = async (req, res) => {
   try {
    const result = await Product.find({});
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error obteniendo los productos' });
  }
}

const findOne = async (req, res) => {
    try {
    const result = await Product.findById(req.params.id);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error obteniendo el producto' });
  }
}

const create = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const result = await Product.create({ name, price, description, stock });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error creando un producto' });
  }
}

const update = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const result = await Product.findByIdAndUpdate(req.params.id, { name, price, description, stock }, { new:true });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error actualizando un producto' });
  }
}

const remove = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error borrando un producto' });
  }
}

module.exports = { create, update, remove, findAll, findOne };