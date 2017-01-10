angular.module('app').controller('mainCtrl', ['$scope', function($scope) {
    $scope.technologies = [
        {name: 'MEAN Stack - MongoDB, Express 4, Angular 1.5, Node.js'},
        {name: 'UI Router - flexible routing in AngularJS'},
        {name: 'Toastr - JS library for non-blocking notifications'},
        {name: 'express-generator - quickly generate express application skeleton'},
        {name: 'mongoose - elegant mongodb object modeling for node.js'},
        {name: 'passport - authentication middleware for node.js'},
        {name: 'JSON Web Tokens - assisting with security in application'},
        {name: 'express-jwt - middleware that validates JsonWebtokens'},
        {name: 'nodemailer - send e-mails with Node.js'},
        {name: 'Heroku - cloud app hosting (Platform as a Service)'},
        {name: 'mLab - cloud hosted MongoDB (Database as a Service)'}
    ];
}]);