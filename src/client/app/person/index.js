var personController = require('./person.controller');
var personService = require('./person.service');

module.exports =  angular.module('person.controller', [])
        .factory('personService',[personService])
        .controller('PersonController',[personService.name, personController]);