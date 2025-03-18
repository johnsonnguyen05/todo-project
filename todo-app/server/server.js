const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Use ToDo routes
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
