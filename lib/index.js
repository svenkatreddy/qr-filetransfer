#! /usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const handleSingleArg = require('./handle-single-arg');
const handleMultipleArg= require('./handle-multiple-arg');
const handleReceive = require('./handle-receive');

const { RECEIVE } = require('./constants');

function startServer() {
    const argumentsPassed = argv._;
    if (argumentsPassed.length < 1) {
        return console.log('Please specify filename(s) or directory');
    }

    // for receiving
    if (argumentsPassed[0] === RECEIVE ){
        handleReceive()
    }

    // for sending
    else{
        argumentsPassed.length === 1 ? 
            handleSingleArg(argumentsPassed) :
            handleMultipleArg(argumentsPassed);
    }
}

module.exports = startServer();