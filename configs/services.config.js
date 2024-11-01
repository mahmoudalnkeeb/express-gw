module.exports = {
  services: [
    {
      route: process.env.DUMMY_SERVICE_ROUTE || '/dummy',
      target: process.env.DUMMY_SERVICE_TARGET || 'https://dummy.com',
    },
  ],
};
