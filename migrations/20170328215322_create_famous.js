
exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.schema.hasTable('users').then(function(exists) {
      // if (!exists) {
        knex.schema.table('users', function(table){
          table.integer('famous_person_id');
        })
      // }
    // })
  ])
};

exports.down = function(knex, Promise) {

};