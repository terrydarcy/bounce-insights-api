let nasaAPIRouter = require('express').Router();
let nasa_api_controller = require('../controllers/nasaApiController');
import { check } from 'express-validator';
import { RoverType } from '../models/nasaApiInterface';

const validateParams = [
  check('sol').isInt({ min: 0 }).withMessage('Sol must be a non-negative integer.'),
  check('page').isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
  check('rover_type')
    .isIn(Object.values(RoverType))
    .withMessage(`Rover type must be one of the following: ${Object.values(RoverType).join(', ')}`),
];

nasaAPIRouter.get('/apod', nasa_api_controller.getAPOD);
nasaAPIRouter.get('/roverImagesForSol', validateParams, nasa_api_controller.getRoverImagesForSol);

module.exports = nasaAPIRouter;
