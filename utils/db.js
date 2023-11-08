const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/contact'
mongoose.connect(uri)


const DataContact = mongoose.model('DataContact', {
    nama: {
        type: String,
        require: true,
    },
    noHp: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    }
})

const Data1 = new DataContact({
    nama: 'adrian',
    noHp: '08138388333',
    email: 'adrian@gmail.com'
})

Data1.save().then((contact) => console.log(contact))