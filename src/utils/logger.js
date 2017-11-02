"use strict";
/*
    text colors
        black
        red
        green
        yellow
        blue
        magenta
        cyan
        white
        gray
        grey
    background colors
        bgBlack
        bgRed
        bgGreen
        bgYellow
        bgBlue
        bgMagenta
        bgCyan
        bgWhite
    styles
        reset
        bold
        dim
        italic
        underline
        inverse
        hidden
        strikethrough
*/

const colors = require('colors');

function print(fn, text){
    console.log(fn(text));
}

console.log(typeof colors.green);
const log = (text) => print(colors.green, text);
const load = (text) => print(colors.white.bgMagenta, text);
const debug = (text) => print(colors.blue, text);
const warn = (text) => print(colors.bgYellow.black, text);
const error = (text) => print(colors.bgBlack.underline.red, text);

module.exports.log = log;
module.exports.load = load;
module.exports.debug = debug;
module.exports.warn = warn;
module.exports.error = error;
