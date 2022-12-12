//modules
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import ejs from "ejs";
import session from "express-session";
import pgSession from "connect-pg-simple";
let pgSe = pgSession(session);
// import fileStore from "session-file-store";
// let fs = fileStore(session);
import loger from "morgan";
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import randomString from 'randomstring';
import db_connection from './config/db_config.json' assert {type: "json"};


//route
import mainRoute from "./router/main.js";
import userRoute from "./router/user.js";
import partnerRoute from "./router/partner.js";
import estimateRoute from "./router/estimate.js";
import paymentRoute from "./router/payment.js";
import statisticsRoute from "./router/statistics.js";
import authRoute from "./router/auth.js";

//config
const app = express();


//port setting
app.set("port", 3002);

//session setting
const sessionDBaccess = new pg.Pool(db_connection);
const sessionMiddleware = {
    store: new pgSe({
        pool: sessionDBaccess,
        tableName: 'session'
    }),
    name: 'SID',
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'None',
        secure: false
    },
    rolling: false
};
app.use(session(sessionMiddleware));

//path const variable
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//static file setting
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

//set templete, templete engine
app.use(expressEjsLayouts);
app.set('layout', 'layout/layout');
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

//app log settings
app.use(loger('dev'));

//request middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//request cookie parser middleware
//app.use(cookieParser());



app.use('/', mainRoute);

app.use('/user', userRoute);

app.use('/partner', partnerRoute);

app.use('/estimate', estimateRoute);

app.use('/payment', paymentRoute);

app.use('/statistics', statisticsRoute);

app.use('/auth', authRoute);


// find 404error and go to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    console.log(err);

    //res.local.message = err.message;
    //res.local.error = req.app.get("env") === "developnent" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

//server setting
const server = app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 실행중");
})


