const { customErrorResponse } = require("../utils/CustomResponse");

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-session");
const helmet = require("helmet");
const path = require("path");


const AuthRouter = require("../routers/AuthRouter");
const AdminRouter = require("../routers/AdminRouter");
const UserRouter = require("../routers/UserRouter");



const publicPathURL = path.join(__dirname, '../public');
const templatesURL = path.join(__dirname, '../templates');
const bootstrapURL = path.join(__dirname, '../../node_modules/bootstrap/dist/css');
const boostrapJsURL = path.join(__dirname, '../../node_modules/bootstrap/dist/js');
const jqueryURL = path.join(__dirname, '../../node_modules/jquery/dist');
const fontAwesomeURL = path.join(__dirname, '../../node_modules/font-awesome');


module.exports = async (app) => {
    app.set('view engine', 'hbs');
    app.set('views', templatesURL);
    app.use(express.static(bootstrapURL));
    app.use(express.static(boostrapJsURL));
    app.use(express.static(publicPathURL));
    app.use(express.static(jqueryURL));
    app.use(express.static(fontAwesomeURL));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // CSRF token !!!
    //app.use(cookieParser());
    app.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true
    }));

    app.use('/admin', AdminRouter);
    app.use('/user', UserRouter);
    app.use('/auth', AuthRouter);

    app.all('*', (req, res) => {
        return customErrorResponse(res, 404, "Page not found");
    });

}
