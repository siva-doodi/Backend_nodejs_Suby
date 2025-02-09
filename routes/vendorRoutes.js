const VendorController=require('../controllers/vendorController.js');
const express =require('express');



const router =express.Router();


router.post('/register', VendorController.vendorRegister);
router.post('/login',VendorController.vendorLogin);
router.get('/all-vendors',VendorController.getAllVendors);
router.get('/single-vendor/:id',VendorController.getVendorsById);
module.exports =router;
