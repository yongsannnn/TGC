'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.addColumn("orders", "status_id", {
      type:"smallint",
      foreignKey:{
          "name": "order_status_fk",
          "table": "status",
          "mapping": "id", 
          "rules": {
              onDelete: "CASCADE",
              onUpdate: "RESTRICT"
          }
      }
  });
};

exports.down = async function(db) {
  await db.removeForeignKey("order_status_fk")
  await db.dropColumn("status_id")
};

exports._meta = {
  "version": 1
};
