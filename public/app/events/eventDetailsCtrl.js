angular.module('app').controller('eventDetailsCtrl', ['$scope', 'eventService', '$stateParams', 'notifierService', '$state', 'authService', function($scope, eventService, $stateParams, notifierService, $state, authService) {
    
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.registration = {};
    $scope.event = {};
    $scope.saveRegistration = saveRegistration;

    initController();

    function initController() {
        $scope.loading = 0;

        if($stateParams._id) {
            $scope.loading += 1;
            eventService.GetById($stateParams._id)
                .then(function (event) {
                    $scope.loading -= 1;
                    $scope.event = event;
                });
        }
    }

    function saveRegistration() {
        eventService.SaveRegistration($stateParams._id, $scope.registration)
            .then(function() {
                notifierService.notify('Registration saved.  Email confirmation has been sent.');
                if(!authService.isLoggedIn()){
                    // normal user
                    $state.go('events');
                } else {
                    // admin user - return to registration list
                    $state.go('adminEventRegistrations', {"_id":$stateParams._id});
                }
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