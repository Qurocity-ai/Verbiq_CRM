const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const loginRoutes = require('./routes/loginRoutes');
const RecruiterRoutes = require('./routes/RecruiterRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', loginRoutes);
app.use('/api', RecruiterRoutes);

app.get('/', (req, res) => {
    res.send("server and db both are running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});