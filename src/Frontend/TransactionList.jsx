import React, { useEffect, useState } from 'react';
import { fetchTransactions, deleteTransaction } from './api';
import "../Frontend/CSS/TransactionList.css";

const TransactionList = ({ refresh, onEdit }) => {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = () => {
    fetchTransactions().then(setTransactions);
  };

  useEffect(() => {
    loadTransactions();
  }, [refresh]);

  return (
    <div>
      {transactions.map(tx => (
        <div key={tx._id} className="transaction-item">
          <div>
            <p>{tx.description}</p>
            <small>{new Date(tx.date).toLocaleDateString()}</small>
            <small>Category: {tx.category}</small>
          </div>
          <div>
            <span>₹{tx.amount}</span>
            <button onClick={() => onEdit(tx)}>Edit</button>
            <button onClick={() => deleteTransaction(tx._id).then(loadTransactions)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
