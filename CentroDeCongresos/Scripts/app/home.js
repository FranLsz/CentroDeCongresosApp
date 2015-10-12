//Comprobacion de que tenemos un nombre de empresa
if (!localStorage.getItem("empresa")) {
    location.replace("http://localhost:51260");
}

//URL API de Azure
var url = "https://alumnoscurso.azure-mobile.net/Tables/centro_de_congresos15";

//Nombre e ID de la empresa
var empresa = localStorage.getItem("empresa");
var empresaID = localStorage.getItem("empresaID");




//Inicia la libreria FULLPAGE.JS cuando cargue el documento
angular.element(document).ready(function () {
    $('#fullpage').fullpage({
        //Navigation
        menu: false,
        anchors: ['DondeEstamos', 'MapaSala', 'TusConferencias', 'Asistentes'],
        lockAnchors: false,
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Donde estamos', 'Mapa de la sala', 'Tus conferencias', 'Asistentes'],
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 900,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Design
        controlArrows: true,
        verticalCentered: false,
        resize: false,
        paddingTop: '.1em',
        paddingBottom: '10px',
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function (index, nextIndex, direction) { },
        afterLoad: function (anchorLink, index) { },
        afterRender: function () { },
        afterResize: function () { },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) { },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) { }
    });
});

var app = angular.module("app", ["ngMaterial", "ui.tree"]);

//SERVICES
app.service("conferenciasService", ["$http", function ($http) {
    //obtencion de las conferencias disponibles
    this.getDefaultConferencias = function () {
        var conferencias = [
        { tipo: "Informática", nombre: "Programación orientada a objetos", fecha: "22/12/2015" },
        { tipo: "Matemáticas", nombre: "Geometría y estadísticas", fecha: "10/9/2015" },
        { tipo: "Industria  Farmaceútica", nombre: "PHARMA", fecha: "21/11/2015" },
        { tipo: "Ingeniería", nombre: "Potencia, energía e ingeniería eléctrica", fecha: "14/10/2015" },
        { tipo: "Gestion de empresas", nombre: "Competencias monopolísticas", fecha: "11/11/2015" },
        { tipo: "Política", nombre: "Desafíos presidenciales", fecha: "07/09/2015" }
        ];
        return conferencias;
    }

    this.saveMisConferencias = function (misConferencias) {
        $http({
            method: "PATCH",
            url: url + "/" + empresaID,
            data: {
                empresa: localStorage.getItem("empresa"),
                conferencias_json: angular.toJson(misConferencias)
            }
        }).success(
            function () {
                console.log("Confenrecias Saved");
            }
        );
    }


    this.getMisConferencias = function () {
        //pendiente de implelentar, el codigo esta puesto directamente en el controlador
    }
}]);

app.service("asistentesService", ["$http", function ($http) {
    this.saveAsistentes = function (asistentes) {
        $http({
            method: "PATCH",
            url: url + "/" + empresaID,
            data: {
                empresa: localStorage.getItem("empresa"),
                asistentes_json: angular.toJson(asistentes)
            }
        }).success(
            function () {
                console.log("Asistentes Saved");
            }
        );
    }


}]);

//MAIN CONTROLLER
app.controller("mainCTRL", ["$scope", "$mdDialog", "$timeout", "$mdToast", "$http", function ($scope, $mdDialog, $timeout, $mdToast, $http) {

}]);

//LOCALIZACION CONTROLLER
app.controller("localizacionCTRL", ["$scope", "$timeout", "$mdToast", function ($scope, $timeout, $mdToast) {

    //CARGADO DE MAPAS

    //nuesta ubicacion
    function initMapMe() {
        var myOptions = {
            zoom: 16,
            center: new google.maps.LatLng(40.4824946, -3.7172633000000133),
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        var map = new google.maps.Map(document.getElementById("gmap_canvas1"), myOptions);
        var marker = new google.maps.Marker({ map: map, position: new google.maps.LatLng(40.4824946, -3.7172633000000133) });
        var infowindow = new google.maps.InfoWindow({ content: "<b>Centro de congresos</b><br/>Cardenal Herrera Oria<br/> Madrid" }); google.maps.event.addListener(marker, "click", function () { infowindow.open(map, marker); }); infowindow.open(map, marker);

    }

    //ubicacion del cliente
    function initMapYou(pos) {
        var myOptions = {
            zoom: 18,
            center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        var map = new google.maps.Map(document.getElementById("gmap_canvas2"), myOptions);
        var marker = new google.maps.Marker({ map: map, position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude) });
        var infowindow = new google.maps.InfoWindow({ content: "<b>Su ubicación</b>" }); google.maps.event.addListener(marker, "click", function () { infowindow.open(map, marker); }); infowindow.open(map, marker);
        $mdToast.show(
                $mdToast.simple()
                .content('Su ubicación ha sido cargada')
                .position("bottom right")
                .hideDelay(2000)
            );
    }

    initMapMe();
    //google.maps.event.addDomListener(window, 'load', initMapMe);


    //Se piden permisos de ubicacion
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(initMapYou, function (error) {
            $mdToast.show(
                $mdToast.simple()
                .content('Imposible acceder a su ubicación')
                .position("bottom right")
                .hideDelay(2000)
            );
        });
    }
}]);

// MAPA DE LA SALA CONTROLLER
app.controller("mapaSalaCTRL", ["$scope", "$timeout", "$mdToast", function ($scope, $timeout, $mdToast) {

    //CANVAS DRAWING
    var canvas = document.getElementById("canvasMapaSala");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#E68A00";
    //barra ancha de la izq
    ctx.fillRect(30, 30, 100, 500);
    //barra ancha de la derecha
    ctx.fillRect(570, 30, 100, 500);
    //barra ancha horizontal
    ctx.fillRect(30, 30, 600, 100);
    //rectangulo central
    ctx.fillRect(300, 150, 100, 30);
    //pila de rectangulos lateral izq
    ctx.fillRect(175, 200, 100, 30);
    ctx.fillRect(175, 250, 100, 30);
    ctx.fillRect(175, 300, 100, 30);
    ctx.fillRect(175, 350, 100, 30);
    ctx.fillRect(175, 400, 100, 30);
    //pila de rectangulos lateral der
    ctx.fillRect(425, 200, 100, 30);
    ctx.fillRect(425, 250, 100, 30);
    ctx.fillRect(425, 300, 100, 30);
    ctx.fillRect(425, 350, 100, 30);
    ctx.fillRect(425, 400, 100, 30);
    ctx.stroke();


}]);




// TUS CONFERENCIAS CONTROLLER
app.controller("conferenciasCTRL", ["$scope", "$timeout", "$mdToast", "conferenciasService", "$http", function ($scope, $timeout, $mdToast, conferenciasService, $http) {

    //obtiene una lista con las conferencias restantes que no se han elegido
    $scope.obtenerConferenciasRestantes = function (miLista, listaTotal) {
        var finalList = [];

        //recore la lista total de conferencias
        angular.forEach(listaTotal, function (value1, key1) {
            //esta variable controla si una conferencia de mi lista se encuentra en la lista total
            var centinela = false;

            //se recorre mi lista
            angular.forEach(miLista, function (value2, key2) {
                //si los valores son iguales
                if (value1.nombre === value2.nombre) {
                    //se marca esta iteracion para que no se añada a la lista final
                    centinela = true;
                }
            });

            //si esta iteracion no esta marcada, es decir, las conferencias que se estan comparando no coinciden, 
            //se añade a la lista final
            if (!centinela) {
                finalList.push(value1);
            }

        });
        return finalList;
    }

    $scope.treeConferencias = {
        //cuando se deje de agarrar 
        dropped: function (even) {
            //si se ha depositado en la lista de mis conferencias (y no en la lista de conferencias disponibles)
            if (even.dest.nodesScope.$parent.$element.context.attributes[0].nodeValue === "treeMisConferencias") {
                //guarda el estado de misConferencias
                conferenciasService.saveMisConferencias($scope.misConferencias);
                console.log("Añadido a mis conferencias");
            }
        }
    };

    $scope.treeMisConferencias = {
        //cuando se deje de agarrar 
        dropped: function (even) {
            //si se ha depositado en la lista de conferencias disponibles (y no en la lista de mis conferencias)
            if (even.dest.nodesScope.$parent.$element.context.attributes[0].nodeValue === "treeConferencias") {
                //guarda el estado de misConferencias
                conferenciasService.saveMisConferencias($scope.misConferencias);
                console.log("Quitado de mis conferencias");
            }
        }
    };

    $scope.conferencias = conferenciasService.getDefaultConferencias();

    //tiempo de espera a que se devuelva la ID de la empresa
    $timeout(function () {
        $http({
            method: "GET",
            url: url + "/" + empresaID
        }).success(
             function (data) {
                 if (data == undefined) {
                     console.log("Sin conferencias elegidas");
                     $scope.misConferencias = [];

                 } else {
                     $scope.misConferencias = JSON.parse(data.conferencias_json);
                     $scope.conferencias = $scope.obtenerConferenciasRestantes($scope.misConferencias, $scope.conferencias);
                 }
             }
         );
    }, 500);

}]);

app.controller("asistentesCTRL", ["$scope", "$timeout", "$mdToast","$mdDialog", "asistentesService", "$http", function ($scope, $timeout, $mdToast,$mdDialog, asistentesService, $http) {

    $scope.asistentes = [];

    $timeout(function () {
        $http({
            method: "GET",
            url: url + "/" + empresaID
        }).success(
             function (data) {
                 if (data == undefined) {
                     console.log("Sin asistentes establecidos");
                     $scope.asistentes = [];

                 } else {
                     $scope.asistentes = JSON.parse(data.asistentes_json);
                 }
             }
         );
    }, 500);

    $scope.agregarAsistente = function () {
        $scope.asistentes.push(angular.fromJson(angular.toJson($scope.datos)));
        $mdToast.show(
                $mdToast.simple()
                .content("Asistente agregado")
                .position("bottom right")
                .hideDelay(1000)
            );
        asistentesService.saveAsistentes($scope.asistentes);
    }

    $scope.borrarAsistente = function (index) {




        $scope.showConfirm = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
              .title('Borrar asistente')
              .content('El asistente sera borrado definitivamente')
              .ariaLabel('Lucky day')
              .ok('Borrar')
              .cancel('Cancelar')
              .targetEvent(ev);
            $mdDialog.show(confirm).then(function () {
                //se confirmo la operacion de borrado
                $scope.asistentes.splice(index, 1);
                $mdToast.show(
                       $mdToast.simple()
                       .content("Asistente eliminado")
                       .position("bottom right")
                       .hideDelay(1000)
                   );
                asistentesService.saveAsistentes($scope.asistentes);
            }, function () {
                //se cancelo la operacion de borrado
            });
        };

        $scope.showConfirm();

    }

}]);


//alert code

/*$scope.showAlert = function (ev) {
       $mdDialog.show(
         $mdDialog.alert()
           .clickOutsideToClose(true)
           .title('Aviso importante')
           .content('Cuidado con los botones que pulsas')
           .ariaLabel('AvisoUsuario')
           .ok('Entendido')
           .targetEvent(ev)
       );
   };

   $timeout(function() {
       $scope.showAlert();
   },2000);*/