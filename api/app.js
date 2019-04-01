let express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    cors = require('cors');

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes will go here


// Error handling
app.use( (req, res, next) => {
    let error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})