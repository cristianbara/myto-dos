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
        title: 'Something super important',
        description: 'Describing the super important thing I have to do, in detail so I don\'t loose track of the real important stuff.',
        done: true,
        show: true,
        pomodoros: 10,
        createdDate: 1512767393799
    },
    {
        type: 'worf',
        title: 'Something I should do',
        description: 'Well, no pomodors for this one, but it still would be nice to do this before the end of the day.',
        done: false,
        show: true,
        pomodoros: 3,
        createdDate: 1512767393799
    },

];


/*
 * @module myToDoApp 
 */
//var showMenu = false;
angular.module('myToDoApp', ['contenteditable', 'ngStorage', 'ngAnimate'])
    .controller('myToDoAppController', function ($scope, $filter, $localStorage, $timeout) {

        $scope.Math = window.Math;
        $scope.pomodoro = {
            time: 0,
            started: false,
            isOnBreak: false,
            pomodoroTime: 25,
            pomodoroBreak: 5
        };
        $scope.pageName = '';
        $scope.showPomodoro = false;
        $scope.newItem = {
            show: true,
            title: '',
            description: '',
            done: false,
            pomodoros: 0,
            createdDate: ''
        };

        function isToday(dateString) {
            var thatDay = new Date(dateString);
            console.log(dateString, thatDay);
            var today = new Date();
            if (thatDay.getDate() === today.getDate() && thatDay.getMonth() === today.getMonth() && thatDay.getFullYear() === today.getFullYear()) {
                return true;
            };
            return false;
        }

        function isYesterday(dateString) {
            var thatDay = new Date(dateString);
            var yesterday = new Date();
            yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1));
            if (thatDay.getDate() === yesterday.getDate() && thatDay.getMonth() === yesterday.getMonth() && thatDay.getFullYear() === yesterday.getFullYear()) {
                return true;
            };
            return false;
        }
        $scope.showToDoList = function (nr) {
            $scope.showPomodoro = false;
            switch (nr) {
                case 1: // today
                    $scope.pageName = 'today';
                    for (var i = 0; i < $scope.model.length; i++) {
                        if (isToday($scope.model[i].createdDate)) {
                            $scope.model[i].show = true;
                        } else {
                            $scope.model[i].show = false;
                        }
                    };
                    break;
                case 0: // yesterday
                    $scope.pageName = 'yesterday';
                    for (var i = 0; i < $scope.model.length; i++) {
                        if (isYesterday($scope.model[i].createdDate)) {
                            $scope.model[i].show = true;
                        } else {
                            $scope.model[i].show = false;
                        }
                    };
                    break;
                case -1: // since forever :)
                    $scope.pageName = 'since forever';
                    for (var i = 0; i < $scope.model.length; i++) {
                        $scope.model[i].show = true;
                    };
                    break;
                default:
                    break;
            }
        }
        $scope.displayPomodoro = function () {
                $scope.showPomodoro = true;
                $scope.pageName = 'pomodoro'
            }
            /*
             * orderBy is a function reference to the $filter service. 
             */
        var orderBy = $filter('orderBy');



        $scope.save = function () {
            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;
        }

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
         * Function which adds a default life item to the @model.
         * @return {undefined}
         */
        $scope.addToDo = function (newItem) {
            var newItemCopy = angular.copy(newItem);

            //newItemCopy.createdDate = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear() +"   "+ (now.getHours()<10?'0':'') + +now.getHours() + ":" + (now.getMinutes()<10?'0':'') + + now.getMinutes();
            newItemCopy.createdDate = Date.now();
            // push the item to the $scope model list
            $scope.model.splice(0, 0, newItemCopy);

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

            //hide menu
            $scope.showMenu = false;

        };

        /*
         * Function which cancels a todo item creation.
         * @return {undefined}
         */
        $scope.resetToDo = function () {
            $scope.newItem = {
                title: '',
                description: '',
                show: true,
                done: false,
                pomodoros: 0,
                createdDate: ''
            }
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

        var runPomodoro = function () {
            $timeout(function () {
                    if ($scope.pomodoro.started && $scope.pomodoro.time <= 1500){
                        $scope.pomodoro.time++;
                        console.log($scope.pomodoro.time)
                        runPomodoro();
                    } else {
                       $scope.stopPomodoro(); 
                    }
                }, 1000);
        };
        
        $scope.startPomodoro = function() {
            $scope.pomodoro.started = true;
            runPomodoro();
        }

        $scope.stopPomodoro = function () {
            $scope.pomodoro.time = 0;
            $scope.pomodoro.started = false;
        };

        /*
         * Loads data model from local storage is it exisits. 
         */
        if ($localStorage.myToDos) {

            $scope.model = $localStorage.myToDos;

        } else {

            $scope.model = model;
        };

        $scope.showToDoList(1);

        $scope.$watch('model', function () {
            $scope.save();
        });
    });