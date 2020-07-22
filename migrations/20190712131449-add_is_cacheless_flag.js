'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('queues', 'is_cacheless', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('queues', 'is_cacheless');
    }
};

