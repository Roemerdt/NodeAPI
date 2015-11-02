var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://root:trias@waffle.modulusmongo.net:27017/o7xEbiqo');
var Order = require('./models/order');

var router = express.Router();

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/orders')

	.post(function(req, res) {
		
		var order = new Order();
		order.name = req.body.name;

		order.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Order created!' });
		});

		
	})

	.get(function(req, res) {
		Order.find(function(err, orders) {
			if (err)
				res.send(err);

			res.json(orders);
		});
	});

router.route('/orders/:order_id')

	.get(function(req, res) {
		Order.findById(req.params.order_id, function(err, order) {
			if (err)
				res.send(err);
			res.json(order);
		});
	})

	.put(function(req, res) {
		Order.findById(req.params.order_id, function(err, order) {

			if (err)
				res.send(err);

			order.name = req.body.name;
			order.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Order updated!' });
			});

		});
	})

	.delete(function(req, res) {
		Order.remove({
			_id: req.params.order_id
		}, function(err, order) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
