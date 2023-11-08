const mongoose = require('mongoose')

const Contacts = mongoose.model('Contacts', {
    nama: {
        type: String,
        required: true,
    },
    noHp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
})


module.exports = Contacts