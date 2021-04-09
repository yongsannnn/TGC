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
  return db.createTable("users", {
      "id": {type:"int", primaryKey: true, autoIncrement: true},
      "name": {type:"string", length: 45},
      "password": {type:"string", length: 512},
      "email": {type:"string", length: 255},
      "address": {type:"string", length: 255},
      "contact_number": {type: "int", unsigned: true},
      "date_of_birth": "date",
  });
};

exports.down = function(db) {
  return db.dropTable("users");
};

exports._meta = {
  "version": 1
};
