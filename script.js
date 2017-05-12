  var myApp = angular.module('app', []);
  
  myApp.controller('mainController', function($scope,github,$interval,$log,$anchorScroll,$location){
    
    var onUserComplete = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos,onError);
    };


    var onRepos = function(data){
      $scope.repos = data;
      $location.hash("userDetails");
      $anchorScroll();
    };

    var onError = function(reason) {
      $scope.error = "could not display data" ;

    };

    $scope.search = function(username) {
      $log.info("searching for "+ $scope.username);
      github.getUser($scope.username).then(onUserComplete, onError);

        if(countdownInterval){
          $interval.cancel(countdownInterval)
          $scope.countdown = null;
        }

    };

    var decrementCountdown = function(){
      $scope.countdown -= 1; 
      if($scope.countdown < 1){
        $scope.search($scope.username)
      }
    };
    var countdownInterval = null;
    var startCountdown = function(){
      countdownInterval = $interval(decrementCountdown,1000,$scope.countdown);

    };

    $scope.username = "Angular";
    $scope.message = "GitHub Viewer!";
    $scope.sortOrder ="-stargazers_count";
    $scope.userdetails ="userdetails.html";
    $scope.countdown = 5;
    startCountdown();
  });
  