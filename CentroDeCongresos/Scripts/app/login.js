if (localStorage.getItem("empresa")) {
    location.replace("http://localhost:51260/home.html");
}

var url = "https://alumnoscurso.azure-mobile.net/Tables/centro_de_congresos15";

var app = angular.module("login", ["ngMaterial"]);

app.controller("loginCTRL", ["$scope", "$http", function ($scope, $http) {

    $scope.datos = {
        nombre: ""
    };

    //obtencion del ID de la empresa almacenada en el localstorage
    $scope.saveEmpresaValues = function (empresa) {
        $http.get(url + "?$filter=empresa eq '" + empresa + "'")
        .success(function (res) {
            //si se ha encontrado el ID
            if (res.length !== 0) {
                localStorage.setItem("empresaID", res[0].id);
                console.log("ID obtenido");
                location.replace("http://localhost:51260/home.html");
            } else {
                //si no se ha encontrado se crea uno para la nueva empresa
                console.log("ID no encontrado");
                $http({
                    method: "POST",
                    url: url,
                    data: {
                        empresa: empresa,
                        conferencias_json: "[]",
                        asistentes_json: "[]"
                    }
                }).success(
                    function (res) {

                        console.log(res);
                        console.log("Creado ID para la nueva empresa");
                        localStorage.setItem("empresaID", res.id);
                        location.replace("http://localhost:51260/home.html");
                    }
                );
            }
        })
        .error(function () {
            console.log("Problemas al buscar el ID");
        });
    }

    $scope.submit = function () {

        $scope.saveEmpresaValues($scope.datos.nombre);
        localStorage.setItem("empresa", $scope.datos.nombre);

    }

}]);
