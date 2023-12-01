const banner=require('../models/banner')


exports.banner=async(request,response)=>{
    const name=request.session.loginname
    const record=await banner.findOne()
    response.render('admin/bannermanagement.ejs',{name,record})
}
exports.bannerupdateformshow=async(request,response)=>{
    try{
    const name=request.session.loginname
    const id=request.params.id
    const record=await banner.findById(id)
    response.render('admin/updateform.ejs',{name,record})
    }catch(error){
        console.log(error.message)
    }
}
exports.bannerupdate=async(request,response)=>{
    try{
    const id=request.params.id
    const{title,desc,more}=request.body
    if(request.file){
        const filename=request.file.filename
    await banner.findByIdAndUpdate(id,{title:title,desc:desc,more:more,img:filename})
    }else{
        await banner.findByIdAndUpdate(id,{title:title,desc:desc,more:more}) 
    }
}catch(error){
    console.log(error.message)
}
   
    response.redirect('/admin/banner')
}
exports.moredetail=async(request,response)=>{
    const bannerrecord= await banner.findOne()
    response.render('bannermore.ejs',{bannerrecord})
}