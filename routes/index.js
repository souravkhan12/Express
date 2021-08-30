const router = require('express').Router()
const apikeyMiddleware = require('../middlewares/apikey')

router.use(apikeyMiddleware); // To use the middleware over all the routes

router.get('/', (req,res)=>{
    res.render('index',{
        title: 'Arc'
    })
})

router.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Arc'
    })
})


router.get('/download',(req,res)=>{
    res.download(path.resolve(__dirname) + '/about.html' )
})

module.exports = router;
