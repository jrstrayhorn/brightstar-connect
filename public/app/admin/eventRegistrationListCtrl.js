angular.module('app').controller('eventRegistrationListCtrl', ['$scope', '$stateParams', 'eventService', function($scope, $stateParams, eventService) {
    $scope.event = {};

    initController();

    function initController() {
        $scope.loading = 0;

        if($stateParams._id) {
            $scope.loading += 1;
            eventService.GetByIdWithRegistrations($stateParams._id)
                .then(function (event) {
                    $scope.loading -= 1;
                    $scope.event = event;
                });
        }
    }
}]);