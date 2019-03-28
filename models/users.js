const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    kadi: {
        type:String,
        required:true,
        unique:true
    },
    sifre: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('users',userSchema);