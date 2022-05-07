/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';
import chalk from 'chalk';
import fetch from 'node-fetch';

const router = express.Router();

// router.get('/', (req, res) => {
// console.log('You touched the foodService route!');
// res.json({message: 'Welcome to the PG County food API!'});
// });

router.route('/')
  .get(async (req, res) => {
    try {
      const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
      const data = await fetch(url);
      const json = await data.json();
      console.log(json);

      res.json({data: json});
    } catch (err) {
      console.log(error);
      res.json({error: error});
    }
  })
  .put((req, res) => {
    try {
      res.json({message: 'put FoodServices endpoint'});
    } catch (err) {
      console.log(error);
      res.json({error: 'Something went wrong on the server'});
    }
  })
  .post((req, res) => {
    try {
      console.log('Touched post endpoint', req.body);
      console.log(req.body?.resto);
      res.json({message: 'post FoodServices endpoint'});
    } catch (err) {
      console.log(error);
      res.json({error: 'Something went wrong on the server'});
    }
  })
  .delete((req, res) => {
    try {
      res.json({message: 'delete FoodServices endpoint'});
    } catch (err) {
      console.log(error);
      res.json({error: 'Something went wrong on the server'});
    }
  });

router.route('/foodServicesPG/:id')
  .get(async (req, res) => {
    try {
      // req.params.id
      // TODO: if id is not a number, return
      const {id} = req.params;

      const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
      const data = await fetch(url);
      const json = await data.json();
      console.log(json);

      res.json({data: json[id]});
    } catch (err) {
      console.log(err);
      res.json({error: 'something went wrong'});
    }
  });
export default router;