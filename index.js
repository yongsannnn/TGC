const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const session = require("express-session")
const flash = require("connect-flash")

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
    express.urlencoded({
        extended: false
    })
);

// setup session
app.use(session({
    "secret": "nil",
    "resave": false,
    "saveUninitialized": true
}))

// setup flash
app.use(flash())


// setup global middleware
app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

// import routes
const landingRoutes = require("./routes/landing")
const productRoutes = require("./routes/products")


function main() {
    app.use("/", landingRoutes)
    app.use("/products", productRoutes)
}

main()

app.listen(3000, () => {
    console.log("Server has started");
});