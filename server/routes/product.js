const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Product} = require('../models/Product');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")


router.post('/image', (req, res) =>{

   upload(req, res, err =>{
       if(err){
           return req.json({ success: false, err})
       }
       return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
   })
})

router.post('/', (req, res) =>{

    // 받아온 정보를 DB에 입력
    const product = new Product(req.body)

    product.save((err) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true})
    })

 })

 router.post('/products', (req, res) =>{

    let limit = req.body.limit ? parseInt(req.body.limit) : 20; // req limit이 존재하는 경우, 아니면 20개
    let skip = req.body.skip ? parseInt(req.body.skip) : 0; // req skip이 존재하는 경우, 아니면 0부터
    let term = req.body.searchTerm;    
    let findArgs ={};

    for(let key in req.body.filters){
        if (req.body.filters[key].length > 0) {

            if(key ==="price"){
                findArgs[key] ={
                    $gte: req.body.filters[key][0],     //mongo DB에서 사용
                    $lte: req.body.filters[key][1]
                }
            }
            else{
                findArgs[key] = req.body.filters[key];
            }
            
        }
    }

    if(term){
        Product.find(findArgs)
        .find({$text: {$search: term}})
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) =>{
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, productInfo,
                                         postSize: productInfo.length})
        })
    
    } else{
        Product.find(findArgs)
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) =>{
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, productInfo,
                                         postSize: productInfo.length})
        })
    
    }

   
 })

 router.get('/products_by_id', (req, res) =>{

    // productID와 같은 DB 정보를 가져옴
    let type = req.query.type
    let productId = req.query.id
   
    Product.find({_id:productId})
        .populate('writer')
        .exec((err, product)=>{
            if(err) return res.status(400).send(err)
            return res.status(200).send({success: true, product})
        })

 })

module.exports = router;
