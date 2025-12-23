const exp=require('express')
const app=exp();
const bp=require('body-parser')
app.use(bp.json())
const db=require('./config/db')
const route=require('./routes/productsRoute')
require('dotenv').config()

app.get('/',(req,res)=>{
    res.send('Welcome to Product Inventory API Manager...')
})
app.use('/products',route)

const port=process.env.port || 3000;

app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})