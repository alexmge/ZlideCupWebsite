const express = require('express')
const app = express()
const port = process.env.PORT||3000

const home = require('./routes/home')
const staff = require('./routes/staff')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const { newsMiddleware } = require('./lib/middleware')
const connectionString =

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("Signed cookie"));
app.use(newsMiddleware);
app.use('/', home);
app.use('/staff', staff);

mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
}).
catch(error => {
    console.log('Database connection refused' + error);
    process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("DB connected")
});

// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// custom 404 page
app.use((req, res) => {
    res.status(404);
    res.render('404.handlebars');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500.handlebars');
});

app.listen(port||3000, () => console.log(`Example app listening on port ${port}!`))
