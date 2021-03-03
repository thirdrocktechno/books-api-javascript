module.exports = {
    env: process.env.NODE_ENV || 'development',
    datastores: {
      default: {
        url: (function () {
          let ret = process.env.MONGO_URL
          return ret
        })()
      },
    },
    port: process.env.PORT || 1338,
    models: {
      migrate: 'safe',
    }
  };