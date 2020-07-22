'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('queues', 'order_id', {
            type: Sequelize.INTEGER,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('queues', 'order_id');
    }
};

