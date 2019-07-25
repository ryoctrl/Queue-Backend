'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('queues', 'handed_at', {
            type: Sequelize.DATE,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('queues', 'handed_at');
    }
};
