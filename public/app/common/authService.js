angular.module('app').factory('authService', ['$http', '$window', function($http, $window){

    var auth = {};

    auth.saveToken = function(token) {
        $window.localStorage['brightstarconnect-token'] = token;
    };

    auth.getToken = function () {
        return $window.localStorage['brightstarconnect-token'];
    };

    auth.isLoggedIn = function() {
        var token =  auth.getToken();

        if(token) {
            var payload = auth.getPayload(token);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.currentUserFullName = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = auth.getPayload(token);
            return payload.firstname + ' ' + payload.lastname;
        }
    };

    auth.getPayload = function(token) {
        return JSON.parse($window.atob(token.split('.')[1]));
    };

    auth.logIn = function(user) {
        return $http.post('/login', user).success(function(data){
            auth.saveToken(data.token);
        });
    };

    return auth;
}]);