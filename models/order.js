var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	name: String,
	customer: String
});

module.exports = mongoose.model('Order', OrderSchema);