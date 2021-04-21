const express = require("express")
const router = express.Router()
const { Order, Purchase } = require("../../models")


router.get("/:user_id", async (req, res) => {
    let userId = req.params.user_id
    let orders = await Order.where({
        "user_id": userId
    }).fetchAll({
        require: false,
        withRelated: ["status"]
    })
    if (orders) {
        res.send(orders)
    } else {
        res.send("No Orders")
    }
})

router.get("/ind/:order_id", async (req, res) => {
    let orderId = req.params.order_id
    let purchases = await Purchase.where({
        "order_id": orderId
    }).fetchAll({
        require: false,
        withRelated: ["tea", "tea.brand", "tea.origin", "tea.type", "tea.package", "tea.flavour", "order"]
    })
    res.send(purchases)
    
})
module.exports = router
