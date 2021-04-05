const bookshelf = require("../bookshelf")

const Tea = bookshelf.model("Tea", {
    tableName: "teas"
})


module.exports = { Tea }