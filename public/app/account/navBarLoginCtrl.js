angular.module('app').controller('navBarLoginCtrl', ['$scope', 'authService', function($scope, authService) {
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.currentUserFullName = authService.currentUserFullName;
}]);