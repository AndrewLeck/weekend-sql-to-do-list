const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool');



todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "id";';
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
        console.log('In GET todo list router')
    })
    .catch((err)=>{
        console.log( 'Failed to GET todo list from server( in todo.router)', err)
        res.sendStatus(500);
    });
});
 
todoRouter.post('/', (req, res) => {
  console.log('In the POST router', req.body)
  const query = `
  INSERT INTO "todo" ("task", "complete")
  VALUES ($1, $2);
  `;
  const sqlParams = [req.body.task, req.body.complete];

  pool.query(query, sqlParams)
  .then(() =>{
    console.log('POST went through')
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log(' error failed to POST', err)
    res.sendStatus(500);
  })
});

todoRouter.delete('/:todo', (req, res) => {
    let todoId = req.params.todo;
    console.log('In todoRouter.delete', todoId);

    const sqlQuery = `
    DELETE FROM "todo"
    WHERE "id" = $1;
    `;
    const sqlParams = [todoId];
    pool.query(sqlQuery, sqlParams)
    .then(() => {
        console.log('In delete pool.query.then')
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('delete failed', err)
        res.sendStatus(500)
    });
});

todoRouter.put('/:todo', (req, res) =>{
    console.log('In todoRouter.put');

    const sqlQuery = `
    UPDATE "todo"
    SET "complete" = $2
    WHERE "id" = $1
  `;

    const sqlParams = [
        req.params.todo,
        req.body.complete
    ];

    pool.query(sqlQuery, sqlParams)
    .then(() => {
      console.log('in update pool.query.then');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('PUT update failed', err);
      res.sendStatus(500);
    });
});





module.exports = todoRouter;