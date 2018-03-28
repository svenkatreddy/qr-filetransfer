#! /usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const handleSingleArg = require('./handle-single-arg');
const handleMultipleArg= require('./handle-multiple-arg');

function startServer() {
    const argumentsPassed = argv._;
    if (argumentsPassed.length < 1) {
        return console.log('Please specify filename(s) or directory');
    }
    if (argumentsPassed.length === 1) {
        handleSingleArg(argumentsPassed);
    }
    if (argumentsPassed.length > 1) {
        handleMultipleArg(argumentsPassed);
    }
}

module.exports = startServer();