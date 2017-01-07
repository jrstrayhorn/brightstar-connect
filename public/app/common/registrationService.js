angular.module('app').factory('registrationService', ['$http', '$q', 'authService', function($http, $q, authService){

    var apiUrl = '/api/registrations';
    var service = {};

    service.GetById = GetById;
    service.CancelRegistration = CancelRegistration;

    return service;

    function GetById(_id) {
        return $http.get(apiUrl + '/' + _id).then(handleSuccess, handleError);
    }

    function CancelRegistration(_id) {
        return $http.put(apiUrl + '/' + _id + '/cancel').then(handleSuccess, handleError);
    }

    // private functions
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }

}]);