const reg=require('../models/reg')



exports.loginpage=(request,response)=>{
    response.render('admin/login.ejs',{message:''})
 }
 exports.logincheck=async(request,response)=>{
    const{us,pass}=request.body
    const record=await reg.findOne({username:us})
    if(record!==null){
      if(record.password==pass){
         request.session.isAuth=true
         request.session.loginname=us
         request.session.userid=record.id
      response.redirect('/admin/dashboard')
      }else{
         response.render('admin/login.ejs',{message:'Wrong Credentials'})
      }
    }else{
      response.render('admin/login.ejs',{message:'Wrong Credentials'})
    }
 }
exports.dashboard=(request,response)=>{
   const id=request.session.userid
   const name=request.session.loginname
   response.render('admin/dashboard.ejs',{name})
}
exports.logout=(request,response)=>{
   request.session.destroy()
   response.redirect('/admin/')
}

exports.passwordchange=async(request,response)=>{
   const {npass}=request.body
   const id=request.session.userid
   await reg.findByIdAndUpdate(id,{password:npass})
   request.session.destroy()
   response.render('admin/passwordchangemessage.ejs')
}
