const express = require("express")
const router = express.Router();
const { Order, Status, Purchase } = require("../models")
const { bootstrapField, bootstrapFieldCol6, createUpdateOrderForm, } = require('../forms');

// GET
// ALL ORDERS
router.get("/", async (req, res) => {
    // Get all orders
    const allOrders = await Order.collection().fetch({
        withRelated: ["status"]
    })
    allOrdersJSON = allOrders.toJSON()

    // Slice the date for better presentation
    for (let i of allOrdersJSON) {
        i.date_of_order = String(i.date_of_order).slice(4, 15)
        if (i.date_of_completion != null) {
            i.date_of_completion = String(i.date_of_completion).slice(4, 15)
        }
    }
    res.render("orders/index", {
        "orders": allOrdersJSON
    })
})


// INDIVIDUAL ORDER
router.get("/:order_id", async (req, res) => {
    const order = await Order.where({
        "id": req.params.order_id
    }).fetch({
        require: true,
        withRelated: ["status"]
    })
    const allStatus = await Status.fetchAll().map(s => {
        return [s.get("id"), s.get("name")]
    })

    const orderJSON = order.toJSON()
    // Slice the date for better presentation
    orderJSON.date_of_order = String(orderJSON.date_of_order).slice(4, 15)
    if (orderJSON.date_of_completion != null) {
        orderJSON.date_of_completion = String(orderJSON.date_of_completion).slice(4, 15)
    }
    const form = createUpdateOrderForm(allStatus)
    form.fields.order_id.value = order.get("id")
    form.fields.recipient_name.value = order.get("recipient_name")
    form.fields.recipient_address.value = order.get("recipient_address")
    form.fields.total_cost.value = order.get("total_cost")
    form.fields.date_of_order.value = order.get("date_of_order")
    form.fields.date_of_completion.value = order.get("date_of_completion")
    form.fields.user_id.value = order.get("user_id")
    form.fields.status_id.value = order.get("status_id")
    
    // Get all the items related to this order
    const items = await Purchase.where({
        "order_id": req.params.order_id
    }).fetchAll({
        withRelated: ["tea", "tea.brand", "tea.origin", "tea.type", "tea.package", "tea.flavour"]
    })
    res.render("orders/update", {
        "form": form.toHTML(bootstrapField),
        "order": orderJSON,
        "items": items.toJSON()
    })
})



module.exports = router;