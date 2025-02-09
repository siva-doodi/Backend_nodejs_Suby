const Vendor =require('../models/Vendor');
const jwt =require('jsonwebtoken');
const dotEnv =require('dotenv');

dotEnv.config()

const secretkey =process.env.WhatIsYourName

const verifyToken=async(req,re,next)=>{
    const token = req.headers.token;
    if(!token){
        return res.status(400).json({error:"TOken is Required"})
    }
    try{
        const decoded=jwt.verify(token,secretkey)
        const vendor =await Vendor.findById(decoded.vendorId);
        if(!vendor)
            {
                return res.status(404).json({error:"vendor not found"})
            }
        req.vendorId = vendor._id
        next()
    }catch(error){
        console.error(error)
        return res.status(500).json({error:"Invalid token"})

    }
}
module.exports = verifyToken