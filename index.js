const express =require('express');
const dotEnv =require('dotenv');
const mongoose =require('mongoose');
const bodyParser =require('body-parser');
const vendorRoutes =require('./routes/vendorRoutes')
const firmRoutes =require('./routes/firmRoutes')
const productRoutes =require('./routes/productRoutes')
const cors =require('cors');
const path = require('path')
const port = process.env.PORT || 4000;
const app=express()
app.use(cors())
dotEnv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongodb connected suceesfully"))
.catch((error)=>console.log(error))
app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));
app.listen(port, ()=>{
    console.log(`SERVER STARTeD ${port}`)
})

app.use('/',(req,res)=>{
    res.send("<h1>WELCOME SUBY</h1>")
})