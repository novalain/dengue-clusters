'use strict'

angular.module('dengueApp', [])

.controller('MainCtrl', function($scope, $compile){

	console.log("hello");
	var map;
	var kml_source = "../data/dengue-clusters.kml";

  function initialize() {
	  map = new google.maps.Map(document.getElementById('map'), {
	    center: new google.maps.LatLng(1.290280, 103.851959),
	    zoom: 11,
	    mapTypeId: google.maps.MapTypeId.TERRAIN
	  });
	  
	  map.data.loadGeoJson('data/dengue-clusters.geojson');

	}

  // Resize stuff...
	google.maps.event.addDomListener(window, "resize", function() {
	   var center = map.getCenter();
	   google.maps.event.trigger(map, "resize");
	   map.setCenter(center); 
	});




	google.maps.event.addDomListener(window, 'load', initialize);


})