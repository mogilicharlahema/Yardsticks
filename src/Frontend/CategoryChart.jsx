

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { fetchTransactions } from './api';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ffb6c1'];

const CategoryChart = ({ refresh }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTransactions().then(transactions => {
      const categoryData = {};
      transactions.forEach(tx => {
        categoryData[tx.category] = (categoryData[tx.category] || 0) + tx.amount;
      });
      const formatted = Object.entries(categoryData).map(([name, value]) => ({ name, value }));
      setData(formatted);
    });
  }, [refresh]);

  return (
    <div style={{
      position: 'relative',
      top: '-320px',
      left: '300px',
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h3 style={{ marginBottom: '10px', color: '#333' }}>Expenses by Category</h3>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
};

export default CategoryChart;
