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

const createProductForm = () => {
    return forms.create({
        "name": fields.string({
            required: true,
            errorAfterField: true,
            cssClass: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(100)]
        }),
        "cost": fields.string({
            required: true,
            errorAfterField: true,
            cssClass: {
                label: ["form-label"]
            },
            validators: [validators.min(1)]
        }),
        "description": fields.string({
            required: true,
            errorAfterField: true,
            cssClass: {
                label: ["form-label"]
            },
            validators: [validators.maxlength(500)],
            widget: widget.textarea()
        }),
        "ingredient": fields.string({
            required: true,
            errorAfterField: true,
            cssClass : {
                label: ["form-label"]
            },
            validators: [validators.maxlength(200)],
        }),
        "water_temperature": fields.string({
            required: true,
            errorAfterField: true,
            cssClass: {
                label: ["form-label"]
            },
            validators: [validators.min(1)]
        }),
        "steep_time": fields.string({
            required: true,
            errorAfterField: true,
            cssClass : {
                label: ["form-label"]
            },
            validators: [validators.maxlength(20)],
        }),
        "serving": fields.string({
            required: true,
            errorAfterField: true,
            cssClass : {
                label: ["form-label"]
            },
            validators: [validators.maxlength(20)],
        }),
        "image": fields.string({
            required: true,
            errorAfterField: true,
            cssClass : {
                label: ["form-label"]
            },
            validators: [validators.maxlength(250)],
        }),
    })
}

module.exports = { createProductForm, bootstrapField } 