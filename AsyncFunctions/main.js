var express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        methodOverride = require("method-override"),
        mongoose = require('mongoose');

var host = 'localhost';

mongoose.connect('mongodb://' + host + '/EMPLOYEES_DB', function (err, res) {
    if (err)
        throw err;
    console.log('Connected to Database employees');
});

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Credentials', true);
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", 'Content-Type, Authorization, Content-Length, X-Requested-With');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

var employeesModel = require('./model/employees')(mongoose);
var emp = mongoose.model('employees');
var employee = express.Router();

//-----------------------------------
//  Magic will happen here

function asyncCount() {
    console.log('querying...');
    return new Promise(function (resolve, reject) {
        emp.count({}, function (err, count) {
            if (err)
                reject(-1);
            console.log('counting...' + count);
            resolve(count);
        });
//        return 0;
//        var a = 0;
//        for (var i = 0; i <= 1000; i++) {
//            a = i;
//        }
//        resolve(a);
    });
}

employee.route('/count').post(function (req, res) {
    console.log('counting...');
    asyncCount().then(function (result) {
        console.log('results: ' + result);
        res.status(200).jsonp(result);
    });
}
);
//-----------------------------------

app.use('/api', employee);
// Start server
app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});