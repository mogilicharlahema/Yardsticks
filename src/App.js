import React, { useState } from 'react';
import CategoryChart from './Frontend/CategoryChart';
import DashboardSummary from './Frontend/DashBoardSummary';
import TransactionForm from './Frontend/TransactionForm';
import TransactionList from './Frontend/TransactionList';
import ExpenseChart from './Frontend/ExpenseChart';



function App() {
  const [refresh, setRefresh] = useState(0);
  const [editData, setEditData] = useState(null); 

  const reload = () => setRefresh(prev => prev + 1);
  const handleEdit = (transaction) => setEditData(transaction);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", color: "coral" }}>
        Personal Finance Visualizer
      </h1>

      <TransactionForm 
        onSuccess={reload} 
        editData={editData} 
        setEditData={setEditData} 
      />

      <TransactionList 
        refresh={refresh} 
        onEdit={handleEdit} 
      />

      <DashboardSummary refresh={refresh} />
      <ExpenseChart refresh={refresh} />
      <CategoryChart refresh={refresh} />

    
    </div>
  );
}

export default App;
