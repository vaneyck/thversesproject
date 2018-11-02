module.exports = {
  pwa: {
    themeColor: '#D0021B',
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: new RegExp('\.(?:css|js|)$'),
          handler: 'networkFirst'
        },
        {
          urlPattern: new RegExp('\.(?:png|gif|jpg|jpeg|svg)$'),
          handler: 'cacheFirst'
        },
        {
          urlPattern: new RegExp('https://api.jsonbin.io/(.*)'),
          handler: 'networkFirst'
        },
        {
          urlPattern: new RegExp('http://theversesproject.com/(.*)'),
          handler: 'networkFirst'
        }
      ]
    }
  }
}