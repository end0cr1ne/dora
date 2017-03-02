var express = require('express');
var g = require('graphlib');
var app = express();

app.use('/',function (req,res) {
   res.send('It\'s alive!');
});

app.listen(3000, function (err) {
    console.log('start');
});