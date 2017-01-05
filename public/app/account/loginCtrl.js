angular.module('app').controller('loginCtrl', ['$scope', '$state', 'authService', function($scope, $state, authService) {
    
    $scope.user = {};

    $scope.logIn = function(){
        authService.logIn($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            $state.go('main');
        });
    };
}]);