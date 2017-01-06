angular.module('app').controller('eventAddEditCtrl', ['$scope', 'eventService', 'notifierService', '$state', '$stateParams', function($scope, eventService, notifierService, $state, $stateParams) {
    
    $scope.event = {};
    $scope.saveEvent = saveEvent;

    initController();

    function initController() {
        $scope.loading = 0;

        if ($stateParams._id) {
            $scope.loading += 1;
            eventService.GetById($stateParams._id)
                .then(function(event) {
                    $scope.loading -= 1;
                    $scope.event = event;
                });
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
                if(error.message) {
                    notifierService.error(error.message);
                } else {
                    notifierService.error(error);
                }
            });
    }
}]);