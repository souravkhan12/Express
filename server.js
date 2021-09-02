const express = require('express')
const path = require('path');
const {route} = require('./routes');
const app = express();
const mainRouter = require('./routes/index')
const productRouter = require('./routes/products')
const ErrorHandler = require('./errors/ErrorHandler.js')

const PORT = process.env.PORT || 3000

app.set('view engine','ejs') // to set the engine to ejs

app.use(express.static('public'))  // To set the middleware globally

app.use(express.json());
// app.use(express.urlencoded({extended : false}))
app.use(productRouter);
app.use(mainRouter);

app.use((err,req,res,next)=> {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            error:{
                msg : err.msg,
                status : err.status
            }
        })
    } else {
        res.status(500).json({
            error: {
                msg : err.msg,
                status : err.status
            }
        });
    }
});

app.listen(PORT,()=>console.log(`listening on ${PORT}`))

