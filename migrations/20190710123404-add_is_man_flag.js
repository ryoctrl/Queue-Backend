'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('queues', 'is_man', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('queues', 'is_man');
    }
};
