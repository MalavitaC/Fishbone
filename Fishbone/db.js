const router = require('koa-router')();

class registerControllers {

  async addControllers(controllerFiles) {

    for (let i in controllerFiles) {
      console.log(`process controller: ${controllerFiles[i]}...`)
      let routes = require(`../controllers/${controllerFiles[i]}`)
      await this.addRoutes(router, routes)
    }
    return router.routes();
  }

  async addRoutes(routes) {

    let ctl = new routes.fn();
    let route = Object.getOwnPropertyNames(routes.fn.prototype).sort();
    for (var i = route.length - 1; i >= 1; i--) {
      
      router.all(`/${routes.name}/${route[i]}`, ctl[route[i]]);
    }
  }
};

module.exports = new registerControllers();
// function addRoutes(router, routes) {

//   let ctl = new routes.fn();
//   let route = Object.getOwnPropertyNames(routes.fn.prototype).sort();
//   for (var i = route.length - 1; i >= 1; i--) {
    
//     router.all(`/${routes.name}/${route[i]}`, ctl[route[i]]);
//   }
// }

// function addControllers(router) {
//   let files = fs.readdirSync('../controllers')

//   let controllerFiles = files.filter(f => {
//     return f.endsWith('.js')
//   })

//   for (let i in controllerFiles) {
//     console.log(`process controller: ${controllerFiles[i]}...`)
//     let routes = require(`../controllers/${controllerFiles[i]}`)
//     addRoutes(router, routes)
//   }
// }

// module.exports = () => {
//   let router = require('koa-router')()
//   addControllers(router)
//   return router.routes()
// }