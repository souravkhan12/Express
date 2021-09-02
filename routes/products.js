const router = require('express').Router();
let products = require('../productData.js');
const ErrorHandler = require('../errors/ErrorHandler.js')

router.get('/products',(req,res)=>{
    res.render('products',{
        title: 'my product page'
    })
})

router.get('/api/products',(req,res)=>{
    res.json(products);
})

router.post('/api/products',(req,res,next)=>{
    const {name,price} = req.body;

    if (!name || !price) {
        next(ErrorHandler.validationError('Name and Price field are required'));
       // return res.status(422).json({error: 'U! Fuck'});
    }
    const product = {name,price, id : new Date().getTime().toString()};
    products.push(product);
    res.json(product)
})


router.delete('/api/products/:id',(req,res)=>{
    products = products.filter((product)=> req.params.id !== product.id);
    res.json({status : 'Ok'});
})

module.exports = router
