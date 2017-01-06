var mongoose = require('mongoose');

var RegistrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    active: {type: Boolean, default: true},
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

mongoose.model('Registration', RegistrationSchema);