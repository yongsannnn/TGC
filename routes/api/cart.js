const express = require("express")
const router = express.Router();
const { Cart } = require("../../models")
const CartServices = require("../../services/CartServices")

// GET all items in the cart based on user_id
router.get("/:user_id", async (req, res) => {
    let cartServices = new CartServices(req.params.user_id)
    try {
        const cartItems = await cartServices.getAll()
        res.status(200)
        res.send(cartItems.toJSON())
    } catch (e) {
        res.status(500)
        res.send("Unable to get all items.")
    }
})

// ADD item into user's shopping cart
router.get("/:user_id/:tea_id/add", async (req, res) => {
    let cartServices = new CartServices(req.params.user_id)
    try {
        await cartServices.addToCart(req.params.tea_id)
        res.status(200)
        res.send("Item has been added to your cart.")
    } catch (e) {
        res.status(500)
        res.send("Unable to add item.")
    }
})

// REMOVE
router.get("/:user_id/:tea_id/remove", async (req, res) => {
    let cartServices = new CartServices(req.params.user_id)
    try {
        await cartServices.removeItem(req.params.tea_id)
        res.status(200)
        res.send("Item removed from cart.")
    } catch (e) {
        res.status(204)
        res.send("Item not found.")
    }
})


// UPDATE
router.post("/:user_id/:tea_id/update", async (req, res) => {
    let cartServices = new CartServices(req.params.user_id)
    try {
        await cartServices.updateQuantity(req.params.tea_id, req.body.quantity)
        res.status(200)
        res.send("Item quantity updated.")
    } catch (e) {
        res.status(204)
        res.send("Item not found.")
    }
})

module.exports = router; 
