"use strict";
//var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient
var logger = require('../utils/logger');
var CO = require('co');
var cxn = null;

function load(){
    return CO(function*(){
        // Connection URL 
        var url = 'mongodb://localhost:27017/airbnb';
        // Use connect method to connect to the Server 
        try {
            logger.load("Connecting to mongodb.");
            cxn = yield MongoClient.connect(url);
            logger.load("Successfully connected to mongodb.");
        } catch(err) {
            console.log(err);
            throw err;
        }
    })
}

function db(){
    return cxn;
}
module.exports.db = db;
module.exports.load = load;
