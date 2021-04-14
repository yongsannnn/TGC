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
    flavour() {
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

const User = bookshelf.model("User", {
    tableName: "users",
    order() {
        return this.belongsToMany("Order")
    }
})

const Cart = bookshelf.model("Cart", {
    tableName: "carts",
    tea() {
        return this.belongsTo("Tea")
    },
    user() {
        return this.belongsTo("User")
    }
})

const BlacklistedToken = bookshelf.model("BlacklistedToken", {
    tableName: "blacklisted_tokens"
})

const Status = bookshelf.model("Status", {
    tableName: "status",
    order() {
        return this.belongsToMany("Order")
    }
})

const Order = bookshelf.model("Order", {
    tableName: "orders",
    user() {
        return this.belongsTo("User")
    },
    status() {
        return this.belongsTo("Status")
    }
})

const Purchase = bookshelf.model("Purchase", {
    tableName: "purchase",
    tea() {
        return this.belongsTo("Tea")
    },
    order() {
        return this.belongsTo("Order")
    }
})

module.exports = { Tea, Brand, Origin, Type, Package, Flavour, User, Cart, BlacklistedToken, Status, Order, Purchase }