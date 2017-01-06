angular.module('app').factory('eventService', ['$http', '$q', 'authService', function($http, $q, authService){

    var apiUrl = '/api/events';
    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Save = Save;

    return service;

    function GetAll() {
        return $http.get(apiUrl).then(handleSuccess, handleError);
    }

    function GetById(_id) {
        return $http.get(apiUrl + '/' + _id).then(handleSuccess, handleError);
    }

    function Save(event) {
        if (1 == -1) {
            // update
        } else {
            // create
            return $http.post(apiUrl, event, {
                headers: {Authorization: 'Bearer ' + authService.getToken()}
            }).then(handleSuccess, handleError);
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