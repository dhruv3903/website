const testi=require('../models/testi')


exports.testiformshow=(request,response)=>{
    response.render('testiform.ejs')

}
exports.testiadd=async(request,response)=>{
    const{review,name}=request.body
    if(request.file){
     const filename=request.file.filename
     var record= new testi({reviews:review,name:name,img:filename})
    }else{
     const filename='default.jpg'
     var record= new testi({reviews:review,name:name,img:filename})
    }
    record.save()
    response.redirect('/testinominals')
    
}
exports.testitableshow=async(request,response)=>{
    const name=request.session.loginname
    const ttesti=await testi.count()
    const published=await testi.count({status:'Published'})
    const unpublished=await testi.count({status:'Unpublished'})
    const record= await testi.find().sort({postedDate:-1})
    response.render('admin/testimanagement.ejs',{name,record,ttesti,published,unpublished})
}

exports.testidelete=async(request,response)=>{
    const id=request.params.id
    await testi.findByIdAndDelete(id)
    response.redirect('/admin/testi')
}

exports.testistatusupdate=async(request,response)=>{
    const id=request.params.id
  const record=await testi.findById(id)
  let newstatus=null
  if(record.status=='Unpublished'){
    newstatus='Published'
  }else{
    newstatus='Unpublished'
  }
  await testi.findByIdAndUpdate(id,{status:newstatus})
  response.redirect('/admin/testi')
}

exports.testistatussearch=async(request,response)=>{
  const name=request.session.loginname
  const ttesti=await testi.count()
  const published=await testi.count({status:'Published'})
  const unpublished=await testi.count({status:'Unpublished'})
 const {select}=request.body
 const record= await testi.find({status:select})
 response.render('admin/testimanagement.ejs',{name,record,ttesti,published,unpublished})
}
