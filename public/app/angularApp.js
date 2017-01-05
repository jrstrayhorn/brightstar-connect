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
            controller: 'loginCtrl',
            onEnter: ['$location', 'authService', function($location, authService){
                if(authService.isLoggedIn()){
                    $location.path("/");
                }
            }]
        })

        .state('adminEvents', {
            url: '/admin/events',
            templateUrl: '/app/admin/event-list.html',
            controller: 'eventListCtrl',
            onEnter: ['$location', 'authService', function($location, authService){
                if(!authService.isLoggedIn()){
                    $location.path("/");
                }
            }]
        })

        ;

    $urlRouterProvider.otherwise('main');

}]);