let nasaAPIRouter = require('express').Router();
let nasa_api_controller = require('../controllers/nasaApiController');
import { check } from 'express-validator';
import { RoverType } from '../models/nasaApiInterface';

const validateSolParams = [
  check('sol').isInt({ min: 0 }).withMessage('Sol must be a non-negative integer.'),
  check('page').isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
  check('rover_type')
    .isIn(Object.values(RoverType))
    .withMessage(`Rover type must be one of the following: ${Object.values(RoverType).join(', ')}`),
];

const validateEarthDateParams = [
  check('year').isInt({ min: 1 }).withMessage('Year must be a positive integer.'),
  check('month').isInt({ min: 1, max: 12 }).withMessage('Month must be an integer between 1 and 12.'),
  check('day').isInt({ min: 1, max: 31 }).withMessage('Day must be an integer between 1 and 31.'),
  check('page').isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
  check('rover_type')
    .isIn(Object.values(RoverType))
    .withMessage(`Rover type must be one of the following: ${Object.values(RoverType).join(', ')}`),
];

nasaAPIRouter.get('/apod', nasa_api_controller.getAPOD);
nasaAPIRouter.get('/roverImagesForSol', validateSolParams, nasa_api_controller.getRoverImagesForSol);
nasaAPIRouter.get('/roverImagesForEarthDate', validateEarthDateParams, nasa_api_controller.getRoverImagesForEarthDate);
nasaAPIRouter.get('/weather', nasa_api_controller.getMarsWeather);

module.exports = nasaAPIRouter;
