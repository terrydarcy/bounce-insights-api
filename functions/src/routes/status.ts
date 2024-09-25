let statusRouter = require('express').Router();
let status_controller = require('../controllers/statusController');

statusRouter.get('/', status_controller.getStatus);

module.exports = statusRouter;
