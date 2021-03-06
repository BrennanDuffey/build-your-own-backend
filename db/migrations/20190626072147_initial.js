
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('name');

      table.timestamps(true, true);
    }),
    knex.schema.createTable('tossups', function(table) {
      table.increments('id').primary();
      table.string('question', 2000);
      table.string('answer', 1000);
      table.integer('category_id').unsigned()
      table.foreign('category_id')
        .references('categories.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
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
