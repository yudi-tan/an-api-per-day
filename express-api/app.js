var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

var mongoose = require('mongoose');

mongoose.connect('mongodb://mrtanyudi:qazplm@ds161016.mlab.com:61016/an-api-per-day', {useMongoClient: true});

var schema = new mongoose.Schema({ title: 'string', content: 'string' });

var postsModel = mongoose.model('Post', schema);

app.get('/posts', function(req, res) {
  postsModel.find({}, function(err, posts) {
      res.send(posts);
    })
});

var server = app.listen(5000, function() {
  console.log('Express server listening on port ' + 5000);
});

module.exports = app;
