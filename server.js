const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const port = 3000;

// first the env is defaulted to development or proccess.env.NODE_ENV for deployment
// line 2: the knex configuration object is created
// then the knex function is invoked with the configuration object
// express is imported
// the port value is set to 3000 this will be used for dev environment

const app = express();

// an express server is created on line 10 then the json parsing middleware is applied on line 14

app.use(express.json());

app.listen(process.env.PORT || port, () => {
  console.log(`App is running on ${port}`)
});

// the server is set to run on the port we defined earlier or to the port set when deployed
// then the terminal would print the app is running on port '' 

app.get('/api/v1/categories', (request, response) => {
  database('categories').select()
    .then(categories => {
      response.status(200).json(categories);
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
});

// Line 26 This runs when a get request is sent to the route set as the first argument of the get method provided by express
// Line 27 the the categories table is then all selected with the knex method select
// Line 28 if the previous lines promise resolves it resolves to the categories table as an array of objects
// Line 29 the response is sent back with a status of 200 and a stringified JSON body of the array and the appropriate header
// Line 30 if the promise is rejected from line 27 a response with the status of 500 and an error object

app.get('/api/v1/categories/:id', (request, response) => {
  const { id } = request.params 
  database('categories').where({ id }).select()
    .then(category => {
      if(category.length) {
        response.status(200).json(category[0])
      } else {
        response.status(404).json({ error: `A category with id of ${id} was not found`})
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

// Line 42 When the server recieves a get request with the route defined in the first argument (where id is a placeholder)
// Line 43 The dynamic id is set as the constant variable id
// Line 44 the categories table is queried to find where the id from the route matches the primary key in the table then using the select method from knex
// Line 45 The select method resolves to an array
// Line 46-47 If anything was returned into the array a response is sent with the status of 200 and the json method sends the appropriate header and the category queried as the body
// Line 49 If nothing was in the array the category was not found and a response is sent with the status of 404 and an appropriate error message
// Line 52-53 If the promise from the select method was rejected a response with a status of 500 and an error is sent

app.get('/api/v1/tossups', (request, response) => {
  database('tossups').select()
    .then(tossups => {
      response.status(200).json(tossups);
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

// Line 65 This runs when a get request is sent to the route set as the first argument of the get method provided by express
// Line 66 The table tossups is queried and all the tossups are selected
// Line 67 The promise resolves to an array of objects that are all the tossups in the table
// Line 68 A response is sent with the status of 200 and a json content type and the array is sent in the body
// Line 70-71 If the promise from 66 is rejected the error generated is sent back in the response with a status of 500

app.get('/api/v1/tossups/:id', (request, response) => {
  const { id } = request.params 
  database('tossups').where({ id }).select()
    .then(tossup => {
      if(tossup.length) {
        response.status(200).json(tossup[0])
      } else {
        response.status(404).json({ error: `A tossup with id of ${id} was not found`})
      }
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

// Line 81 is invoked when the server receives a get request with the route defined in the first argument 
// Line 82 grabs the id from the params AKA the dynamic id in the route
// Line 83 the Tossups table is queried to fined where the id matches the id from the params and is then selected with the select method
// Line 84 The select method resolves to an array containing the tossup queried 
// Line 84-85 If the array contains a tossup the response is sent with a status of 200 and a content type of JSON and body of the tossup (the first index of the array)
// Line 88 If the length of the returned array was 0 a status of 404 and a message that the tossup with the id provided was not fount
// Line 91-92 If the select methods promise is rejected a status of 500 is sent and the error generated as the body

app.get('/', (request, response) => {
  response.status(200).json('Hello World');
});

app.get('/favicon.ico', (request, response) => {
  response.status(200).json('Hello World');
});

// The previous two get requests were for deploying to heroku

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

// Line 114 If a post request is sent to the server with the route defined in the first argument
// Line 115 The new category to be added is grabbed from the body of the request
// Line 116 A for of loop is started over the array of required parameters in this case only one required parameter is needed of name
// Line 117-118 Inside the loop if the category sent to the request does not contain any of the correct parameters a response is sent with a status of 422 and an error telling them which parameter was left off
// Line 124 The categories table is selected and the category is inserted into the table and the argument id tells the insert method what to return if the promise resolves
// Line 125-126 if the promise resolves a response is sent with a status of 201 and the category sent in the request and the id created is sent back in the response body
// Line 128-129 If the insert method returns a promise that is rejected a response with the status code of 500 and the body of the error generated is send

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

// Line 141 If a post request is sent to the server with the route defined in the first argument this code runs
// Line 142 The new tossup to be added is grabbed from the body of the request
// Line 143 A for of loop is started over the array of required parameters an answer, question, and category
// Line 144-147 Inside the loop if the tossup sent in the request does not contain any of the correct parameters a response is sent with a status of 422 and an error telling them which parameter was left off
// Line 150-153 A variable is created as an object with the answer and question from the request
// Line 154 The categories table is queried to to find where the name column matches the category from the request and the id is returned with the select method
// Line 155 The promise resolves to an array of an object. The tossups table then has the tossup inserted with the id returned from the query as the foriegn key and the second argument sets what is returned if the promise resolves
// Line 157 A response is sent with a status of 201 and the id (primary key) as the body of the response
// Line 159-160 If any of the promises are rejected a status of 500 is sent and the error as the body

app.delete('/api/v1/categories/:id', (request, response) => {
  const { id } = request.params
  database('categories').where({ id }).del()
    .then(deleteCount => {
      if(deleteCount) {
        response.sendStatus(204)
      } else {
        response.status(404).json({ error: `No categories with id of ${id} found`})
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

// Line 174 If a request is sent with the verb of delete to the following route the server will run this method
// Line 175 The id is grabbed from the request params (dynamic id in the route)
// Line 176 The categories table is queried to find where the id (primary key) matches the id sent in the params and then the row found is deleted with the del method
// Line 177 If the promise resolves the number of rows deleted is returned
// Line 178-179 A response is sent with a status of 204 but the status implies it was deleted so no body is sent
// Line 181 If the number of rows deleted is 0 a response with the status of 404 is sent and an error object with the message that no categories were found with the id from the request
// Line 184-185 If any of the promise from del method is rejected a response is sent with the status of 500 and the error as the body


app.delete('/api/v1/tossups/:id', (request, response) => {
  const { id } = request.params
  database('tossups').where({ id }).del()
    .then(deleteCount => {
      console.log(deleteCount)
      if(deleteCount) {
        response.sendStatus(204)
      } else {
        response.status(404).json({ error: `No tossups with id of ${id} found`})
      }
    })
    .catch(erro => {
      response.status(500).json({ error })
    })
});

