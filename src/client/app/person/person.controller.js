module.exports = function PersonController(personService) {
    var vm = this;
    vm.name = personService.getName();
}
