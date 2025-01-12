const express = require('express');
const authRoutes = require('./routes/authRoutes');
require('./models/index');
const cors= require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port 5000');
});