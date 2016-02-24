var myApp = angular.module("myApp", []);

myApp.controller('IndexController', ['$scope','$http', function ($scope, $http) {
  console.log('angular rocks');

      $http({
      method: 'GET',
      url: '/customers'
    }).then(function(response) {
      console.log(response.data);
      $scope.customers = response.data;
    });

    $http({
        method: 'GET',
        url: '/orders'
    }).then(function(response) {
        console.log(response.data);
        $scope.orders = response.data;
    });


  }
]);
