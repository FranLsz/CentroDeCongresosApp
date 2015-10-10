if (localStorage.getItem("empresa")) {
    location.replace("http://localhost:51260/home.html");
}

var app = angular.module("login", ["ngMaterial"]);

app.controller("loginCTRL", ["$scope", function ($scope) {

    $scope.datos = {
        nombre: ""
    };

    $scope.submit = function () {
        localStorage.setItem("empresa", $scope.datos.nombre);
        location.replace("http://localhost:51260/home.html");
    }

}]);
