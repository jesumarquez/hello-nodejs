module.exports = function personService() {
    var service = {
        getName: getName
    };
    function getName(){
        return 'Person Name';
    }
    return service;
}
