angular.module('app').controller('eventListCtrl', ['$scope', 'eventService', function($scope, eventService) {
    $scope.events = [];

    eventService.GetAll()
        .then(function (events) {
            $scope.events = events;
        });
}]);