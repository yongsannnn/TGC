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
  return db.addColumn("orders", "user_id", {
      type: "int",
      notNull: true,
      foreignKey: {
          "name": "order_user_fk",
          "table": "users", 
          "mapping": "id",
          "rules": {
              onDelete: "CASCADE",
              onUpdate: "RESTRICT"
          }
      }
  });
};

exports.down = async function(db) {
  await db.removeForeignKey("order_user_fk");
  await db.dropColumn("user_id")
};

exports._meta = {
  "version": 1
};
