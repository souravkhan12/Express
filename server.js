const express = require('express')
const path = require('path');
const {route} = require('./routes');
const app = express();
const mainRouter = require('./routes/index')
const productRouter = require('./routes/products')

app.set('view engine','ejs') // to set the engine to ejs

app.use(express.static('public'))  // To set the middleware globally

app.use(express.json());
// app.use(express.urlencoded({extended : false}))
app.use(productRouter);
app.use(mainRouter);

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>console.log(`listening on ${PORT}`))

