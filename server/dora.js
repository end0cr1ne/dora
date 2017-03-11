var express = require('express');
var g = require('graphlib');
var pathListAll = require('./pathListAll');
var app = express();

app.use('/path',function (req,res) {
    var source=req.query.src,destination=req.query.dest;
    console.log(source,destination);
    var pathList=pathListAll[source];

    var pred = pathList[destination].predecessor;
    var tiles = [];
    while (pred != source) {
        tiles.push(pred);
        pred = pathList[pred].predecessor;
    }

    console.log(tiles);

    res.send(tiles);
});

app.use('/',function (req,res) {
   res.send(pathListAll);
});

app.listen(3000, function (err) {
    console.log('start');
});