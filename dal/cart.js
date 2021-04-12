const { Cart } = require("../models") 

const getAllItems = async (userId) => {
    return await Cart.collection().where({
        "user_id": userId
    }).fetch({
        require: false,
        withRelated: ["tea", "tea.brand", "tea.origin", "tea.type", "tea.package"]
    })
}

const getItemByUserAndProduct = async (userId, productId) => {
    return await Cart.where({
        "user_id": userId,
        "tea_id": productId
    }).fetch({
        require: false,
    })
}

const removeItem = async (userId, productId) => {
    const item = await getItemByUserAndProduct(userId, productId)
    if (item){
        item.destroy();
        return true
    }
    return false
}

const updateQuantity = async (userId, productId, newQuantity) => {
    const item = await getItemByUserAndProduct(userId, productId)
    if (item){
        item.set("quantity", newQuantity)
        item.save()
        return item
    } else {
        return null
    }
}

module.exports = { getAllItems, getItemByUserAndProduct, removeItem, updateQuantity }