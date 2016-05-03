/* 
 * (c) 2016 Cristian-Dan Bara, http://cristianbara.github.io/
 * License: CC BY-NC-ND 3.0, http://creativecommons.org/licenses/by-nc-nd/3.0/
 */


/*
 * The starter model for the application. 
 * It contains a set of list items, se second one is marked as done
 * @property {object} model[@index {number}] 
 * @property {string} model[@index {number}].text - the text information of each list item
 * @property {boolean} model[@index {number}].done - marks wwther the item is done (true), or not (false)
 */
var model = [
    {
        type: 'life',
        text: 'A done task',
        done: true
    },
    {
        type: 'work',
        text: 'An active task',
        done: false
    },

];



/*
 * Function which opens a url.
 * @param {string} url - the URL string
 * @return {undefined}
 */
var openURL = function (url) {
    if (device.platform === 'Android') {
        navigator.app.loadUrl(url, {
            openExternal: true
        });
    } else {
        window.open(url, '_system');
    }
};




/*
 * @module myToDoApp 
 */
//var showMenu = false;
angular.module('myToDoApp', ['contenteditable', 'ngStorage', 'ngAnimate'])
    .controller('myToDoAppController', function ($scope, $filter, $localStorage) {



        /*
         * @param {boolean} $scope.showMenu - flag which trigger the display/hiding of the floating action menu
         */
        $scope.showMenu = false;



        /*
         * Loads data model from local storage is it exisits. 
         */
        if ($localStorage.myToDos) {

            $scope.model = $localStorage.myToDos;

        } else {

            $scope.model = model;
        };



        /*
         * orderBy is a function reference to the $filter service. 
         */
        var orderBy = $filter('orderBy');



        /*
         * @param {boolean} $scope.showMenu - flag which trigger the display/hiding of the left hand side menu
         */
        $scope.showLeftMenu = false;



        /*
         * Function which toggles the left menu
         * @return {undefined}
         */
        $scope.toggleLeftMenu = function () {
            $scope.showLeftMenu = !$scope.showLeftMenu;
        };



        /*
         * Function which marks an item as done.
         * @param {object} item - a @model item
         * @return {undefined}
         */
        $scope.markAsDone = function (index) {
            // change the done flag for the index item
            $scope.model[index].done = true;

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

        };



        /*
         * Function which marks an item as not done.
         * @param {object} item - a @model item
         * @return {undefined}
         */
        $scope.markUndone = function (index) {
            // change the done flag for the index item
            $scope.model[index].done = false;

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

        };



        /*
         * Function which orders a data @model according to the @done parameter and then save the result in the local storage.
         * @return {undefined}
         */
        $scope.orderList = function () {
            $scope.model = orderBy($scope.model, 'done', false);
            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;
        };




        /*
         * Function which removes an item from the @model.
         * @param {object} item - a @model item
         * @return {undefined}
         */
        $scope.removeToDo = function (index) {
            // take out the index item from the $scope model
            $scope.model.splice(index, 1);

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

        };



        /*
         * Function which toggles the floating action menu.
         * @return {undefined}
         */
        $scope.btnMenu = function () {
            if ($scope.showMenu == true) {
                $scope.showMenu = false;
                // roatate icon towards +
                // show menu items
            } else {
                $scope.showMenu = true;
                // rotate icon towards x

            }
        };



        /*
         * Function which adds a default life item to the @model.
         * @return {undefined}
         */
        $scope.addToDoLife = function () {
            // make a new, empty item
            var newItem = {
                    type: 'life',
                    text: '',
                    done: false
                }
                // push the item to the $scope model list
            $scope.model.splice(0, 0, newItem);

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

            //hide menu
            $scope.showMenu = false;

        };




        /*
         * Function which adds a default work item to the @model.
         * @return {undefined}
         */
        $scope.addToDoWork = function () {
            // make a new, empty item
            var newItem = {
                    type: 'work',
                    text: '',
                    done: false
                }
                // push the item to the $scope model list
            $scope.model.splice(0, 0, newItem);

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

            //hide menu
            $scope.showMenu = false;

        };




        /*
         * Function which deletes all items in the @model
         * @return {undefined}
         */
        $scope.deleteList = function () {
            $scope.model = [];

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;
        };




        /*
         * Function which resets the @model, turning all items to done = false.
         * @return {undefined}
         */
        $scope.resetList = function () {
            for (i = 0; i < $scope.model.length; i++) {
                $scope.model[i].done = false;
            }

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;
        };
    });