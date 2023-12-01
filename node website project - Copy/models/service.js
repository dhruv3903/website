const mongoose=require('mongoose')


const serviceSchema=mongoose.Schema({
    img:String,
    title:String,
    desc:String,
    more:String,
    status:{type:String,default:'Unpublished'}
})

module.exports=mongoose.model('service',serviceSchema)