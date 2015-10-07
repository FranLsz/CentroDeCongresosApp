﻿//Inicia la libreria FULLPAGE.JS cuando cargue el documento
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

//MAIN CONTROLLER
app.controller("mainCTRL", ["$scope", "$mdDialog", "$timeout", "$mdToast", function ($scope, $mdDialog, $timeout, $mdToast) {

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
app.controller("conferenciasCTRL", ["$scope", "$timeout", "$mdToast", function ($scope, $timeout, $mdToast) {
    var self = this;

   $scope.conferencias = [
        { tipo: "Informática", nombre: "Programación orientada a objetos", fecha: "22/12/2015" },
        { tipo: "Matemáticas", nombre: "Geometría y estadísticas", fecha: "10/9/2015" },
        { tipo: "Industria  Farmaceútica", nombre: "PHARMA", fecha: "21/11/2015" },
        { tipo: "Ingeniería", nombre: "Potencia, energía e ingeniería eléctrica", fecha: "14/10/2015" },
        { tipo: "Gestion de empresas", nombre: "Competencias monopolísticas", fecha: "11/11/2015" },
        { tipo: "Política", nombre: "Desafíos presidenciales", fecha: "07/09/2015" },
    ];

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