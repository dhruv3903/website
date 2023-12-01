const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const bannerc=require('../controllers/bannercontroller')
const servicec=require('../controllers/servicecontroller')
const testic=require('../controllers/testicontroller')
const queryc=require('../controllers/querycontroller')
const addc=require('../controllers/addresscontroller')
const upload=require('../helper/multer')
const handlelogin=require('../helper/handlelogin')









router.get('/',regc.loginpage)
router.post('/',regc.logincheck)
router.get('/dashboard',handlelogin,regc.dashboard)
router.post('/dashboard',regc.passwordchange)
router.get('/logout',regc.logout)
router.get('/banner',handlelogin,bannerc.banner)
router.get('/bannerupdate/:id',handlelogin,bannerc.bannerupdateformshow)
router.post('/bannerupdate/:id',upload.single('img'),bannerc.bannerupdate)
router.get('/service',handlelogin,servicec.service)
router.get('/serviceform',handlelogin,servicec.serviceform)
router.post('/serviceform',upload.single('img'),servicec.serviceadd)
router.get('/servicedelete/:id',handlelogin,servicec.servicedelete)
router.get('/servicestatusupdate/:id',handlelogin,servicec.servicestatusupdate)
router.post('/service',servicec.searvicesearch)
router.get('/testi',handlelogin,testic.testitableshow)
router.get('/testidelete/:id',handlelogin,testic.testidelete)
router.get('/testistatusupdate/:id',handlelogin,testic.testistatusupdate)
router.post('/testi',testic.testistatussearch)
router.get('/query',handlelogin,queryc.queryshow)
router.get('/queryform/:id',handlelogin,queryc.queryreplyformshow)
router.post('/queryform/:id',upload.single('attc'),queryc.querymailreply)
router.get('/address',handlelogin,addc.addresstableshow)
router.get('/addressupdate/:id',handlelogin,addc.addressupdateformshow)
router.post('/addressupdate/:id',addc.addressupdate)







module.exports=router