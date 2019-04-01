const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findorcreate = require('mongoose-find-or-create');

const userSchema = new Schema({
    kayitid:{
        type: String,
        unique: true
    },
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
userSchema.plugin(findorcreate);

module.exports = mongoose.model('users',userSchema);