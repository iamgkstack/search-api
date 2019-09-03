const express = require('express');

const search = require('./search');

const supportedMethods = ['get'];

const configureRouter = (app, routes = []) => {
  const { prefix } = config;
  const router = express.Router();

  routes.forEach(route => {
    const method = route.method.toLowerCase();
    const version = route.version || 'v1';

    /* check if method is supported or not?? */
    if (!supportedMethods.includes(method)) {
      throw new Error({
        message: `Method ${method} not suported`
      });
    }
    router[method].apply(router, [`/${version}/${route.path}`, route.action]);

    /* Use default prefix from config if router doesn't provide one */
    app.use(`${route.prefix || prefix}`, router);
  });
};

module.exports = app => {
  configureRouter(app, search);
};
