angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('notifierService', ['mvToastr', function(mvToastr){
    return {
        notify: function(msg) {
            mvToastr.success(msg);
        }
    }
}]);