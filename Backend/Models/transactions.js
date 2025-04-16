


const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  category: String, 
});

module.exports = mongoose.model('Transaction', transactionSchema);
