const express = require("express");
const router = express.Router();
const { bootstrapField, createProductForm } = require('../forms');

const { Tea, Brand, Origin, Type } = require("../models")

// READ ALL
router.get("/", async (req, res) => {
    let teas = await Tea.collection().fetch({
        withRelated: ["brand","origin", "type"]
    });
    res.render("products/index", {
        "products": teas.toJSON()
    })
})


// CREATE
// GET
router.get("/create", async (req, res) => {
    const allBrands = await Brand.fetchAll().map((b)=>{
        return [b.get("id"), b.get("name")]
    })
    const allOrigins = await Origin.fetchAll().map((o)=>{
        return [o.get("id"), o.get("name")]
    })
    const allTypes = await Type.fetchAll().map((t)=>{
        return [t.get("id"), t.get("name")]
    })
    const productForm = createProductForm(allBrands, allOrigins, allTypes);
    res.render("products/create", {
        "form": productForm.toHTML(bootstrapField)
    })
})

// POST
router.post("/create", async (req, res) => {
    const productForm = createProductForm();
    productForm.handle(req, {
        "success": async (form) => {
            const newProduct = new Tea();
            newProduct.set(form.data)
            await newProduct.save()
            req.flash("success_msg", "New tea has been added.")
            res.redirect("/products")
        },
        "error": (form) => {
            res.render("products/create", {
                "form": form.toHTML(bootstrapField)
            })
        }
    })
})

// UPDATE
// GET 
router.get("/:product_id/update", async (req, res) => {
    const allBrands = await Brand.fetchAll().map((b)=>{
        return [b.get("id"), b.get("name")]
    })
    const allOrigins = await Origin.fetchAll().map((o)=>{
        return [o.get("id"), o.get("name")]
    })
    const allTypes = await Type.fetchAll().map((t)=>{
        return [t.get("id"), t.get("name")]
    })
    const product = await Tea.where({
        "id": req.params.product_id
    }).fetch({
        require: true
    })

    const form = createProductForm(allBrands,allOrigins,allTypes);
    form.fields.name.value = product.get("name")
    form.fields.cost.value = product.get("cost")
    form.fields.description.value = product.get("description")
    form.fields.ingredient.value = product.get("ingredient")
    form.fields.water_temperature.value = product.get("water_temperature")
    form.fields.steep_time.value = product.get("steep_time")
    form.fields.serving.value = product.get("serving")
    form.fields.stock.value = product.get("stock")
    form.fields.image.value = product.get("image")
    form.fields.brand_id.value = product.get("brand_id")
    form.fields.origin_id.value = product.get("origin_id")
    form.fields.type_id.value = product.get("type_id")

    res.render("products/update", {
        "form": form.toHTML(bootstrapField),
        "product": product.toJSON()
    })
})


// POST 
router.post("/:product_id/update", async (req, res) => {
    const product = await Tea.where({
        "id": req.params.product_id
    }).fetch({
        require: true
    })
    const productForm = createProductForm();
    productForm.handle(req, {
        "success": async (form) => {
            product.set(form.data)
            await product.save()
            req.flash("success_msg", "Selected tea has been updated.")
            res.redirect("/products")
        },
        "error": async (form) => {
            res.render("products/update", {
                "form": form.toHTML(bootstrapField),
            })
        }
    })
})

// DELETE
// GET
router.get("/:product_id/delete", async (req, res) => {
    const product = await Tea.where({
        "id": req.params.product_id
    }).fetch({
        require: true
    })
    res.render("products/delete", {
        "product": product.toJSON()
    })
})

// POST
router.post("/:product_id/delete", async (req, res) => {
    const product = await Tea.where({
        "id": req.params.product_id
    }).fetch({
        require: true
    })
    await product.destroy()
    req.flash("success_msg", "Selected tea has been deleted.")
    res.redirect("/products")
})

module.exports = router; 