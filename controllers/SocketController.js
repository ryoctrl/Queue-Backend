const connections = [];
let connection;
let io;
const init = ioObj => {
    io = ioObj;
    console.log('Initializing WebSocket!');
    io.on('connection', socket => {
        connections.push(socket);
    });
};

const emitQueue = queue => {
    if(!queue) return;
    queue = queue.dataValues ? queue.dataValues : queue;
    io.sockets.emit('queue.update', queue);
};

/*
const emitOrder = (order, orderItems) => {
    connections.map(socket => {
        socket.emit('queue.update', orderItems);
    });
};
*/


module.exports = {
    init,
    emitQueue
};
