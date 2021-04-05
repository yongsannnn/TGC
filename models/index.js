const bookshelf = require("../bookshelf")

const Tea = bookshelf.model("Tea", {
    tableName: "teas",
    brand(){
        return this.belongsTo("Brand")
    }
})

const Brand = bookshelf.model("Brand", {
    tableName: "brands",
    tea(){
        return this.hasMany("Tea")
    }
})


module.exports = { Tea, Brand }