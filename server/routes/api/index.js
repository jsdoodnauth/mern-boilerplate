/**
 * API Endpoints
 * 
 * @description:: Index file for the Rest endpoints for the application. All routes with '/rs' come through here.
 * 
 */

const RSRouter = require('express').Router();

RSRouter.get('/healthcheck', (req, res, next) => {
    return res.json({ status: 'UP' });
});

module.exports = RSRouter;