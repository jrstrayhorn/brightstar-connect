angular.module('app').factory('eventService', ['$http', '$q', 'authService', function($http, $q, authService){

    var apiUrl = '/api/events';
    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.GetByIdWithRegistrations = GetByIdWithRegistrations;
    service.Save = Save;
    service.SaveRegistration = SaveRegistration;

    return service;

    function GetAll() {
        return $http.get(apiUrl).then(handleSuccess, handleError);
    }

    function GetById(_id) {
        return $http.get(apiUrl + '/' + _id).then(handleSuccess, handleError);
    }

    function GetByIdWithRegistrations(_id) {
        return $http.get(apiUrl + '/' + _id + '/registrations', {
            headers: {Authorization: 'Bearer ' + authService.getToken()}
        }).then(handleSuccess, handleError);
    }

    function Save(event) {
        if (event._id) {
            // update
            return $http.put(apiUrl + '/' + event._id, event, {
                headers: {Authorization: 'Bearer ' + authService.getToken()}
            }).then(handleSuccess, handleError);
        } else {
            // create
            return $http.post(apiUrl, event, {
                headers: {Authorization: 'Bearer ' + authService.getToken()}
            }).then(handleSuccess, handleError);
        }
    }

    function SaveRegistration(_id, registration) {
        return $http.post(apiUrl + '/' + _id + '/registrations', registration)
            .then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }
}]);