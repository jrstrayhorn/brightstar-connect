

module.exports = function(app) {
    var index = require('../routes/index');

    app.use('/', index);
};