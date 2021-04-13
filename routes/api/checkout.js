const express = require("express")
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const CartServices = require("../../services/CartServices")
const bodyParser = require("body-parser")


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

    // Send the payment session id to a hbs file and use JS to redirect.
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
    console.log(endpointSecret)
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


module.exports = router;