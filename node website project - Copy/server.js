const express=require('express')//express module refrence
const app=express()
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const userRouter=require('./routers/userrouter')//refrence of userrouter
const adminRouter=require('./routers/adminrouter')//refrence of adminrouter
const mongoose=require('mongoose')//refrence of mongoose package
const session=require('express-session')//refrence of session package
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)//link db with project






app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false
}))
app.use(userRouter)//call userrouter  ,for run=localhost:5000/
app.use('/admin',adminRouter)//call adminrouter and assigned prefix ,for run=localhost:5000/admin/
app.use(express.static('public'))//call public folder for all static files
app.set('view engine','ejs')//call views folder for html templates
app.listen(process.env.PORT,()=>{console.log(`server is running on port ${process.env.PORT}`)})//5000 port assigned