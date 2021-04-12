const express = require("express")
const router = express.Router();
const { Cart } = require("../../models")

// GET all items in the cart based on user_id
router.get("/:user_id", async (req, res) => {
    const cartItems = await Cart.collection().where({
        "user_id": req.params.user_id
    }).fetch({
        require: false,
        withRelated: ["tea", "tea.brand", "tea.origin", "tea.type", "tea.package"]
    })
    res.status(200)
    res.send(cartItems.toJSON())
})

// ADD item into user's shopping cart
router.get("/:user_id/:tea_id/add", async (req, res) => {
    // Check if item is already in cart
    const cartItems = await Cart.where({
        "user_id": req.params.user_id,
        "tea_id": req.params.tea_id
    }).fetch({
        require: false,
    })
    // If false, create and save into cart
    if (!cartItems) {
        let newCartItem = new Cart();
        newCartItem.set("user_id", req.params.user_id)
        newCartItem.set("tea_id", req.params.tea_id)
        newCartItem.set("quantity", 1)
        await newCartItem.save()
        res.status(200)
        res.send("Tea has been added to your cart")
    } else {
        // If true, add quantity by 1 
        cartItems.set("quantity", cartItems.get("quantity") + 1)
        console.log(cartItems.toJSON())
        await cartItems.save()
        res.status(200)
        res.send("Added one more tea to your cart")
    }
})

// REMOVE
router.get("/:user_id/:tea_id/remove", async (req, res) => {
    // Get item based on id 
    const cartItems = await Cart.where({
        "user_id": req.params.user_id,
        "tea_id": req.params.tea_id
    }).fetch({
        require: false,
    })

    if (cartItems) {
        // If item exist, destroy
        cartItems.destroy()
        res.status(200)
        res.send("Item removed from cart.")
    } else {
        res.status(204)
        res.send("Item not found.")
    }
})


// UPDATE
router.post("/:user_id/:tea_id/update", async (req, res) => {
    // Get item based on id 
    const cartItems = await Cart.where({
        "user_id": req.params.user_id,
        "tea_id": req.params.tea_id
    }).fetch({
        require: false,
    })
    
    if (cartItems){
        cartItems.set("quantity", req.body.quantity)
        await cartItems.save()
        res.status(200)
        res.send("Item quantity updated from cart.")
    } else {
        res.status(204)
        res.send("Item not found.")
    }
})

module.exports = router; 
