var model = [
    {
        type: 'life',
        text:'A done task',
        done: true        
    },
     {
        type: 'work',
        text:'An active task',
        done: false
    },
    
];

var openURL = function (url) {
    if (device.platform === 'Android') {
        navigator.app.loadUrl(url, {
            openExternal: true
        });
    } else {
        window.open(url, '_system');
    }
};

var showMenu = false;
angular.module('myToDoApp', ['contenteditable', 'ngStorage', 'ngAnimate'])
    .controller('myToDoAppController', function($scope, $filter, $localStorage) {
    // controller code goes here
    $scope.showMenu = false;
    
    if($localStorage.myToDos) {
        
        $scope.model = $localStorage.myToDos;
    
    } else {
        
        $scope.model = model;
    };
    var orderBy = $filter('orderBy');
    $scope.showLeftMenu = false;
    $scope.toggleLeftMenu = function () {
            $scope.showLeftMenu = !$scope.showLeftMenu;
    };
    
    $scope.markAsDone = function(index) {
        // change the done flag for the index item
        $scope.model[index].done = true;
        
        // save the new $scope model to local storage
        $localStorage.myToDos = $scope.model;
       
    }
    
      $scope.markUndone = function(index) {
        // change the done flag for the index item
        $scope.model[index].done = false;
        
        // save the new $scope model to local storage
        $localStorage.myToDos = $scope.model;
       
    }
    
    $scope.orderList = function () {
            $scope.model = orderBy($scope.model, 'done', false);
            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;
        }
    
    $scope.removeToDo = function(index) {
        // take out the index item from the $scope model
        $scope.model.splice(index, 1);
        
        // save the new $scope model to local storage
        $localStorage.myToDos = $scope.model;
        
    }
    $scope.btnMenu = function() {
        if ($scope.showMenu == true) {
            $scope.showMenu = false;
            // roatate icon towards +
            // show menu items
        } else {
            $scope.showMenu = true;
            // rotate icon towards x
            
        }
    }
    $scope.addToDoLife = function() {
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
                
    }
    $scope.addToDoWork = function() {
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
                
    }
    
    $scope.deleteList = function() {
        $scope.model = [];
        
        // save the new $scope model to local storage
        $localStorage.myToDos = $scope.model;        
    }
    
    $scope.resetList = function() {
        for(i=0; i<$scope.model.length; i++){
            $scope.model[i].done = false;
        }
        
        // save the new $scope model to local storage
        $localStorage.myToDos = $scope.model; 
    }
});