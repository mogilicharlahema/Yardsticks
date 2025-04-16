
// const mongoose = require('mongoose');

// const TransactionSchema = new mongoose.Schema({
//   amount: Number,
//   description: String,
//   date: Date,
//   category: {
//     type: String,
//     enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Others'], // predefined
//     required: true,
//   }
// });

// module.exports = mongoose.model('Transaction', TransactionSchema);


const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  category: String, 
});

module.exports = mongoose.model('Transaction', transactionSchema);
