angular.module('app').controller('registrationCancelCtrl', ['$scope', '$stateParams', 'registrationService', 'notifierService', '$state', 'authService', function($scope, $stateParams, registrationService, notifierService, $state, authService) {
    
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.registration = {};
    $scope.cancelRegistration = cancelRegistration;

    initController();

    function initController() {
        $scope.loading = 0;
        
        if($stateParams._id) {
            $scope.loading += 1;
            registrationService.GetById($stateParams._id)
                .then(function (registration) {
                    $scope.loading -= 1;
                    $scope.registration = registration;
                });
        }
    }

    function cancelRegistration() {
        registrationService.CancelRegistration($stateParams._id)
            .then(function() {
                notifierService.notify('The registration has been cancelled.');
                if(!authService.isLoggedIn()){
                    // normal user
                    $state.go('events');
                } else {
                    // admin user - return to registration list
                    $state.go('adminEventRegistrations', {"_id":$scope.registration.event._id});
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