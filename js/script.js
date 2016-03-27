'use strict'


angular.module('dengueApp', [])

.config(['$httpProvider', function($httpProvider) {
   $httpProvider.defaults.useXDomain = true;
   delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.controller('MainCtrl', function($scope, $compile, $http){

		var map;
		var kml_source = "../data/dengue-clusters.kml";
		var markers = [];
		var heatmapData = [];
		var heatmap;
		var today = true;
		$scope.loading = true;
		
		$scope.openModal = function(){

			 $('#modal1').openModal();

		}

	  function initialize() {

			  var styles = [
			    {
			        "featureType": "administrative",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "color": "#444444"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "elementType": "all",
			        "stylers": [
			            {
			                "color": "#f2f2f2"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape.natural",
			        "elementType": "labels.text",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape.natural",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "invert_lightness": true
			            },
			            {
			                "color": "#444444"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "elementType": "all",
			        "stylers": [
			            {
			                "saturation": -100
			            },
			            {
			                "lightness": 45
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "labels.icon",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "transit.station.airport",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "transit.station.airport",
			        "elementType": "labels",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "transit.station.airport",
			        "elementType": "labels.icon",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "all",
			        "stylers": [
			            {
			                "color": "#46bcec"
			            },
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "visibility": "on"
			            },
			            {
			                "color": "#6fa2cd"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "color": "#000000"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    }
			]

			var styledMap = new google.maps.StyledMapType(styles,
	    	{name: "Styled Map"});

	  	
		  map = new google.maps.Map(document.getElementById('map'), {
		    center: new google.maps.LatLng(1.290280, 103.851959),
		    zoom: 11,
		    mapTypeId: google.maps.MapTypeId.TERRAIN
		  });
		  

		  map.data.loadGeoJson('data/dengue-clusters.geojson', null, function(){

		  	$scope.loading = false;
		  	$scope.$apply();

		  });

		  //Associate the styled map with the MapTypeId and set it to display.
	  	map.mapTypes.set('map_style', styledMap);
	  	map.setMapTypeId('map_style');

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

			var dataString1 = JSON.stringify(dataString);
			$http.defaults.useXDomain = true;

			/*var req = {
				method: 'POST',
				url: "https://ussouthcentral.services.azureml.net/workspaces/7423658e86cd4ac68698915b782c1667/services/b7125f6db3aa400b928e7e3907b19c27/execute?api-version=2.0&details=true",
				headers:{
					'Content-Type' : 'application/json',
					'Authorization' : 'Bearer XXSKOxYvgp96zhhAmBXlQLkO73h7/X7Yv9DgUsogWUBXFPpwRW5OJUgjUBZYdr2MhO+ef/ypFN0g58ayWRAVSA=='
				}
			}*/

				/*headers: {
					'Content-Type' : 'application/json',
					'Authorization' : 'Bearer XXSKOxYvgp96zhhAmBXlQLkO73h7/X7Yv9DgUsogWUBXFPpwRW5OJUgjUBZYdr2MhO+ef/ypFN0g58ayWRAVSA=='
				},*/

			$http(req).then(function(res){

				console.log("success, res ", res);

			}, function(err){

				console.log("errro, err", err);

			})




			/*
			if(!today)
				return; 

			$scope.loading = true;
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
		    	});

		    	heatmapData.push(pos);
		    	//markers.push(marker);

				})

	    	heatmap = new google.maps.visualization.HeatmapLayer({
				  data: heatmapData,
				  radius: 20
				});

				heatmap.setMap(map);
				$scope.loading = false;

			}, function(err){

				console.log("err", err);
				$scope.loading = false;

			})
				*/
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

			$scope.loading = true;
			today = true;

			clearAll();

			map.data.loadGeoJson('data/dengue-clusters.geojson', null, function(){

				$scope.loading = false;
				$scope.$apply();

			});

		}


})