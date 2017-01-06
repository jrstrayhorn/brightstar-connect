angular.module('app').controller('eventAddEditCtrl', ['$scope', 'eventService', 'notifierService', '$state', function($scope, eventService, notifierService, $state) {
    
    $scope.event = {};
    $scope.saveEvent = saveEvent;

    initController();

    function initController() {
        $scope.loading = 0;

        if (1 == -1) {

        } else {
            // initialize with defaults
            $scope.event = {
                publish: true
            };
        }
    }

    function saveEvent() {
        eventService.Save($scope.event)
            .then(function() {
                notifierService.notify('Event saved');
                $state.go('adminEvents');
            })
            .catch(function (error) {
                notifierService.error(error);
            });
    }
}]);