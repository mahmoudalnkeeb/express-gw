const { Router } = require('express');
const { setupGatewayProxy, checkServicesStatus } = require('../utils/proxy.utils');
const servicesConfig = require('../configs/services.config');

const gatewayRouter = Router();
const services = servicesConfig.services;

setupGatewayProxy(gatewayRouter, services);
gatewayRouter.get('/status', async (req, res) => {
  const statuses = await checkServicesStatus(services);
  res.json(statuses);
});

module.exports = gatewayRouter;
