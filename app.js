var express					=		require('express')

var port			= 2000
var app				= module.exports = express();


app.use(express.static('./dist'));

app.all('/*', function(req, res) {
  res.sendFile('./index.html', { root: __dirname+'/dist' });
});

app.listen(port, function() {
	console.log('Runing on ' + port);
});
