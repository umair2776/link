const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: Number },
    country: { type: String },
    password: { type: String, required: true },
    category: { type: String },
    code: {type:String},
    isEmailVerified:{type:Boolean,default:false}
});

module.exports = mongoose.model('User', userSchema);
