angular.module('app', ['ui.router']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '/app/main/main.html',
            controller: 'mainCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: '/app/account/login.html',
            controller: 'loginCtrl'
        })

        ;

    $urlRouterProvider.otherwise('main');

}]);