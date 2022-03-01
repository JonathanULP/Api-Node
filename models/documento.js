

const { Schema , model } = require('mongoose');


const DocumentoSchema = Schema({
    nameDocument: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    created: {
        type: Date,
        required: [true, 'La fecha es obligatoria'],
    },
    pathDocument: {
        type: String,
        required: [true, 'El path es obligatorio'],
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
    },
    tag: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    public: {
        type: Boolean,
        default: false
    },
    id_usuario: {
        type: String,
        require: [true, 'El usuario es obligatorio']
    }
    
});


DocumentoSchema.methods.toJSON = function () {

    const { __v, ...documento} = this.toObject();
    return documento;
};

module.exports = model('Documento',DocumentoSchema);