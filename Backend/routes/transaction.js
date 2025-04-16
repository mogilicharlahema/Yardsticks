const express = require('express');
const router = express.Router();
const Transaction = require('../Models/transactions');

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

// Create transaction
router.post('/', async (req, res) => {
  const { amount, description, date, category } = req.body;
  try {
    const newTransaction = await Transaction.create({ amount, description, date, category });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error adding transaction', error });
  }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting transaction' });
  }
});

// Edit transaction
router.put('/:id', async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating transaction' });
  }
});

module.exports = router;
