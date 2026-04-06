exports.up = function (knex) {
  return knex.schema
    .createTable('tarifler', (tbl) => {
      tbl.increments('tarif_id');
      tbl.string('tarif_adi').notNullable().unique();
      tbl.timestamp('kayit_tarihi').defaultTo(knex.fn.now());
    })
    .createTable('adimlar', (tbl) => {
      tbl.increments('adim_id');
      tbl.integer('adim_sirasi').notNullable();
      tbl.string('adim_talimati').notNullable();
      tbl
        .integer('tarif_id')
        .unsigned()
        .notNullable()
        .references('tarif_id')
        .inTable('tarifler')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    })
    .createTable('icindekiler', (tbl) => {
      tbl.increments('icindekiler_id');
      tbl.string('icindekiler_adi').notNullable().unique();
    })
    .createTable('adim_icindekiler', (tbl) => {
      tbl.increments('adim_icindekiler_id');
      tbl.float('miktar').notNullable();
      tbl
        .integer('adim_id')
        .unsigned()
        .notNullable()
        .references('adim_id')
        .inTable('adimlar')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      tbl
        .integer('icindekiler_id')
        .unsigned()
        .notNullable()
        .references('icindekiler_id')
        .inTable('icindekiler')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('adim_icindekiler')
    .dropTableIfExists('icindekiler')
    .dropTableIfExists('adimlar')
    .dropTableIfExists('tarifler');
};
