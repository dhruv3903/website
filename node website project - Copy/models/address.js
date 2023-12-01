const mongoose=require('mongoose')


const addSchema=mongoose.Schema({
    name:String,
    address:String,
    telephone:Number,
    phone:Number,
    email:String,
    instagram:String,
    twitter:String,
    linkedin:String,
    about:String
})
module.exports=mongoose.model('address',addSchema)