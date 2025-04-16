
import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './api';
import "../Frontend/CSS/DashboardSummary.css"

const DashboardSummary = ({ refresh }) => {
  const [total, setTotal] = useState(0);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetchTransactions().then(transactions => {
      const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
      const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
      setTotal(totalAmount);
      setRecent(sorted.slice(0, 3));
    });
  }, [refresh]);

  return (
    <div className="dashboard-summary">
  <div className="card" style={{ display: "flex",  alignItems: "center" }}>
  <h1 style={{ color: "brown", margin: 0, fontSize: "1.5rem" }}>Total Expenses:</h1>
  <span style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#333" }}>
    ₹{total}
  </span>
</div>



      <div className="card">
        <h4>Recent Transactions</h4>
        <ul>
          {recent.map(tx => (
            <li key={tx._id}>{tx.description} - ₹{tx.amount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSummary;
