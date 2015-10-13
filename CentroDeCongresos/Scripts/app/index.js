if (localStorage.getItem("empresa")) {
    location.replace("http://localhost:51260/home.html");
}

var url = "https://alumnoscurso.azure-mobile.net/Tables/centro_de_congresos15";

var app = angular.module("login", ["ngMaterial"]);

app.controller("loginCTRL", ["$scope", "$http", function ($scope, $http) {

    //obtencion del ID de la empresa almacenada en el localstorage
    $scope.saveEmpresaValues = function (empresa) {
        $http.get(url + "?$filter=empresa eq '" + empresa + "'")
            .then(function (res) {
                //si se ha encontrado el ID
                if (res.data !== []) {
                    localStorage.setItem("empresaID", res.data[0].id);
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
                    }).then(
                        function (res) {
                            console.log("Creado ID para la nueva empresa");
                            localStorage.setItem("empresaID", res.data[0].id);
                            location.replace("http://localhost:51260/home.html");
                        }
                    );
                }
            });

    }

    $scope.submit = function () {

        $scope.saveEmpresaValues($scope.datos.nombre);
        localStorage.setItem("empresa", $scope.datos.nombre);

    }

}]);
