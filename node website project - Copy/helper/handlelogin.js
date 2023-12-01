function handlelogin(request,response,next){
    if(request.session.isAuth){
        next()
    }else{
        response.redirect('/admin/')
    }
}


module.exports=handlelogin