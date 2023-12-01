const Query=require('../models/query')
const nodemailer=require('nodemailer')

exports.querydata=(request,response)=>{
    const{email,query}=request.body
    const record=new Query({email:email,query:query})
    record.save()
    response.redirect('/')
}

exports.queryshow=async(request,response)=>{
    const name=request.session.loginname
    const record=await Query.find().sort({status:-1})
    response.render('admin/querymanagement.ejs',{name,record})

}
exports.queryreplyformshow=async(request,response)=>{
    const id=request.params.id
    const name=request.session.loginname
    const record=await Query.findById(id)
    response.render('admin/queryreplyform.ejs',{name,record})
    
}
exports.querymailreply=async(request,response)=>{
    const id=request.params.id
    const path=request.file.path
    const{from,to,sub,body}=request.body
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'dhruvgupta8272@gmail.com', // generated ethereal user
          pass: 'rqvxopvmcluwsdde', // generated ethereal password
        },
      });
      console.log('connected to smtp server')
        // send mail with defined transport object
  let info = await transporter.sendMail({
    from:from, // sender address
    to:to, // list of receivers
    subject:sub, // Subject line
    text:body, // plain text body
    //html: "<b>Hello world?</b>", // html body
    attachments:[{
      path:path
    }]
  });
  console.log('email sent')
  await Query.findByIdAndUpdate(id,{status:'Replied'})
  response.redirect('/admin/query')
}