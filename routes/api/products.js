const express = require("express")
const router = express.Router();
const productDAL = require("../../dal/products")
const {Tea} = require("../../models")

router.get("/", async (req, res) => {
    const allTeas = await productDAL.getAllTeas()
    res.send(allTeas)
})

router.get("/:tea_id", async ( req,res)=> {
    const selectedTea = await productDAL.getTeaById(req.params.tea_id)
    res.send(selectedTea)
})

router.post("/search", async(req,res)=>{
    let name = req.body.name
    let q = Tea.collection();
    q = q.where("name", "like","%" + name + "%")
    const searchTea = await q.fetch({
        require: false,
        withRelated: ["flavour", "brand", "package", "origin", "type"]
    })
    res.send(searchTea)
})

module.exports = router