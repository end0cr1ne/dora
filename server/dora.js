var express = require('express');
var g = require('graphlib');

var app = express();

var pathListAll = require('./PathListAll');

app.use('/path',function (req,res) {
    var source=req.query.src,destination=req.query.dest;
    //var source=be_comps;
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

app.use('/search', function (req, res) {
    var query = req.query.q;
    console.log(query);

    var result = [], indices = [];
    var arr = [
        "lift7_new", "lift7_old", "lift7_staff", "be_elex", "project_lab",
        "mac_lab", "cc8", "cc7", "advanced_communication_lab", "iedc_lab",
        "girls_restroom", "middle_restroom", "staff_restroom", "be_comps",
        "te_comps", "se_comps", "staff_room", "p7_0", "p7_1", "p7_2", "p7_3",
        "p7_4", "p7_5", "p7_6", "p7_7", "p7_8", "p7_9", "p7_10", "p7_11", "p7_12",
        "p7_13", "p7_14", "p7_15", "p7_16", "p7_17", "p7_18", "p7_19", "p7_20",
        "p7_21", "p7_22", "p7_23", "p7_23", "p7_24", "p7_25", "p7_26"];

    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i].indexOf(query));
        if (arr[i].indexOf(query) == -1) {
            indices[i] = 100;
        } else {
            indices[i] = arr[i].indexOf(query);
        }
    }
    console.log("arr", arr);
    console.log("ind", indices);

    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (indices[j] == i) {
                result[result.length] = arr[j];
            }
        }
    }

    res.send(result);

});

app.use('/', function (req, res) {
    res.send(pathListAll);
});

app.listen(process.env.PORT || 3000, function (err) {
    console.log('start');
});