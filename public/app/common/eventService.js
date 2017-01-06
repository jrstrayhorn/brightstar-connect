angular.module('app').factory('eventService', ['$http', '$q', function($http, $q){

    var apiUrl = '/api/events';
    var service = {};

    service.GetAll = GetAll;

    return service;

    function GetAll() {
        return $http.get(apiUrl).then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }
}]);