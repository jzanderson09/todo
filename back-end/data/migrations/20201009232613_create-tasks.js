
exports.up = function(knex) {
  return knex.schema.createTable('tasks', tbl => {
        tbl.increments();
        tbl
            .text('task', 20)
            .unique()
            .notNullable();
        tbl
            .boolean('completed');
        tbl
            .text('status')
            .notNullable();
  });

};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks');
};
