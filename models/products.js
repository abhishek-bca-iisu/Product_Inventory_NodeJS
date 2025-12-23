const mong=require('mongoose')

const schema=new mong.Schema({
    name:{
        type:String,
        required:true
    },
    product_id:{
        type:String,
        unique:true,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    quantity:{
        type:Number,
        required:true
    },
    stockAlert:{
        type:Number,
        reuired:true
    },
    supplier:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const product=mong.model('products',schema)

module.exports=product