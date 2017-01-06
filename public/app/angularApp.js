angular.module('app', ['ui.router']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '/app/main/main.html',
            controller: 'mainCtrl'
        })

        .state('events', {
            url: '/events',
            templateUrl: '/app/events/event-list.html',
            controller: 'eventListCtrl'
        })

        .state('eventDetails', {
            url: '/events/:_id',
            templateUrl: '/app/events/event-details.html',
            controller: 'eventDetailsCtrl'
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

        .state('adminEventsAdd', {
            url: '/admin/events/add',
            templateUrl: '/app/admin/event-add-edit.html',
            controller: 'eventAddEditCtrl',
            onEnter: ['$location', 'authService', function($location, authService){
                if(!authService.isLoggedIn()){
                    $location.path("/");
                }
            }]
        })

        .state('adminEventsEdit', {
            url: '/admin/events/edit/:_id',
            templateUrl: '/app/admin/event-add-edit.html',
            controller: 'eventAddEditCtrl',
            onEnter: ['$location', 'authService', function($location, authService){
                if(!authService.isLoggedIn()){
                    $location.path("/");
                }
            }]
        })

        ;

    $urlRouterProvider.otherwise('main');

}]);