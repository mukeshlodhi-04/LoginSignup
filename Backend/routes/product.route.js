const express = require('express');
const router= express.Router();
const {getProducts,getProduct,postProduct,updateProduct,deleteProduct} = require('../controller/product.controller');
const validate = require('../middlewares/productapi.validation');

router.get('/',validate,getProducts);
router.get('/:id',validate,getProduct);

router.post('/',validate,postProduct);

router.put('/id',validate,updateProduct);

router.delete('/id',validate,deleteProduct)

module.exports = router;