import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { fetchTransactions } from './api';
import "../Frontend/CSS/ExpenseChart.css"

const ExpenseChart = ({ refresh }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTransactions().then(transactions => {
      const grouped = {};
      transactions.forEach(t => {
        const month = new Date(t.date).toLocaleString('default', { month: 'short' });
        grouped[month] = (grouped[month] || 0) + t.amount;
      });
      const chartData = Object.entries(grouped).map(([month, amount]) => ({ month, amount }));
      setData(chartData);
    });
  }, [refresh]);

  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  );
};

export default ExpenseChart;
