const exp=require('express')
const route=exp.Router()
const schema=require('../models/products')
const os=require('os')

route.get('/',async (req,res)=>{
    try{
        const data=await schema.find()
        res.status(200).send(data)
        console.log('GET api fetched /products')
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal server error')
    }
})

route.post('/',async (req,res)=>{
    try{
        const data=req.body
        const saving=new schema(data)
        const saved=await saving.save();
        res.status(200).send(saved)
        console.log(`new product added=${saving.name}`)
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal server error')
    }
})

route.put('/:id',async (req,res)=>{
    try{
        const {quantity, ...rest}=req.body

        const id=req.params.id

        const updated=await schema.findByIdAndUpdate(id,rest,{
            new:true,
            runValidators:true
        })
        console.log(`${updated.name} product updated`)
        res.status(200).send('record updated')
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal server error')
    }
})

route.delete('/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const deleted=await schema.findByIdAndDelete(id)
        if(!deleted){
            res.send('record not found')
        }
        res.status(200).send('deleted')
        console.log(`${deleted.name} product deleted`)
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal server error')
    }
})

route.get('/category/:category',async (req,res)=>{
    try{
        const data=req.params.category
        const response=await schema.find({category:data})
        if(!response){
            res.status(200).send('Invalid Category')
        }
        res.send(response)
        console.log(`GET by category API fetched by user name:${os.userInfo().username}`)
    }
    catch(err){
        console(err)
        res.send('Internal server error')
    }
})

route.get('/price/:price',async (req,res)=>{
    try{
        const data=req.params.price
        const response=await schema.find({price:{$lt:data}})
        if(!response){
            res.status(200).send('Items not available at this price')
        }
        res.send(response)
        console.log(`GET by price API fetched by user name:${os.userInfo().username}`)
    }
    catch(err){
        console.log(err)
        res.send('Internal server error')
    }
})

route.get('/low-stock',async (req,res)=>{
    try{
        const response=await schema.find({$expr:{$lte:["$quantity","$stockAlert"]}})
        if(response==null){
            res.send('All items stock is in good quantity')
        }
        res.status(200).send(response)
        console.log(`/low-stock API Fetched by user name:${os.userInfo().username}`)
    }
     catch(err){
        console.log(err)
        res.send('Internal server error')
    }
})


route.put('/:id/stock',async (req,res)=>{
    try{
        const product=await schema.findById(req.params.id)
        const {action,quantity}=req.body

        if(!["add","remove"].includes(action)){
            return res.send("Invalid action")
        }
        if(!product){
            return res.send('product not found')
        }
        if(action=="remove" && product.quantity<quantity){
            return res.send("insufficient stock")
        }
        if(action=="add"){
            product.quantity+=quantity
        }
        else{
            product.quantity-=quantity
        }
        await product.save()

        res.json({
            message:"Stock updated",
            product:{
                name:product.name,
                quantity:product.quantity
            }
        })
        console.log(`stock update API fetched by user name:${os.userInfo().username}`)
    }
    catch(err){
        console.log(err)
        res.send("Internal server error")
    }
})

module.exports=route