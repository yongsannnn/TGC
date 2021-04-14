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
  return db.createTable("orders", {
      "id": {type:"int", primaryKey: true, autoIncrement: true},
      "recipient_name": {type:"string", length: 45},
      "recipient_address": {type: "string", length: 255},
      "total_cost": "int",
      "date_of_order": "date",
      "date_of_completion": "date"
  });
};

exports.down = function(db) {
  return db.dropTable("orders");
};

exports._meta = {
  "version": 1
};
