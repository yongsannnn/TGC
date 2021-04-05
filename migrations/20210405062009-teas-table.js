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
  return db.createTable("teas", {
      "id": {type: "smallint", primaryKey:true, autoIncrement:true},
      "name": {type: "string", length: 150},
      "cost": {type: "int", unsigned: true},
      "description": {type:"string", length:500},
      "ingredient": {type: "string", length:200},
      "water_temperature": {type: "int", unsigned: true},
      "steep_time": {type: "string", length: 20},
      "serving": {type: "string", length: 20},
      "stock": {type: "int", unsigned: true},
      "image":  {type: "string", length:250}
  });
};

exports.down = function(db) {
  return db.dropTable("teas");
};

exports._meta = {
  "version": 1
};
