const service=require('../models/service')




exports.service= async(request,response)=>{
  try{
  const name=request.session.loginname
  const record= await service.find()
  const tservice=await service.count()
  const published=await service.count({status:'Published'})
  const unpublished=await service.count({status:'Unpublished'})
  response.render('admin/servicemanagement.ejs',{name,record,tservice,published,unpublished})
  }catch(error){
    console.log(error.message)
  }
}
exports.serviceform=(request,response)=>{
  const name=request.session.loginname
  response.render('admin/serviceform.ejs',{name})
}
exports.serviceadd=(request,response)=>{
  try{
     const filename=request.file.filename
     const {title,desc,more}=request.body
     const record= new service({ img:filename,title:title,desc:desc,more:more})
     record.save()
     response.redirect('/admin/service')
  }catch(error){
    console.log(error.message)
  }
}
exports.servicedelete=async(request,response)=>{
  const id=request.params.id
   await service.findByIdAndDelete(id)
   response.redirect('/admin/service')
}
exports.servicestatusupdate=async(request,response)=>{
  const id=request.params.id
  const record=await service.findById(id)
  let newstatus=null
  if(record.status=='Unpublished'){
    newstatus='Published'
  }else{
    newstatus='Unpublished'
  }
  await service.findByIdAndUpdate(id,{status:newstatus})
  response.redirect('/admin/service')
}
exports.searvicesearch=async(request,response)=>{
  const name=request.session.loginname
 const status=request.body.select
 const record=await service.find({status:status})
 const tservice=await service.count()
 const published=await service.count({status:'Published'})
 const unpublished=await service.count({status:'Unpublished'})
 response.render('admin/servicemanagement.ejs',{name,record,tservice,published,unpublished})
}
exports.moredetails=async(request,response)=>{
  const id=request.params.id
  const record=await service.findById(id)
  response.render('servicedetails.ejs',{record})
}