const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const session = require("express-session")
const flash = require("connect-flash")
const csurf = require("csurf")

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
    "secret": process.env.SESSION_SECRET_KEY,
    "resave": false,
    "saveUninitialized": true
}))

// setup flash
app.use(flash())

// setup CSURF (LINE MUST BE BELOW SESSION)
const csurfInstance = csurf();
app.use(function (req, res, next) {
    // Exclude CSRF from these URL
    if (req.url.slice(0, 5) == "/api/" || req.url.slice(0, 15) == "/users/register" ) {
        return next();
    }
    csurfInstance(req, res, next);
})

app.use(function (err, req, res, next) {
    console.log(err)
    if (err && err.code == "EBADCSRFTOKEN") {
        req.flash("error_messages", "Form has expired.")
        res.redirect("back");
    } else {
        next()
    }
})

// setup global middleware
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

//Global middleware to inject the req.session.use object into the local variable, which are accessible by hbs_files
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next()
})

app.use(function (req, res, next) {
    if (req.csrfToken) {
        res.locals.csrfToken = req.csrfToken();
    }
    next()
})

// import routes
const landingRoutes = require("./routes/landing")
const productRoutes = require("./routes/products")
const userRoutes = require("./routes/users")

// API routes
const api = {
    "cart": require("./routes/api/cart"),
    "checkout": require("./routes/api/checkout"),
    "users": require("./routes/api/users")
}
function main() {
    app.use("/", landingRoutes)
    app.use("/products", productRoutes)
    app.use("/users", userRoutes)
    app.use("/api/checkout", express.json(), api.checkout)
    app.use("/api/cart", express.json(), api.cart)
    app.use("/api/user", express.json(), api.users)
}

main()

app.listen(3000, () => {
    console.log("Server has started");
});