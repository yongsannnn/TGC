const express = require("express")
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const CartServices = require("../../services/CartServices")
const bodyParser = require("body-parser")
const { Order, User, Purchase } = require("../../models")


router.get("/:user_id", async (req, res) => {
    // Create Line Items -- Telling stripe what customer is paying for
    const cartServices = new CartServices(req.params.user_id)
    const allItems = await cartServices.getAll()
    let lineItems = []
    let meta = []
    for (let item of allItems) {
        const lineItem = {
            "name": item.related("tea").get("name"),
            "amount": item.related("tea").get("cost"),
            "quantity": item.get("quantity"),
            "currency": "SGD"
        }
        if (item.related("tea").get("image")) {
            lineItem.images = [item.related("tea").get("image")]
        }
        lineItems.push(lineItem)
        meta.push({
            "tea_id": item.get("tea_id"),
            "quantity": item.get("quantity")
        })
    }
    // Using Stripe -- Create the payment
    // stringify so that later we can use it
    let metaData = JSON.stringify(meta)
    const payment = {
        payment_method_types: ["card"],
        line_items: lineItems,
        success_url: process.env.STRIPE_SUCCESS_URL + "?sessionId={CHECKOUT_SESSION_ID}",
        cancel_url: process.env.STRIPE_ERROR_URL,
        metadata: {
            "orders": metaData
        }
    }

    // Register the payment
    let stripeSession = await stripe.checkout.sessions.create(payment);

    res.render("checkout/checkout", {
        "sessionId": stripeSession.id,
        "publishableKey": process.env.STRIPE_PUBLISHABLE_KEY
    })

})

// POST FOR STRIPE TO RETRIEVE DATA VIA WEBHOOK
router.post("/process_payment", bodyParser.raw({ type: "application/json" }), async (req, res) => {
    let payload = req.body
    let endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    let sigHeader = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sigHeader, endpointSecret)
    } catch (e) {
        res.send({
            "error": e.message
        })
        console.log(e.message)
    }
    if (event.type == "checkout.session.completed") {
        console.log(event.data.object)
    }
    res.sendStatus(200);
})

// Testing for orders
router.post("/order", async (req, res) => {
    // Create row for Order table with status 2 (Paid) 
    const newOrder = new Order()
    const user = await User.where({
        "email": req.body.data.object.customer_details.email
    }).fetch({
        require: false
    })
    let user_id = user.get("id")
    newOrder.set("user_id", user_id)
    newOrder.set("status_id", 2)
    newOrder.set("total_cost", req.body.data.object.amount_total)
    await newOrder.save()


    // Get latest order_id
    const order = await Order.collection().where({
        "user_id": user_id
    }).fetch({
        require: false
    })
    let lastIndex = order.length - 1
    orderJSON = order.toJSON()
    const order_id = orderJSON[lastIndex].id
    console.log(order_id)

    // Add items to purchases table
    let items = req.body.data.object.metadata.orders
    items = JSON.parse(items)
    for (let i of items) {
        const newPurchase = new Purchase();
        newPurchase.set("tea_id", i.tea_id)
        newPurchase.set("quantity", i.quantity)
        newPurchase.set("order_id", order_id)
        newPurchase.save()
    }

    // Delete items from cart
    // Find all items that matches
    const cartServices = new CartServices(user_id)
    for( let i of items) {
        await cartServices.removeItem(i.tea_id)
    }
    
    res.status(200)
    res.send(orderJSON[lastIndex])
})

module.exports = router;