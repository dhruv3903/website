const Address=require('../models/address')






exports.addresstableshow=async(request,response)=>{
    const name=request.session.loginname
    const record=await Address.findOne()
    response.render('admin/addressmanagement.ejs',{name,record})
}

exports.addressupdateformshow=async(request,response)=>{
    const name=request.session.loginname
    const id=request.params.id
    const record= await Address.findById(id)
    response.render('admin/addressupdateform.ejs',{name,record})
}

exports.addressupdate=async(request,response)=>{
    const{name,address,telephone,phone,email,instagram,twitter,linkedin,about}=request.body
    const id=request.params.id
    await Address.findByIdAndUpdate(id,{name:name,address:address,telephone:telephone,phone:phone,email:email,instagram:instagram,twitter:twitter,linkedin:linkedin,about:about})
    response.redirect('/admin/address')
}