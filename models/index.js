const bookshelf = require("../bookshelf")

const Tea = bookshelf.model("Tea", {
    tableName: "teas",
    brand() {
        return this.belongsTo("Brand")
    },
    origin() {
        return this.belongsTo("Origin")
    },
    type() {
        return this.belongsTo("Type")
    }
})

const Brand = bookshelf.model("Brand", {
    tableName: "brands",
    tea() {
        return this.hasMany("Tea")
    }
})

const Origin = bookshelf.model("Origin", {
    tableName: "origins",
    tea() {
        return this.hasMany("Tea")
    }
})

const Type = bookshelf.model("Type", {
    tableName: "types",
    tea() {
        return this.hasMany("Tea")
    }
})

module.exports = { Tea, Brand, Origin, Type }