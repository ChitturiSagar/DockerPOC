var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')

var MONGO_DB;
var DOCKER_DB = process.env.DB_PORT;
if ( DOCKER_DB ) {
  MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/myapp';
} else {
  MONGO_DB = process.env.MONGODB;
}
var db = mongojs(MONGO_DB, ['mycollection'])

/* GET home page. */
router.get('/', function(req, res, next) {

	db.mycollection.findOne({
		type: 'counter'
	}, function(err, doc){
		doc = doc || { type : 'counter'};
		var ctr = parseInt(doc.value) || 0;
		doc.value = ctr + 1;
		db.mycollection.save(doc, function(){
			return res.render('index', { count: doc.value });
		});
	});
});

module.exports = router;
