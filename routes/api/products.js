const express = require("express")
const router = express.Router();
const productDAL = require("../../dal/products")


router.get("/", async (req, res) => {
    const allTeas = await productDAL.getAllTeas()
    res.send(allTeas)
})

router.post("/", async ( req,res)=> {
    const selectedTea = await productDAL.getTeaById(req.body.tea_id)
    res.send(selectedTea)
})

module.exports = router