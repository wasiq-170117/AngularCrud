const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ConnectDatabase = require('./Connection/dbConnection');
const userRoute = require('./routes/userRoute');



dotenv.config();
const app = express();
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
}));
app.use(express.json());

ConnectDatabase();

app.use("/userRoutes/", userRoute);

app.get("/", (req, res) => {
    res.json('Server is running');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serve is listening on PORT ${PORT}`);
})