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
  return db.addColumn("teas","package_id",{
      type: "smallint",
      notNull: true,
      foreignKey: {
          "name": "tea_package_fk",
          "table": "packages",
          "mapping": "id",
          "rules": {
              onDelete: "CASCADE",
              onUpdate: "RESTRICT"
          }
      }
  });
};

exports.down = async function(db) {
  await db.removeForeignKey("tea_package_fk")
  await db.dropColumn("package_id")
};

exports._meta = {
  "version": 1
};
