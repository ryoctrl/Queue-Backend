const queue = require('../models').queue;
const { emitQueue } = require('./SocketController');
const OP = require('sequelize').Sequelize.Op;
const moment = require('moment');

const findAll = async() => {
    return await queue.findAll();
};

const findAllByUncompleted = async () => {
    const query = {
        where: {
            [OP.or]: [
                { ordered_at: null },
                { paymented_at: null },
                { serviced_at: null },
            ]
        }
    };
    return await queue.findAll(query);
};

const update = async (param, query) => {
    const q = await queue.update(param, query);
    Object.keys(query.where).map(key => {
        if(query.where[key] !== null) return;
        delete query.where[key];
    });
    return await queue.findOne(query);
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

const updatePaymentedAt = async (id, orderId) => {
    const param = {
        paymented_at: new Date(),
        order_id: orderId,
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

const updateServicedAt = async (id, isCacheLess) => {
    const param = {
        serviced_at: new Date(),
        is_cacheless: isCacheLess
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

const updateHandedAt = async orderId => {
    const param = {
        handed_at: new Date()
    };
    const query = {
        where: {
            order_id: orderId,
            handed_at: null
        },
        returning: true,
        plain: true
    }

    const updatedQueue = await update(param, query);
    emitQueue(updatedQueue);
    return updatedQueue;
};

const getQueues = async (options = {}) => {
    const date = options.date;
    const query = {
        where: {
            order_id: {
                [OP.ne]: null,
            },
            handed_at: {
                [OP.ne]: null,
            }
        }
    };

    const dateMom = moment(date);
    const start = dateMom.startOf('day');
    // const start = dateMom.hours(0).minutes(0).seconds(0).milliseconds(0);
    const gte = start.toDate();
    const end = dateMom.endOf('day');
    // const end = dateMom.hours(13).minutes(0).seconds(0).milliseconds(0);
    const lte = end.toDate();
    if(dateMom.isValid()) {
        query.where.paymented_at = {
            [OP.gte]: gte,
            [OP.lte]: lte,
        }
    }
    const queues = await queue.findAll(query);
    console.log(queues.length);
    return queues;
}

module.exports = {
    findAll,
    findAllByUncompleted,
    getQueues,
    createNewQueue,
    updateOrderedAt,
    updatePaymentedAt,
    updateServicedAt,
    updateHandedAt,
};

