const express = require("express");
const router= express.Router();
const  controller=require("../controller/user.controllers")

router.post("/register",controller.register)
router.post("/login",controller.login)

// router.get("/",controller.login)
router.get("/:id",controller.get)
router.post("/verify",controller.verifyUser)
// router.delete("/:id",controller.destroy)
// router.put("/:id",controller.update)





module.exports=router;