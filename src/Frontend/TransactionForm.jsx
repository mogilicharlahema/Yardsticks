import React, { useState, useEffect } from 'react';
import { addTransaction, updateTransaction } from './api';
import "../Frontend/CSS/TransactionForm.css";

const TransactionForm = ({ onSuccess, editData, setEditData }) => {
  const [form, setForm] = useState({ amount: '', description: '', date: '', category: '' });

  useEffect(() => {
    if (editData) {
      setForm({
        amount: editData.amount,
        description: editData.description,
        date: editData.date.slice(0, 10),
        category: editData.category || ''
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.description || !form.date || !form.category)
      return alert('All fields are required');

    if (editData) {
      await updateTransaction(editData._id, { ...form, amount: parseFloat(form.amount) });
      setEditData(null);
    } else {
      await addTransaction({ ...form, amount: parseFloat(form.amount) });
    }

    setForm({ amount: '', description: '', date: '', category: '' });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="date"
        value={form.date}
        onChange={e => setForm({ ...form, date: e.target.value })}
      />
      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Health">Health</option>
        <option value="Others">Others</option>
      </select>
      <button type="submit">{editData ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default TransactionForm;
