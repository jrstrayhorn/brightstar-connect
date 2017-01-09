angular.module('app').controller('mainCtrl', ['$scope', function($scope) {
    $scope.technologies = [
        {name: 'MEAN Stack - MongoDB, Express 4, Angular 1.5, Node'},
        {name: 'UI Router'},
        {name: 'Toastr'},
        {name: 'jQuery'},
        {name: 'express-generator'},
        {name: 'mongoose'},
        {name: 'passport'},
        {name: 'JSON Web Tokens'},
        {name: 'express-jwt'},
        {name: 'nodemailer'}
    ];
}]);