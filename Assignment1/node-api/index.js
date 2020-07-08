'use strict';
/*
POST - 
GET - 
UPDATE -
DELETE
*/
var express = require('express');
var pool = require('pg').Pool;
var queries = require('./queries.js');
var bodyParser = require('body-parser');
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

//research body parser to turn HTML stuff into JSON
app.use(bodyParser.urlencoded({ extended: true }));

//Host a static file (one file) on our server since I don't have react server or anything
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json())

app.listen('3000');

app.post('/api/runQuery', queries.runQuery)

app.delete('/api/delete/:id', function(req, res){
    crud.deleteId(req.params.id);
})

app.get('/api/item/:name', function(req, res){
    crud.getName(req.params.name);
})