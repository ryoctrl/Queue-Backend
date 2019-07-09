const queue = require('../models').queue;
console.log(queue);


const createQueue = async (queueing_at, ordered_at, paymented_at, serviced_at) => {
    const obj = {
        queueing_at,
        ordered_at,
        paymented_at,
        serviced_at
    };

    return await queue.create(obj);
}

module.exports = {};

