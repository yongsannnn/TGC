const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const { User } = require("../../models")

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, {
        "expiresIn": "1h"
    })
}

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash("sha256")
    const hash = sha256.update(password).digest("base64")
    return hash
}

router.post("/login", async (req,res)=>{
    let user = await User.where({
        "email": req.body.email
    }).fetch({
        require: false
    })
    if (user && user.get("password") == getHashedPassword(req.body.password)){
        let accessToken = generateAccessToken({
            "name": user.get("name"),
            "email": user.get("email"),
            "id": user.get("id")
        })
        res.send({accessToken})
    } else {
        res.status(401)
        res.send({
            "Error": "Invalid Email/Password"
        })
    }
})


module.exports = router