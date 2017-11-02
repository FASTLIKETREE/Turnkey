"use strict"; 
var glob = require('glob');
var _ = require('lodash');
var fs = require("fs");
var path = require("path");
var logger = require("./utils/logger");

var mongo = path.join(__dirname, "routes")
console.log(path.join(__dirname, "routes"))

var folderArray = [
    "db",
    "routes",
    "airbnb"
]

var pathArray = []
_.each(folderArray, (folderName) => {
    var targetPath = path.join(__dirname, folderName) 
    var fileGlob = glob.sync(targetPath + '/**/*.js')
    pathArray = pathArray.concat(fileGlob);
})

var reqArray = [];
_.each(pathArray, (module) => {
    logger.load("Requiring module : " + module)
    reqArray.push({"path" : module, "module" : require(module)});
})

var loaders = [];
_.each(reqArray, (module) => {
    if("load" in module.module){
        logger.load("Loading module : " + module.path)
        loaders.push(module.module.load());
    }
})

module.exports.loaders = loaders;

