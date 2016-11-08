angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



  .state('page2', {
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
        templateUrl: 'templates/menu.html'
      }
    }
  })

  .state('page3', {
    url: '/index',
    /*templateUrl: 'templates/page3.html',
    controller: 'page3Ctrl'*/
    views: {
      'baseView': {
        controller: 'page3Ctrl',
        templateUrl: 'templates/page3.html'
      },
      'sideView': {
        templateUrl: 'templates/menu.html'
      }
    }
    /*views: {
      'menuContent': {
        templateUrl: 'templates/page3.html'
      }
    }*/
  })

  .state('page4', {
    url: '/sqstamp',
    templateUrl: 'templates/page4.html',
    controller: 'page4Ctrl'
  })

  .state('page5', {
    url: '/faximile',
    templateUrl: 'templates/page5.html',
    controller: 'page5Ctrl'
  })

  .state('page6', {
    url: '/sale-order',
   /* templateUrl: 'templates/page6.html',
    controller: 'page6Ctrl'*/
    views: {
      'baseView': {
        controller: 'page6Ctrl',
        templateUrl: 'templates/page6.html'
      },
      'sideView': {
        templateUrl: 'templates/menu.html'
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
