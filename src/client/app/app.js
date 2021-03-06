(function () {
    var person = require('./person');
    
    angular.module('myapp',['ngRoute',person.name])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/person.view.html',
                controller: 'PersonController',
                controllerAs: 'person'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();
