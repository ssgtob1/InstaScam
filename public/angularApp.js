//angular stuffs


var app = angular.module("instascam", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.when("/Friends", {
        templateUrl : "/Templates/friends.html"
    }).when("/", {
        templateUrl: "/Templates/feed.html"
    }).otherwise({
        templateUrl: '/Templates/feed.html'
    });
});

function NavController($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}