const server = require('./server');
const { RECEIVE } = require('./constants');

const handleReceive = () => {
    server({
        type: RECEIVE,
    })
}

module.exports = handleReceive;