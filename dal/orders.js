const { Order, Status, Purchase } = require("../models")

const getAllOrders = async () => {
    return await Order.collection().fetch({
        withRelated: ["status"]
    })
}

const getAllStatus = async () => {
    const allStatus = await Status.fetchAll().map(s => {
        return [s.get("id"), s.get("name")]
    })
    return allStatus
}

const getOrderById = async (id) => {
    return await Order.where({
        "id": id
    }).fetch({
        require: true,
        withRelated: ["status"]
    })
}

const getPurchaseById = async (id) => {
    return await Purchase.where({
        "order_id": id
    }).fetchAll({
        withRelated: ["tea", "tea.brand", "tea.origin", "tea.type", "tea.package", "tea.flavour"]
    })
}
module.exports = {
    getAllOrders, getAllStatus, getOrderById, getPurchaseById
}