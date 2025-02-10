const Firm = require('../models/Firm');
const Product =require('../models/Product');

const multer =require("multer");
const path =require ('path');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
     cb(null,'uploads/');
    },
     filename: (req, file, cb) => {
       cb(null, Date.now() + Path.extname(file.originalname));
     }
   });
 const upload =multer({storage:storage});


 const addProduct=async(req,res)=>{
    try{
        const {productName,price,category,bestseller,description}=req.body
        const image =req.file? req.file.filename:undefined;
        const firmId=req.params.firmId;
        const firm =await Firm.findById(firmId)
        if(!firm){
            return res.status(400).json({error:"No Firm Found"})
        }
        const product =new Product({
            productName,price,category,bestseller,description,image,firm:firm._id
        })
        const savedProduct = await product.save()
        firm.products.push(savedProduct);
        await firm.save()
        res.status(200).json(savedProduct)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
   
 }
const getProductByFirm = async(req,res)=>{
    try{
        const firmId =req.params.firmId;
        const firm = await Firm.findById(firmId)
        if(!firm){
            return res.status(400).json({error:"no Firm Founds"})
        }
        const restaurentName =firm.firstName;

        const product = await Product.find({firm:firmId});
        res.status(200).json({restaurentName ,product})
    }catch(error){

        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const deleteProductById=async(req,res)=>{
    
    try{
        const productId=req.params.productId;
        const deletedproduct= await Product.findByIdAndDelete(productId)
        if(!deletedproduct){
            return res.status(404).json({error:"product not found"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }

}
 module.exports ={addProduct:[upload.single('image'),addProduct],getProductByFirm ,deleteProductById};