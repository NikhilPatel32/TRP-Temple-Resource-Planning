require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const errorHandler = require('./middlewares/errorHandler'); 

const app = express();

const PORT = process.env.PORT || 3000

connectToDB();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/api', (req, res) => {
    res.send("API is working!");
});

app.use('/api/auth' , authRoutes);
app.use('/api/transaction' , transactionRoutes);

//error Handler
app.use(errorHandler);

app.listen(PORT , () => {
    console.log(`server is now listening to port ${PORT}`);
})