const express = require("express")
const router = express.Router();
const { Order, Status, Purchase } = require("../models")
const { bootstrapField, createUpdateOrderForm, } = require('../forms');
const { checkIfAuthenticated } = require("../middleware")
const OrdersServices = require("../services/OrdersServices")
const orderDAL = require("../dal/orders")

// GET
// ALL ORDERS
router.get("/", checkIfAuthenticated, async (req, res) => {
    // Get all orders
    const ordersServices = new OrdersServices()
    const allOrders = await ordersServices.getAll()
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


// GET
// INDIVIDUAL ORDER
router.get("/:order_id", checkIfAuthenticated, async (req, res) => {
    const order = await orderDAL.getOrderById(req.params.order_id)
    const allStatus = await orderDAL.getAllStatus()

    const orderJSON = order.toJSON()
    // Slice the date for better presentation
    orderJSON.date_of_order = String(orderJSON.date_of_order).slice(4, 15)
    if (orderJSON.date_of_completion != null) {
        orderJSON.date_of_completion = String(orderJSON.date_of_completion).slice(4, 15)
    }
    const form = createUpdateOrderForm(allStatus)
    form.fields.status_id.value = order.get("status_id")

    // Get all the items related to this order
    const items = await orderDAL.getPurchaseById(req.params.order_id)
    res.render("orders/update", {
        "form": form.toHTML(bootstrapField),
        "order": orderJSON,
        "items": items.toJSON()
    })
})

// POST 
// INDIVIDUAL ORDER
router.post("/:order_id", checkIfAuthenticated, async (req, res) => {
    const order = await orderDAL.getOrderById(req.params.order_id)
    const allStatus = await orderDAL.getAllStatus()
    const form = createUpdateOrderForm(allStatus)
    form.handle(req, {
        "success": async (form) => {
            // Update status
            order.set(form.data)
            // If status is delivered, add date now to completion date. 
            if (order.get("status_id") == "4") {
                order.set("date_of_completion", new Date())
            } else {
                // Safeguard if changed from 4 to other num
                order.set("date_of_completion", null)
            }
            await order.save()
            req.flash("success_msg", "Order has been updated.")
            res.redirect("/orders")
        },
        "error": async (form) => {
            res.render("orders/update", {
                "form": form.toHTML(bootstrapField)
            })
        }
    })
})

// DELETE 
// GET
router.get("/:order_id/delete", checkIfAuthenticated, async (req, res) => {
    const order = await orderDAL.getOrderById(req.params.order_id)
    res.render("orders/delete", {
        "order": order.toJSON()
    })
})

router.post("/:order_id/delete", checkIfAuthenticated, async (req, res) => {
    const order = await orderDAL.getOrderById(req.params.order_id)
    await order.destroy()
    req.flash("success_msg", "Order has been deleted.")
    res.redirect("/orders")
})

module.exports = router;