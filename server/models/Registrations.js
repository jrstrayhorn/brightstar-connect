var mongoose = require('mongoose');

var RegistrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    active: {type: Boolean, default: true},
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

RegistrationSchema.methods.cancel = function(callback) {
    this.active = false;
    this.save(callback);
}

mongoose.model('Registration', RegistrationSchema);