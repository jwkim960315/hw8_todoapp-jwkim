var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var db
var {ObjectID} = require('mongodb');

app.set('port', (process.env.PORT || 3000))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.set("view engine","ejs");

var dbaddr = "mongodb://Sean:hw08@ds115411.mlab.com:15411/star-wars-quotes"

MongoClient.connect(dbaddr, (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(app.get('port'), function() {
    console.log('I am listening on port ' + app.get('port'));
});
});

app.get('/', (req, res) => {
    var cursor = db.collection('todo').find().toArray(function (err, result) {
        if (err) return console.log(err);

        res.render('index.ejs', {items: result});
    });
});

app.post('/todo',(req,res) => {
  req.body.done = false;
  db.collection('todo').save(req.body,(err,result) => {
    if (err) return console.log(err);

    console.log('Successfully saved to database');
    res.redirect('/');
});
});

app.put('/todo',(req,res) => {
    db.collection('todo').findOneAndUpdate(
    {_id: ObjectID(req.body.index)},
    {  $set: {
        done: req.body.done === false
    }
    },{ sort: {_id: -1},
        upsert: false
    },
    (err, result) => {
    if (err) return res.send(err)
    res.send(result)
});
});

app.delete('/todo',(req,res) => {
    db.collection('todo').findOneAndDelete(
    {_id: ObjectID(req.body.index)},
    (err, result) => {
    if (err) return res.send(err);
    res.json("");
});
});
