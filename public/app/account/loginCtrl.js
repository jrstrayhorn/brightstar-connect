angular.module('app').controller('loginCtrl', ['$scope', '$state', 'authService', 'notifierService', function($scope, $state, authService, notifierService) {
    
    $scope.user = {};

    $scope.logIn = function(){
        authService.logIn($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            notifierService.notify('You have successfully log in!');
            $state.go('main');
        });
    };
}]);