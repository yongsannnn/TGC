const jwt=require("jsonwebtoken")


const checkIfAuthenticated = (req, res, next) => {
    if (req.session.user) {
        // If session contains a user, go next
        next()
    } else {
        req.flash("error_msg", "Please login first.")
        res.redirect("/users/login")
    }
}

const checkIfAuthenticatedJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                res.sendStatus(403)
            }
            req.user = user;
            next();
        })
    } else {
        res.status(401)
        res.send({
            "Message": "Login Required"
        })
    }
}

module.exports = { checkIfAuthenticated, checkIfAuthenticatedJWT }
