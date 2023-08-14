import express from 'express';
import bodyParser from 'body-parser';
import router from './src/routers/index';

require('dotenv').config();

const PORT = process.env.PORT || 8080
const app = express();// SERVER Setup
app.use(bodyParser.json())// Parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));// Parse URL-encoded payloads
app.use((req, res, next) => {// Disable CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use("/", router);// Route definition
app.listen(PORT, () => {// Server Start
    console.log(`Running on port ${PORT}`)
});  