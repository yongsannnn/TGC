const express = require("express");
const router = express.Router();


const { Tea } = require("../models")

router.get("/",async (req,res)=>{
    let teas = await Tea.collection().fetch();
    res.render("products/index",{
        "products": teas.toJSON()
    })
})


module.exports = router; 