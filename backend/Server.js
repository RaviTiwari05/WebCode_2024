const express =require('express')
const mongoose=require('mongoose')

require('dotenv').config()

const app=express()
const PORT =process.env.port || 5000;

mongoose
.connect(process.env.MONGODB_URL)
.then(()=>console.log(`Connected To MongoDB...`))
.catch((err)=> console.log(err))

app.listen(PORT, () => console.log(`listening on: ${PORT}`))
