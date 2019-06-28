const { categories } = require('../../../data.js');


const createCategories = (knex, category) => {
  return knex('categories').insert({
    name: category.name
  }, 'id')
  .then(categoryId => {
    let tossupPromises = [];

    category.tossups.forEach(tossup => {
      tossupPromises.push(
        createTossup(knex, {
          question: tossup.question,
          answer: tossup.answer,
          category_id: categoryId[0]
        })
      )
    });

  return Promise.all(tossupPromises)
  })
};

const createTossup = (knex, tossup) => {
  return knex('tossups').insert(tossup);
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tossups').del()
    .then(() => knex('categories').del())
    .then(() => {
      let categoryPromises = [];

      categories.forEach(category => {
        categoryPromises.push(createCategories(knex, category))
      });

      return Promise.all(categoryPromises)
    })
    .catch(error => console.log(`Error in seeding data: ${error}`))
};
