const { Cart } = require("../models")
const cartDAL = require("../dal/cart")


class CartServices {
    constructor(user_id) {
        this.user_id = user_id
    }

    async getAll() {
        return await cartDAL.getAllItems(this.user_id)
    }

    async addToCart(productId) {
        // Check if item is already in cart
        const cartItems = await cartDAL.getItemByUserAndProduct(this.user_id, productId)
        // If false, create and save into cart
        if (!cartItems) {
            let newCartItem = new Cart();
            newCartItem.set("user_id", this.user_id)
            newCartItem.set("tea_id", productId)
            newCartItem.set("quantity", 1)
            await newCartItem.save()
            return newCartItem
        } else {
            // If true, add quantity by 1 
            cartItems.set("quantity", cartItems.get("quantity") + 1)
            console.log(cartItems.toJSON())
            await cartItems.save()
            return cartItems
        }
    }

    async removeItem(productId) {
        return await cartDAL.removeItem(this.user_id, productId)
    }

    async updateQuantity(productId, newQuantity) {
        return await cartDAL.updateQuantity(this.user_id, productId, newQuantity)
    }
}

module.exports = CartServices