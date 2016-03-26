'use strict'

angular.module('dengueApp', [])

.controller('MainCtrl', function($scope, $compile, $http){

	console.log("hello");
	var map;
	var kml_source = "../data/dengue-clusters.kml";
	var markers = [];
	var heatmapData = [];
	var heatmap;
	var today = true;


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
	  
	  if(!map)
	  	return;

	  var center = map.getCenter();
	  google.maps.event.trigger(map, "resize");
	  map.setCenter(center); 
	});

	google.maps.event.addDomListener(window, 'load', initialize);

	$scope.showFutureData = function(){

		if(!today)
			return; 

		today = false;

		clearAll();

		$http.get('http://outbreak.sgcharts.com/epi/search/?d=2015-12-22&t=6522869643214848.5723665618436096')
		.then(function(res){

			angular.forEach(res.data, function(item){

				var pos = new google.maps.LatLng(item.place.lat, item.place.lng);

				/*var marker = new google.maps.Marker({
					position: pos,
					map: map
				//icon: 'img/parking.png'
	    	});*/

	    	heatmapData.push(pos);
	    	//markers.push(marker);

			})

    	heatmap = new google.maps.visualization.HeatmapLayer({
			  data: heatmapData,
			  radius: 20
			});

			heatmap.setMap(map);

		}, function(err){

			console.log("err", err);

		})

	}

	function clearMarkers(){

		for(var i = 0; i < markers.length; i++){
			markers[i].setMap(null);
		}

		markers = [];

	}

	function clearLayers(){

		map.data.forEach(function(feature){
				map.data.remove(feature);
		})

	}

	function clearHeatmap(){

		/*for(var i = 0; i < heatmapData.length; i++){
			heatmapData[i].setMap()
		}*/
		heatmapData = [];
		if(heatmap)
			heatmap.setMap(null);

	}

	function clearAll(){

		clearMarkers();
		clearLayers();
		clearHeatmap();

	}

	$scope.showTodaysData = function(){

		if(today)
			return;

		today = true;

		clearAll();
		map.data.loadGeoJson('data/dengue-clusters.geojson');

	}




})