var myApp = angular.module('app', []);

 //main controller
 myApp.controller('mainController', function($scope, $http){
   
   $scope.search = function(){
     $http.get("https://api.github.com/users/" + $scope.username)
      .then(onComplete, error)
   };
   
   var error = function(){
     $scope.error = "Could not find user";
   };
   
   var onComplete = function(response){
     $scope.user = response.data;
     $http.get($scope.user.repos_url)
      .then(onRepos, error)
   };
   
   var onRepos = function(response){
     $scope.repos = response.data;
   }
  
  $scope.username = "angular";
  $scope.message = "GitHub Viewer";
  $scope.sortOrder = "-stargazers_count";

  
 });

