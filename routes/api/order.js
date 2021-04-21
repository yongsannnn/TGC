const express = require("express")
const router = express.Router()
const { Order } = require("../../models")


router.get("/:user_id", async (req, res) => {
    let userId = req.params.user_id
    let orders = await Order.where({
        "user_id": userId
    }).fetchAll({
        require: false,
        withRelated: ["status"]
    })
    if (orders){
        res.send(orders)
    } else {
        res.send("No Orders")
    }
})
module.exports = router
