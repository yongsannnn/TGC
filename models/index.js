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
    },
    package() {
        return this.belongsTo("Package")
    },
    flavour(){
        return this.belongsToMany("Flavour")
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

const Package = bookshelf.model("Package", {
    tableName: "packages",
    tea() {
        return this.hasMany("Tea")
    }
})

const Flavour = bookshelf.model("Flavour", {
    tableName: "flavours",
    tea() {
        return this.belongsToMany("Tea")
    }
})

module.exports = { Tea, Brand, Origin, Type, Package, Flavour }