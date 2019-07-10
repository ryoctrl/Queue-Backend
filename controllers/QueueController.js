const queue = require('../models').queue;
const { emitQueue } = require('./SocketController');

const findAll = async() => {
    return await queue.findAll();
};

const update = async (param, query) => {
    await queue.update(param, query);
    return await queue.findOne({where: { id: query.where.id }});
};

const createNewQueue = async isMan => {
    console.log(isMan);
    const obj = {
        queueing_at: new Date(),
        is_man: isMan
    };
    const newQueue = await queue.create(obj);
    emitQueue(newQueue);
    return newQueue;
};

const updateOrderedAt = async id => {
    const param = {
        ordered_at: new Date()
    };

    const query = {
        where: {
            id: id,
            ordered_at: null
        }
    }
    const updatedQueue = await update(param, query);
    emitQueue(updatedQueue);
    return updatedQueue;
};

const updatePaymentedAt = async id => {
    const param = {
        paymented_at: new Date()
    };
    const query = {
        where: {
            id: id,
            paymented_at: null
        }
    }

    const updatedQueue = await update(param, query);
    emitQueue(updatedQueue);
    return updatedQueue;
};

const updateServicedAt = async id=> {
    const param = {
        serviced_at: new Date()
    };

    const query = {
        where: {
            id: id,
            serviced_at: null
        }
    }
    const updatedQueue = await update(param, query);
    emitQueue(updatedQueue);
    return updatedQueue;
};

module.exports = {
    findAll,
    createNewQueue,
    updateOrderedAt,
    updatePaymentedAt,
    updateServicedAt,
};

