angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



  .state('page2', {
    cache: false,
    url: '/rstamp',
    /*templateUrl: 'templates/page2.html',
    controller: 'page2Ctrl'*/
   /* views: {
      'menuContent': {
        templateUrl: 'templates/page2.html'
      }
    }*/
    views: {
      'baseView': {
        controller: 'page2Ctrl',
        templateUrl: 'templates/page2.html'
      },
      'sideView': {
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      }
    }
  })

  .state('page3', {
    cache: false,
    url: '/index',
    /*templateUrl: 'templates/page3.html',
    controller: 'page3Ctrl'*/
    views: {
      'baseView': {
        controller: 'page3Ctrl',
        templateUrl: 'templates/page3.html'
      },
      'sideView': {
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      }
    }
    /*views: {
      'menuContent': {
        templateUrl: 'templates/page3.html'
      }
    }*/
  })

  .state('page4', {
    cache: false,
    url: '/sqstamp',
    /*templateUrl: 'templates/page4.html',
    controller: 'page4Ctrl'*/
    views: {
      'baseView': {
        controller: 'page4Ctrl',
        templateUrl: 'templates/page4.html'
      },
      'sideView': {
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      }
    }
  })

  .state('page5', {

    cache: false,
    url: '/faximile',
    /*templateUrl: 'templates/page5.html',
    controller: 'page5Ctrl'*/
    views: {
      'baseView': {
        controller: 'page5Ctrl',
        templateUrl: 'templates/page5.html'
      },
      'sideView': {
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      }
    }
  })

  .state('page6', {

    cache: false,
    url: '/sale-order',
   /* templateUrl: 'templates/page6.html',
    controller: 'page6Ctrl'*/
    views: {
      'baseView': {
        controller: 'page6Ctrl',
        templateUrl: 'templates/page6.html'
      },
      'sideView': {
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      }
    }
  })

    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'menuCtrl'
    })

$urlRouterProvider.otherwise('/index')



});
