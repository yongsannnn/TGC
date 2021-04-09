const express = require("express")
const router = express.Router();
const crypto = require("crypto")
const { User } = require("../models")


const { createUserForm, bootstrapField, createLoginForm, createUpdateUserForm } = require("../forms")

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash("sha256")
    const hash = sha256.update(password).digest("base64")
    return hash
}

// Register 
router.get("/register", (req, res) => {
    const registrationForm = createUserForm();

    res.render("users/register", {
        form: registrationForm.toHTML(bootstrapField)
    })
})

router.post("/register", (req, res) => {
    const registrationForm = createUserForm();
    registrationForm.handle(req, {
        "success": async (form) => {
            let checkEmail = await User.where({
                "email": form.data.email
            }).fetch({
                required: false
            })
            if (checkEmail) {
                req.flash("error_msg", "Email already in used. ")
                res.redirect("/users/register")
            } else {
                let { confirm_password, ...userData } = form.data
                userData.password = getHashedPassword(userData.password)
                const user = new User(userData)
                await user.save();
                req.flash("success_msg", "New user created")
                res.redirect("/users/login")
            }
        },
        "error": (form) => {
            res.render("users/register", {
                "form": form.toHTML(bootstrapField)
            })
        }
    })
})


// Login
router.get("/login", (req, res) => {
    const loginForm = createLoginForm()
    res.render("users/login", {
        "form": loginForm.toHTML(bootstrapField)
    })
})

router.post("/login", (req, res) => {
    const loginForm = createLoginForm()
    loginForm.handle(req, {
        "success": async (form) => {
            // Finding user based on email address
            let user = await User.where({
                "email": form.data.email
            }).fetch({
                require: false //If the user don't exist, continue with code
            })

            // If user exist, check password
            if (user) {
                if (user.get("password") == getHashedPassword(form.data.password)) {
                    // Saving data into session
                    req.session.user = {
                        id: user.get("id"),
                        name: user.get("name"),
                        email: user.get("email")
                    }
                    req.flash("success_msg", `Hi ${req.session.user.name}.`)
                    res.redirect("/products")
                } else {
                    req.flash("error_msg", "Login failed, check credentials.")
                    res.redirect("/users/login")
                }
            } else {
                req.flash("error_msg", "Login failed, check credentials.")
                res.redirect("/users/login")
            }
        },
        "error": (form) => {
            res.render("users/login", {
                "form": form.toHTML(bootstrapField)
            })
        }
    })
})

// Logout
router.get("/logout", (req, res) => {
    req.session.user = null
    req.flash("success_msg", "Logout successful.")
    res.redirect("/users/login")
})

// Update Profile
router.get("/profile", async (req, res) => {
    if (req.session.user == undefined) {
        // If user not logged in, ask him to log in first. 
        req.flash("error_msg", "Please login first.")
        res.redirect("/users/login")
    } else {
        const user = await User.where({
            "email": req.session.user.email
        }).fetch({
            require: false
        })
        // Create profile form 
        const form = createUpdateUserForm()
        // Fill in all the value
        form.fields.name.value = user.get("name")
        form.fields.email.value = user.get("email")
        form.fields.date_of_birth.value = user.get("date_of_birth")
        form.fields.contact_number.value = user.get("contact_number")
        form.fields.address.value = user.get("address")
        // Render page

        res.render("users/profile", {
            "form": form.toHTML(bootstrapField)
        })
    }
})

router.post("/profile", async (req, res) => {
    const user = await User.where({
        "email": req.session.user.email
    }).fetch({
        require: true
    })
    const form = createUpdateUserForm()
    form.handle(req,{
        "success": async(form)=>{
            let {confirm_password, ...userData} = form.data
            userData.password = getHashedPassword(userData.password)
            user.set(userData)
            await user.save()
            req.session.user = {
                        id: user.get("id"),
                        name: user.get("name"),
                        email: user.get("email")
                    }
            req.flash("success_msg", "Profile has been updated") 
            res.redirect("/products")
        },
        "error": async (form) => {
            res.render("users/profile", {
                "form": form.toHTML(bootstrapField)
            })
        }
    })
})
module.exports = router