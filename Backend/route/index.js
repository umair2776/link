const express = require('express');
const router = express.Router();
const productRouter=require("./product.route")
const controller = require('../controller/user.controllers');  // Ensure this path is correct

// User routes
router.use("/product",productRouter)
router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;
