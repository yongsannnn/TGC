const express = require("express")
const router = express.Router();
const productDAL = require("../../dal/products")


router.get("/", async (req, res) => {
    const allTeas = await productDAL.getAllTeas()
    res.send(allTeas)
})

module.exports = router