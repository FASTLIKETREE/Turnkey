/*
 * @purpose : REST helper functions
 * @author : Wesley Hunt
 * @version : 1.0
*/
"use strict";

var CO = require("co");
var rp = require("request-promise");
var logger = require("./logger");
var fs = require('fs');

function get(uri, headers = {}){
    var options = {
        method :  "GET",
        uri : uri,
        headers : headers
    };

    logger.log("GET:" + options.uri);
    return rp.get(options);
}

module.exports.get = get;

