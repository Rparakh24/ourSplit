const express = require('express');
const cors = require('cors');
const router = express.Router();
const app = express();
const mainRouter = require("./routes/index");
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api',mainRouter);
app.use(router);


app.listen(3000,()=>{
    console.log("Server is running on localhost 3000");
})