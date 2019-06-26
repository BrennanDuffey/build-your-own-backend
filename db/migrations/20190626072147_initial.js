
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('name');

      table.timestamps(true, true);
    }),
    knex.schema.createTable('tossups', function(table) {
      table.increments('id').primary();
      table.string('question');
      table.string('answer');
      table.integer('category_id').unsigned()
      table.foreign('category_id')
        .references('categories');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tossups'),
    knex.schema.dropTable('categories')
  ])
};
