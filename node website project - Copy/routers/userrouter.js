const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const bannerc=require('../controllers/bannercontroller')
const banner=require('../models/banner')
const service=require('../models/service')
const servicec=require('../controllers/servicecontroller')
const testic=require('../controllers/testicontroller')
const queryc=require('../controllers/querycontroller')
const addc=require('../controllers/addresscontroller')
const multer = require('multer')
const testi = require('../models/testi')
const address=require('../models/address')



const storage=multer.diskStorage({
    destination:function(request,file,cb){
        cb(null,'./public/upload')
    },
    filename:function(request,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
const upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*4}
})



router.get('/',async(request,response)=>{
   const bannerrecord= await banner.findOne()
   const servicerecord=await service.find({status:'Published'})
   const testirecord=await testi.find({status:'Published'}).sort({postedDate:-1})
   const addressrecord=await address.findOne()
    response.render('index.ejs',{bannerrecord,servicerecord,testirecord,addressrecord})
})
router.get('/banner',bannerc.moredetail)
router.get('/servicedetails/:id',servicec.moredetails)
router.get('/testinominals',testic.testiformshow)
router.post('/testinominals',upload.single('img'),testic.testiadd)
router.post('/',queryc.querydata)




module.exports=router