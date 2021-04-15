const express = require("express")
const router = express.Router();
const { Order } = require("../models")


// GET
// ALL ORDERS
router.get("/", async (req, res) => {
    // Get all orders
    const allOrders = await Order.collection().fetch({
        withRelated: ["status"]
    })
    allOrdersJSON = allOrders.toJSON()

    // Slice the date for better presentation
    for (let i of allOrdersJSON){
        i.date_of_order = String(i.date_of_order).slice(4,15)
        if(i.date_of_completion != null){
            i.date_of_completion = String(i.date_of_completion).slice(4,15)
        }
    }
    res.render("orders/index", {
        "orders": allOrdersJSON
    })
})






module.exports = router;