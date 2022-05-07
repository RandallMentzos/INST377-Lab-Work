import express from 'express';
import sequelize from 'sequelize';
import chalk from 'chalk';
import fetch from 'node-fetch';

import db from '../database/initializeDB.js';
// import hallIdQuery from '../controllers/diningHall.js';
import mealsQuery from '../controllers/meals_query.js';

const router = express.Router();

//  /sqlDemo
router.route('/')
  .get(async(req, res) => {
    try {
      console.log('touched sqlDemo get');
      const result = await db.sequelizeDB.query(mealsQuery, {
        type: sequelize.QueryTypes.SELECT
      });
      res.json({data: result});
    } catch (error) {
      console.log('sqlDemo "get" error: ', error);
      res.json({message: 'error in sqlDemo'});
    }
  })
  .post(async (req, res) => {
    // TODO  Error: Table 'Dining_Hall_Tracker.Meals_Locations' doesn't exist
    try {
      console.dir(req.body, {depth: null});
      console.log(req.body?.category);
      const mealCategory = req.body?.category || 0;
      const result = await db.sequelizeDB.query(mealsQuery, {
        replacements: { meal_category: mealCategory },
        type: sequelize.QueryTypes.SELECT
      });
      res.json({data: result});
    } catch (err) {
      console.log(err);
      res.send({ message: err });
    }
  });
export default router;