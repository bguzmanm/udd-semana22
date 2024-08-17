const Order = require('../models/order.model');

const findAll = async (req, res) => {
   try {
    const result = await Order.find({});
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error obteniendo las ordenes' });
  }
}

const findOne = async (req, res) => {
    try {
    const result = await Order.findById(req.params.id);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error obteniendo una orden' });
  }
}

const create = async (req, res) => {
  try {
    const { user, products } = req.body;
    const result = await Order.create({ user, products });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error creando una orden' });
  }
}

const update = async (req, res) => {
  try {
    const { user, products } = req.body;
    const result = await Order.findByIdAndUpdate(req.params.id, { user, products }, { new:true });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error actualizando una orden' });
  }
}

const remove = async (req, res) => {
  // try {
  //   const result = await Product.findByIdAndDelete(req.params.id);
  //   res.json(result);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'error borrando un producto' });
  // }
}

module.exports = { create, update, remove, findAll, findOne };