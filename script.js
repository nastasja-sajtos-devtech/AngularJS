var myApp = angular.module('app', []);

 //main controller
 myApp.controller('mainController', function($scope, $http){
  
  $http.get("https://api.github.com/users/nastasja-sajtos-devtech")
      .then(function(response){
        $scope.user = response.data;
      }, function(reason){
        $scope.error = "Could not fetch the user";
      })
  
  $scope.message = "Hello, Angular";

  
 });

