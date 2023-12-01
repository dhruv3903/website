const mongoose=require('mongoose')

const testiSchema={
    img:String,
    reviews:String,
    name:String,
    status:{type:String,default:'Unpublished'},
    postedDate:{type:Date,default: new Date()}
}


module.exports=mongoose.model('testi',testiSchema)