angular.module('app').factory('eventService', ['$http', '$q', function($http, $q){

    var apiUrl = '/api/events';
    var service = {};

    service.GetAll = GetAll;
    service.Save = Save;

    return service;

    function GetAll() {
        return $http.get(apiUrl).then(handleSuccess, handleError);
    }

    function Save(event) {
        if (1 == -1) {
            // update
        } else {
            // create
            return $http.post(apiUrl, event).then(handleSuccess, handleError);
        }
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }
}]);