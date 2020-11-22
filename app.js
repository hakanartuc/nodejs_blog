const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { generateDate, limit, truncate, paginate } = require('./helpers/hbs');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const methodOverride = require('method-override');

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

app.use(express.static('public'));

app.engine('handlebars', exphbs(
    {
        defaultLayout: "main",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
        helpers: {
            limit: limit,
            truncate: truncate,
            generateDate: generateDate,
            paginate: paginate
            // generateDate:(date,format)=>{
            //     return moment(date).format(format);
            // }
        }
    }
));
app.set('view engine', 'handlebars');

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: "testSecret",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
}));



// Display Link Middleware
app.use((req, res, next) => {
    const { userId } = req.session;
    if (userId) {
        res.locals = {
            displayLink: true
        };
    }
    else {
        res.locals = {
            displayLink: false
        }
    }
    next();
});

// FLASH Message Middleware
app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

const main = require('./routes/main');
const posts = require('./routes/posts');
const users = require('./routes/users');
const contact = require('./routes/contact');
const admin = require('./routes/admin/index');

app.use('/', main);
app.use('/posts', posts);
app.use('/users', users);
app.use('/admin', admin);
app.use('/contact', contact);

mongoose.connect(`mongodb://${hostname}/nodeblog_db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


app.listen(port, hostname, () => {
    console.log(`Server çalışıyor, http://${hostname}:${port}/`);
});