const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let transactions = [
    {id: 1, title: 'salary', amount: 5000, type: 'income'},
    {id: 2, title: 'Buy a coffee', amount: 35, type: 'expense'}
];

// get all the transaction list (Read)
app.get('/api/transactions', (req, res) => {
    res.json(transactions);
})

app.post('/api/transactions', (req, res) => {
    const {title, amount, type} = req.body;
    if(!title || !amount || !type) {
        return res.status(400).json({error: 'Please provide complete billing information'});
    }

    const newTransaction = {
        id: Date.now(),
        title,
        amount: Number(amount),
        type
    }
    transactions.push(newTransaction);
    return res.status(201).json(newTransaction);
})

app.delete('/api/transactions', (req, res) => {
    const id = Number(req.params.id);
    let updateTransaction = [];
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id !== id) {
            updateTransaction.push(transactions[i]);
        }
    }
    transactions = updateTransaction;
    return res.json({message: 'Delete successed', id});
})

app.listen(PORT, () => {
    console.log(`The server is running, the URL is: http://localhost:${PORT}/api/transactions`);
})