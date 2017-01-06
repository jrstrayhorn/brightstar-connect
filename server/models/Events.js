var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: {type:String, required: true},
    date: {type:Date, required: true},
    publish: {type:Boolean, required: true},
    registrations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Registration' }]
});

var Event = mongoose.model('Event', eventSchema);

function createDefaultEvents() {
    Event.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Event.create({name: 'Church Year End Review and Vision', date: new Date('1/21/2017'), publish:true});
            Event.create({name: "Men's Summit", date: new Date('1/27/2017'), publish:false});
            Event.create({name: 'Family Day', date: new Date('1/29/2017'), publish:true});
            Event.create({name: 'Church Picnic', date: new Date('8/14/2017'), publish: false});
        }
    });
}

exports.createDefaultEvents = createDefaultEvents;