'use strict';
module.exports = (sequelize, DataTypes) => {
  const queue = sequelize.define('queue', {
    queueing_at: DataTypes.DATE,
    ordered_at: DataTypes.DATE,
    paymented_at: DataTypes.DATE,
    serviced_at: DataTypes.DATE,
    is_man: DataTypes.BOOLEAN,
    is_cacheless: DataTypes.BOOLEAN,
    handed_at: DataTypes.DATE,
    order_id: DataTypes.INTEGER,
  }, {
    underscored: true,
  });
  queue.associate = function(models) {
    // associations can be defined here
  };
  return queue;
};
