const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require('multer');
const upload = multer(); // for parsing multipart/form-data

const argv = process.argv;
const host = argv[2] || '127.0.0.1';
const port = argv[3] || 1338;
const server = app.listen(port, host, err => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(`Listening at http://${host}:${port}`);
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/js', express.static(path.resolve(__dirname, './dist/js')));
app.use('/css', express.static(path.resolve(__dirname, './dist/css')));
app.use('/img', express.static(path.resolve(__dirname, './dist/img')));

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});
app.get('/:arg',function(req, res) {
    var reqData = req.body;
    var arg = req.params.arg;
    console.log(arg);
    res.json({'arg':arg});
});

app.post('/api',function(req, res){
    // res.header("Access-Control-Allow-Origin","*");
    var reqData = req.body;
    console.log(reqData);
    res.json(reqData);
});

app.post('/upload',upload.array(),function(req, res, next){
    console.log(req.body);
    res.json(req.body);
});