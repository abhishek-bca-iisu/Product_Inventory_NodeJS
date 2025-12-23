const mong=require('mongoose')
require('dotenv').config()
const url=process.env.url

mong.connect(url)
.then(()=>{console.log('MongoDB connected!!')})
.catch(err=>{console.log(err)})

const db=mong.connection

module.exports=db;