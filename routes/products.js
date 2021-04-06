const express = require("express");
const router = express.Router();
const { bootstrapField, createProductForm } = require('../forms');

const { Tea, Brand, Origin, Type, Package, Flavour } = require("../models")

// READ ALL
router.get("/", async (req, res) => {
    let teas = await Tea.collection().fetch({
        withRelated: ["brand","origin", "type", "package", "flavour"]
    });
    let teasJSON = teas.toJSON()
    let reversedTeas = [...teasJSON].reverse()
    res.render("products/index", {
        "products": reversedTeas
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
    const allPackages = await Package.fetchAll().map((p)=>{
        return [p.get("id"), p.get("name")]
    })
    const allFlavour = await Flavour.fetchAll().map((f)=>{
        return [f.get("id"), f.get("name")]
    })
    const productForm = createProductForm(allBrands, allOrigins, allTypes, allPackages, allFlavour);
    res.render("products/create", {
        "form": productForm.toHTML(bootstrapField)
    })
})

// POST
router.post("/create", async (req, res) => {
    const productForm = createProductForm();
    productForm.handle(req, {
        "success": async (form) => {
            let {flavour, ...productData} = form.data
            const newProduct = new Tea();
            newProduct.set(productData)
            await newProduct.save()
            if (flavour){
                await newProduct.flavour().attach(flavour.split(","))
            }
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
    const allPackages = await Package.fetchAll().map((p)=>{
        return [p.get("id"), p.get("name")]
    })
    const allFlavour = await Flavour.fetchAll().map((f)=>{
        return [f.get("id"), f.get("name")]
    })
    const product = await Tea.where({
        "id": req.params.product_id
    }).fetch({
        require: true,
        withRelated:["flavour"]
    })
    const productJSON = product.toJSON()
    const selectedFlavourId = productJSON.flavour.map(f=>f.id)
    const form = createProductForm(allBrands,allOrigins,allTypes,allPackages,allFlavour);
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
    form.fields.package_id.value = product.get("package_id")
    form.fields.flavour.value = selectedFlavourId

    res.render("products/update", {
        "form": form.toHTML(bootstrapField),
        "product": productJSON
    })
})


// POST 
router.post("/:product_id/update", async (req, res) => {
    const product = await Tea.where({
        "id": req.params.product_id
    }).fetch({
        require: true,
        withRelated: ["flavour"]
    })
    const productJSON = product.toJSON()
    const selectedFlavourId = productJSON.flavour.map(f=>f.id)
    const productForm = createProductForm();
    productForm.handle(req, {
        "success": async (form) => {
            let {flavour, ...productData} = form.data
            product.set(productData)
            await product.save()
            let newFlavourId = flavour.split(",")
            product.flavour().detach(selectedFlavourId)
            product.flavour().attach(newFlavourId)
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