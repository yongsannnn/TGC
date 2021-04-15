const forms = require("forms")

// create shortcut
const fields = forms.fields;
const validators = forms.validators;
const widget = forms.widgets;

// boiler
var bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};

// custom field2
var bootstrapFieldCol3 = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group col col-3">' + label + widget + error + '</div>';
};


// custom field3
var bootstrapFieldCol6 = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group col col-6">' + label + widget + error + '</div>';
};

const createProductForm = (brands, origins, types, packages, flavours) => {
    return forms.create({
        "name": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(100)]
        }),
        "brand_id": fields.string({
            label: "Brand",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.select(),
            choices: brands
        }),
        "origin_id": fields.string({
            label: "Origin",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.select(),
            choices: origins
        }),
        "type_id": fields.string({
            label: "Type",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.select(),
            choices: types
        }),
        "package_id": fields.string({
            label: "Package",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.select(),
            choices: packages
        }),
        "flavour": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.multipleSelect(),
            choices: flavours
        }),
        "cost": fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.min(1)]
        }),
        "ingredient": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(400)],
        }),
        "water_temperature": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.min(1)]
        }),
        "steep_time": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(20)],
        }),
        "serving": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(20)],
        }),
        "stock": fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.min(1)],
        }),
        "description": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(500)],
            widget: widget.textarea()
        }),
        "image": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.hidden()
        }),
    })
}

const createSearchForm = (brands, origins, types, packages, flavours) => {
    return forms.create({
        "name": fields.string({
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(100)]
        }),
        "brand_id": fields.string({
            label: "Brand",
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.select(),
            choices: brands
        }),
        "origin_id": fields.string({
            label: "Origin",
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.select(),
            choices: origins
        }),
        "type_id": fields.string({
            label: "Type",
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.select(),
            choices: types
        }),
        "package_id": fields.string({
            label: "Package",
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.select(),
            choices: packages
        }),
        "flavour": fields.string({
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.multipleSelect(),
            choices: flavours
        }),
    })
}

const createUserForm = () => {
    return forms.create({
        "name": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(45)]
        }),
        "email": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.email(), validators.maxlength(255)]
        }),
        "password": fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(32)]
        }),
        "confirm_password": fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.matchField("password")]
        }),
        "date_of_birth": fields.date({
            label: "DOB",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.date(),
        }),
        "contact_number": fields.number({
            label: "Contact Number",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(8)]
        }),
        "address": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(255)]
        })
    })
}

const createLoginForm = () => {
    return forms.create({
        "email": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.email()]
        }),
        "password": fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            }
        })
    })
}

const createUpdateUserForm = () => {
    return forms.create({
        "name": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(45)]
        }),
        "email": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.email(), validators.maxlength(255)]
        }),
        "password": fields.password({
            label: "New Password",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(32)]
        }),
        "confirm_password": fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.matchField("password")]
        }),
        "date_of_birth": fields.date({
            label: "DOB",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            widget: widget.date(),
        }),
        "contact_number": fields.number({
            label: "Contact Number",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(8)]
        }),
        "address": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(255)]
        })
    })
}

const createUpdateOrderForm = (status) => {
    return forms.create({
        "status_id": fields.string({
            label: "Status",
            required: true,
            errorAfterField: true, 
            cssClasses: {
                label: ["form-label"],
            },
            widget : widget.select(),
            choices: status
        }),
    })
}

const createOrderSearchForm = (status) => {
    return forms.create({
        "status_id": fields.string({
            label: "Status",
            required: false,
            errorAfterField: true, 
            cssClasses: {
                label: ["form-label"],
            },
            widget : widget.select(),
            choices: status
        }),
        "order_id": fields.number({
            required: false,
            cssClasses: {
                label: ["form-label"],
            },
        }),
        "user_id": fields.number({
            required: false,
            cssClasses: {
                label: ["form-label"],
            },
        }),
        "recipient_name": fields.string({
            required: false,
            cssClasses: {
                label: ["form-label"],
            },
        }),
        "min_cost": fields.number({
            required: false,
            cssClasses: {
                label: ["form-label"],
            },
        }),
        "max_cost": fields.number({
            required: false,
            cssClasses: {
                label: ["form-label"],
            },
        }),
    })
}

module.exports = {
    createProductForm,
    bootstrapField,
    bootstrapFieldCol3,
    bootstrapFieldCol6,
    createSearchForm,
    createUserForm,
    createLoginForm,
    createUpdateUserForm,
    createUpdateOrderForm,
    createOrderSearchForm
} 