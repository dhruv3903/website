const multer=require('multer')

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

module.exports=upload