import { validationResult } from 'express-validator';
import { NasaApiService } from '../services/nasaApiService';
import { RoverImageData, ApodData, RoverType } from '../models/nasaApiInterface';
import { Request, Response } from 'express';
const nasaApiService = new NasaApiService();

exports.getAPOD = function (req: Request, res: Response) {
  return nasaApiService
    .getApod()
    .then((data: ApodData) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

exports.getRoverImagesForSol = function (req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const sol = Number(req.query.sol);
  const rover_type = req.query.rover_type as RoverType;
  const page = Number(req.query.page);

  return nasaApiService
    .getRoverImagesForSol(sol, rover_type, page)
    .then((data: RoverImageData[]) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

exports.getRoverImagesForEarthDate = function (req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const year = Number(req.query.year);
  const month = Number(req.query.month);
  const day = Number(req.query.day);
  const rover_type = req.query.rover_type as RoverType;
  const page = Number(req.query.page);

  console.log(year, month, day, rover_type, page);
  return nasaApiService
    .getRoverImagesForEarthDate(year, month, day, rover_type, page)
    .then((data: RoverImageData[]) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

exports.getMarsWeather = function (req: Request, res: Response) {
  return nasaApiService
    .getMarsWeather()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};
