const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MySchema = new Schema({
    name: {
        type: String,
        default: "user"
    },
    rank: {
        type: String,
        default: 99
    },
    available: {
        type: Boolean,
        default: false
    }
});

const user = mongoose.model('users', MySchema);

module.exports = user;