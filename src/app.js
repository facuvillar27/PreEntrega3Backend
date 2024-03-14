import express from 'express';
import __dirname from './utils.js';

import usersRouter from './routes/users.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js';
import ordersRouter from './routes/orders.router.js';

import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/test';
const connection = mongoose.connect(DB_URL)


/**
 * Template engine
 */
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

/**
 * Middlewares
 */
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

initializePassport();
app.use(passport.initialize());
app.use(cookieParser());

app.use('/',viewsRouter)
app.use('/api/users',usersRouter);
app.use('/api/carts',cartsRouter);
app.use('/api/products',productsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/orders',ordersRouter);

const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));
