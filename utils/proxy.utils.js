const RPM = 100;

const ratelimiterMw = require('../mws/ratelimiter.mw');
const { legacyCreateProxyMiddleware } = require('http-proxy-middleware');
const { default: axios } = require('axios');
const logger = require('./logger.utils');

function setupGatewayProxy(gatewayRouter, services) {
  for (const { route, target } of services) {
    const proxyOpts = {
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${route}`]: '',
      },
    };

    logger.info(`service loaded route > ${route} | target > ${target}`);
    gatewayRouter.use(route, ratelimiterMw(RPM), legacyCreateProxyMiddleware(proxyOpts));
  }
}

async function checkServicesStatus(services) {
  const statusPromises = services.map(async ({ route, target }) => {
    try {
      await axios.get(target);
      return { service: route, status: 'up' };
    } catch (error) {
      return { service: route, status: 'down' };
    }
  });

  return Promise.all(statusPromises);
}

module.exports = {
  setupGatewayProxy,
  checkServicesStatus,
};
