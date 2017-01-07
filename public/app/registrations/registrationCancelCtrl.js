angular.module('app').controller('registrationCancelCtrl', ['$scope', '$stateParams', 'registrationService', 'notifierService', '$state', function($scope, $stateParams, registrationService, notifierService, $state) {
    
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
                $state.go('events');
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