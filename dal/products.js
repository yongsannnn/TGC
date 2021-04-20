const { Tea, Brand, Origin, Type, Package, Flavour } = require("../models")

const getAllTeas = async () => {
    return await Tea.fetchAll()
}

const getAllBrands = async () => {
    const allBrands = await Brand.fetchAll().map((b) => {
        return [b.get("id"), b.get("name")]
    })
    return allBrands
}

const getAllOrigins = async () => {
    const allOrigins = await Origin.fetchAll().map((o) => {
        return [o.get("id"), o.get("name")]
    })
    return allOrigins
}

const getAllTypes = async () => {
    const allTypes = await Type.fetchAll().map((t) => {
        return [t.get("id"), t.get("name")]
    })
    return allTypes
}

const getAllPackages = async () => {
    const allPackages = await Package.fetchAll().map((p) => {
        return [p.get("id"), p.get("name")]
    })
    return allPackages
}

const getAllFlavours = async () => {
    const allFlavour = await Flavour.fetchAll().map((f) => {
        return [f.get("id"), f.get("name")]
    })
    return allFlavour
}
const getTeaById = async (id) => {
    const tea = await Tea.where({
        "id": id
    }).fetch({
        require: true,
        withRelated: ["flavour", "brand", "package", "origin", "type"]
    })
    return tea
}

module.exports = {
    getAllTeas, getAllBrands, getAllOrigins, getAllTypes, getAllPackages, getAllFlavours, getTeaById,
}