/*
  Lint rules go here
*/
const express = require('express');
const app = express();
module.exports.app = app;

const logger = require('./utils/logger');
const loaders = require('./loader').loaders;
const CO = require("co");
const _ = require("lodash");
const airbnbScrape = require("./airbnb/airbnb").airbnbScrape;
const setAirbnbScrapeInterval = require("./airbnb/airbnb").setAirbnbScrapeInterval;

var logRequest = function(req, res, next){
    logger.log(req.method + ":" + req.url)
    next()
}

app.use(logRequest);

app.get('/', (req,res) => {
    res.sendFile(__dirname + '../../client/build/bundle.js')
});

CO(function*(){
    try{
        yield loaders;
        logger.load("Successfully loaded all modules.");
        setAirbnbScrapeInterval(1000 * 60 * 60 * 24);
        airbnbScrape()
    }
    catch (err){
        console.log(err)
        process.exit(1);
    }

    app.listen(80, () => {
        logger.warn("Server listening on port 80.");
    });
})
