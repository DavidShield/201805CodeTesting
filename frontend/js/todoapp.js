var app = angular.module('todoapp', []);

app.controller('appCtrl', function($scope, $http) {
    $scope.name = "Actions to do";
    /**
     * TODO:
     * 1.use $http to call backend rest API
     * GET todos(Which is corresponding to index() function inside TodoController)(AJAX CALL)
     * 2.store all data in todolist variable, then use ng-repeat to show a list(using ul li tag) in index.html
     */
    // $PATH=/Users/shield/Desktop/Amerilink/backend/app/Http/Controllers/TodoController.php
    $scope.getTodo = function() {
        $http({
            method: 'GET', 
            url: '../backend/app/Http/Controllers/TodoController.php?action=index'
            
        }).then(function(response) {
            //on success
            $scope.todoList = response.data.records;
            
        }, function(response) {
            //on error
            console.log(response.data, response.status);
            
        });
    };
    
    

    /**
     * TODO:
     * 1.Each task can be delete. when user click(need to create event handler) on that task.
     * 2.Send delete request to rest API to delete it in mysql database.(AJAX CALL)
     */
    $scope.deleteTodo = function(id) {
       $http({
           method: 'POST',
           url: '../backend/app/Http/Controllers/TodoController.php?action=destroy',
           data: {recordId : id}
       }).then(function (response) {
           //on success
            $scope.getTodo();   
           
        },function(response) {
            //on error
            console.log(response.data, response.data);
           
        });
        
        $scope.getTodo();
    };
    
    /**
     * TODO:
     * 1.create a form under the todo list
     * 2.user create a new todo task; send data to backend rest API
     * 3.store the new todo task in database and return the new list
     * 4.update $scope.todoList with the API returned new list
     */
    $scope.addTodo = function() {
        $http({
            method: 'POST',
            url: '../backend/app/Http/Controllers/TodoController.php?action=store',
            data: {newTodo: $scope.newTodo}
        }).then(function (response) {
            //on success
            $scope.getTodo();
            
        }, function(response) {
            //on error
            console.log(response.data, response.status);
            
        });
    };
    /**
     * optional tasks:
     * 1.edit todo task
     */
});