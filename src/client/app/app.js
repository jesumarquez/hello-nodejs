(function () {
    angular.module('myapp',[])
    .controller('PersonController', PersonController);
    
    function PersonController(){
        var vm = this;
        vm.name = 'Pepe';
    }
})();
