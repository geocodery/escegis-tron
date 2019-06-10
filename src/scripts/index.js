// Initialize leaflet.js
const L = require('leaflet');
const {conn} = require('./connect')
const {dialog} = require('electron').remote;

let mgo = new conn();
var geojsonFeature;

var map_center = [-9, -75];
//	Base layers
var esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Esri - Geocodery'
});

// Initialize the both maps
var map = L.map('map', {
	layers:[esri_WorldImagery],
	scrollWheelZoom: true,
	center: map_center,
	zoom: 6
});

// Propiedades de messageBox
const options = {
    type: 'info',
    buttons: ['Aceptar'],
    defaultId: 1,
    title: 'ESCEGIS-TRON',
    message: 'Respuesta de búsqueda',
    detail: 'No se encontraron registros con la cadena de texto ingresada!',
  };


function buscarDistrito(){
    console.log('Buscando distrito');
    var namedist = document.getElementById("inputBusqueda").value
    mgo.gpo_distritos.find({
        'properties.DISTRITO': new RegExp(namedist.toUpperCase(), 'i')
        }, function(err, datos){
        if(err){
            return err;
        };
        if(datos.length == 0){
            console.log(dialog.showMessageBox(null, options))
            return;
        };
        geojsonFeature = datos.map(function(item){
            return item.toObject();
        });
        console.log(geojsonFeature);
        var jsonLayer = L.geoJSON(geojsonFeature);
        jsonLayer.addTo(map);
        map.fitBounds(jsonLayer.getBounds());
    });
}

document.getElementById("buscarDistrito").addEventListener('click', buscarDistrito);