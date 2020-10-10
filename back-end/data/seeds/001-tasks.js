
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          id: 1, 
          task: 'Walk The Dog!',
          completed: false,
          status: 'danger'
        },
        {
          id: 2, 
          task: 'Do The Dishes!',
          completed: false,
          status: 'danger'
        },
        {
          id: 3, 
          task: 'Get 8 Hours Sleep!',
          completed: false,
          status: 'danger'
        }
      ]);
    });
};
