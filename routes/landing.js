const express = require("express")


// Create a new express router
const router = express.Router();

router.get("/", (req,res)=>{
    res.render("home/index")
})






module.exports = router;