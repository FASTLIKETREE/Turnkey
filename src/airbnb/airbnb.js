/*
 * @purpose : Parse Airbnb page
 * @author : Wesley Hunt
 * @version : 1.0
*/
"use strict";

var CO = require("co");
var logger = require("../utils/logger");
var cheerio = require('cheerio');
var fs = require("fs");
var db = require("../db/mongo").db;
var REST = require("../utils/REST");
var targetURL = "https://www.airbnb.com/s/Austin--TX--United-States/homes?refinements%5B%5D=homes&in_see_all=true&allow_override%5B%5D=&s_tag=QkGJ9fp6"
var Promise = require("bluebird");

function setAirbnbScrapeInterval(interval){
   setInterval(airbnbScrape, interval) 
}

function airbnbScrape(){
    CO(function*(){
        yield getSearchResults();
        let abnbObj = parseItemList();
        let cxn = db();
        yield cxn.collection("airbnb").insert(abnbObj);
    });
}

function parseItemList(){
    let html = fs.readFileSync("itemList", {"encoding" : "utf8"});
    let abnbObj = {}
    var $ = cheerio.load(html);
    $("div[itemprop=itemList]").children().each(function(index, catagory){
        var title = $(catagory).find("h3");
        console.log(title.text());
    
        if(title.text() == "Browse homes"){
            return
        }

        if(!(title.text() in abnbObj)){
            abnbObj[title.text()] = {};
        }

        let listings = $(catagory).find("div[id^='listing-']");
        $(listings).each(function(index, listing){
            var listingId = $(listing).attr('id').replace("listing-", "");
            abnbObj[title.text()][listingId] = {};
            let listingSpans = $(listing).find("span")
            let headLine = $(listingSpans).eq(4).text();
            let isSuperHost = false;
            $(listing).find("span").each(function(index, span){
                //console.log(index + ":" + $(span).text());
                if($(span).text() == "Superhost"){
                    isSuperHost = true;
                }
            });
            
            abnbObj[title.text()][listingId]["headline"] = headLine;
            abnbObj[title.text()][listingId]["rank"] = index;
            abnbObj[title.text()][listingId]["superhost"] = isSuperHost;
        });
    });
    console.log(JSON.stringify(abnbObj, null, 4));
    return abnbObj;
}

function getSearchResults(){
    return CO(function*(){
        var Nightmare = require('nightmare');
        var nightmare = Nightmare ({show : true})
        yield nightmare
        .goto(targetURL)
        .viewport(1600,1200)
        .wait(".search-results")
        .wait(15000)
        .evaluate(function(){
            return document.querySelector('body').innerHTML;
        })
        .then(function(body){
            var $ = cheerio.load(body);
            let html = $(".search-results").html();
            fs.writeFileSync("itemList", html);
            return nightmare.end();
        })
     });
}

module.exports.airbnbScrape = airbnbScrape;
module.exports.setAirbnbScrapeInterval = setAirbnbScrapeInterval;
