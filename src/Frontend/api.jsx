const API_URL = 'http://localhost:5000/api/transactions';

export const fetchTransactions = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addTransaction = async (transaction) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  return res.json();
};

export const updateTransaction = async (id, transaction) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  return res.json();
};

export const deleteTransaction = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};



