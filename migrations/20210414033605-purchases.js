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
  return db.createTable("purchase", {
      id: {
          "type":"int",
          "unsigned": true,
          "primaryKey": true,
          "autoIncrement": true
      }, 
      quantity: {
          "type": "smallint",
          "unsigned":true
      },
      tea_id: {
            "type": "smallint",
            "notNull": true,
            "foreignKey": {
                "name": "purchase_tea_id",
                "table": "teas",
                "mapping": "id",
                "rules": {
                    "onDelete": "CASCADE",
                    "onUpdate": "RESTRICT"
                }
            }
        },
        user_id:{
            "type": "int",
            "notNull": true,
            "foreignKey":{
                "name": "purchase_user_id",
                "table": "users",
                "mapping": "id",
                "rules":{
                    "onDelete": "CASCADE",
                    "onUpdate": "RESTRICT"
                }
            }
        }
  });
};

exports.down = function(db) {
  return db.dropTable("purchase");
};

exports._meta = {
  "version": 1
};
