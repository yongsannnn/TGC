const checkIfAuthenticated = (req, res, next) => {
    if (req.session.user) {
        // If session contains a user, go next
        next()
    } else {
        req.flash("error_msg", "Please login first.")
        res.redirect("/users/login")
    }
}

module.exports = { checkIfAuthenticated }
