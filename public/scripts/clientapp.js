var myApp = angular.module("myApp", []);

myApp.controller('IndexController', ['$scope','$http', function ($scope, $http) {
  console.log('angular rocks');



//cutomers
      $http({
      method: 'GET',
      url: '/customers'
    }).then(function(response) {
      console.log(response.data);
      $scope.customers = response.data;

    });

//orders

$scope.assignData = function (param) {
console.log(param);

    $http({
        method: 'GET',
        url: '/orders/'+ param
    }).then(function(response) {
      var data = response.data;
        console.log(data);
        // $scope.orders = response.data;
    });
  };


  }
]);
