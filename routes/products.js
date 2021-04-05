const express = require("express");
const router = express.Router();
const { bootstrapField, createProductForm } = require('../forms');

const { Tea } = require("../models")

router.get("/", async (req, res) => {
    let teas = await Tea.collection().fetch();
    res.render("products/index", {
        "products": teas.toJSON()
    })
})

router.get("/create", async (req, res) => {
    const productForm = createProductForm();
    res.render("products/create", {
        "form": productForm.toHTML(bootstrapField)
    })
})

router.post("/create", async (req, res) => {
    const productForm = createProductForm();
    productForm.handle(req,{
        "success": async(form) => {
            const newProduct = new Tea();
            newProduct.set(form.data)
            await newProduct.save()
            res.redirect("/products")
        },
        "error": (form) => {
            res.render("products/create", {
                "form": form.toHTML(bootstrapField)
            })
        }
    })
})

module.exports = router; 