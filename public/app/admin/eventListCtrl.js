angular.module('app').controller('eventListCtrl', ['$scope', function($scope) {
    $scope.events = [
        {name: 'Church Year End Review and Vision', date: new Date('1/21/2017'), publish:true},
        {name: "Men's Summit", date: new Date('1/27/2017'), publish:false},
        {name: 'Family Day', date: new Date('1/29/2017'), publish:true}
    ];
}]);