const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const port = 3000;

const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`App is running on ${port}`)
});

app.get('/api/v1/categories', (request, response) => {
  database('categories').select()
    .then(categories => {
      response.status(200).json(categories);
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
});

app.get('/api/v1/tossups', (request, response) => {
  database('tossups').select()
    .then(tossups => {
      response.status(200).json(tossups);
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});
  
app.post('/api/v1/categories', (request, response) => {
  const category = request.body
  for(let requiredParameter of ['name']) {
    if (!category[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String> } You're missing "${requiredParameter}" property.`});
    }
  }

  database('categories').insert(category, 'id')
    .then(categoryId => {
      response.status(201).json({ ...category, id: categoryId[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.post('/api/v1/tossups', (request, response) => {
  const tossup = request.body
  for(let requiredParameter of ['question', 'answer', 'category']) {
    if(!tossup[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String> } You're missing "${requiredParameter}" property.`})
    }
  }
  let newTossup = {
    question: tossup.question,
    answer: tossup.answer
  }
  database('categories').where({ name: tossup.category }).select('id')
    .then(categoryId =>  database('tossups').insert({...newTossup, category_id: categoryId[0].id }, 'id')
    .then(tossupId => {
      response.status(201).json({ id: tossupId[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    }))
});

