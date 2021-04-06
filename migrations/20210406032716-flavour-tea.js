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
  return db.createTable("flavours_teas",{
      id: {type:"int", primaryKey:true, autoIncrement: true},
      flavour_id: {
          type:"smallint",
          notNull: true,
          foreignKey: {
              name: "flavour_tea_fk",
              table: "flavours",
              mapping: "id",
              rules: {
                  onDelete: "CASCADE",
                  onUpdate: "RESTRICT"
              }
          }
      },
      tea_id: {
          type: "smallint",
          notNull: true, 
          foreignKey: {
              name: "tea_flavour_fk",
              table: "teas",
              mapping: "id",
              rules: {
                  onDelete: "CASCADE",
                  onUpdate: "RESTRICT"
              }
          }
      }
  });
};

exports.down = function(db) {
  return db.dropTable("flavours_teas");
};

exports._meta = {
  "version": 1
};
