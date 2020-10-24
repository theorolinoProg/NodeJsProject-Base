import express from 'express';
import routes from './routes/index';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongodb from './utils/db';

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cors());

// CORS HEADERS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});

// MONGO CONNECT
mongodb.initClientDbConnection();

// API ROUTES
app.use('/auth', routes.auth);

// start server
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('Server running on port %d', PORT));

module.exports = server ;