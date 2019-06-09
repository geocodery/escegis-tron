// Initialize leaflet.js
const L = require('leaflet');
const {conn} = require('./connect')

let mgo = new conn();
let geojsonFeature;

var map_center = [-9, -75];
//	Base layers
var esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Initialize the both maps
var map = L.map('map', {
	layers:[esri_WorldImagery],
	scrollWheelZoom: true,
	center: map_center,
	zoom: 6
});


mgo.gpo_distritos.find(function(err, datos){
    if(err){
        return err;
    };
    geojsonFeature = datos.slice(200, 300).map(function(item){
        return item.toObject();
    });
    L.geoJSON(geojsonFeature).addTo(map);
});
