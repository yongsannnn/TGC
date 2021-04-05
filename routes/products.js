const express = require("express");
const router = express.Router();
const { bootstrapField, createProductForm } = require('../forms');

const { Tea } = require("../models")

// READ ALL
router.get("/", async (req, res) => {
    let teas = await Tea.collection().fetch();
    res.render("products/index", {
        "products": teas.toJSON()
    })
})


// CREATE
// GET
router.get("/create", async (req, res) => {
    const productForm = createProductForm();
    res.render("products/create", {
        "form": productForm.toHTML(bootstrapField)
    })
})

// POST
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

// DELETE
// GET
router.get("/:product_id/delete", async(req,res)=>{
    const product = await Tea.where({
        "id": req.params.product_id
    }).fetch({
        require: true
    })
    res.render("products/delete",{
        "product": product.toJSON()
    })
})

// POST
router.post("/:product_id/delete", async(req,res)=>{
    const product = await Tea.where({
        "id": req.params.product_id
    }).fetch({
        require: true
    })
    await product.destroy()
    res.redirect("/products")
})

module.exports = router; 