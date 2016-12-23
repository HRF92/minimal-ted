import React, { Component } from 'react';

class BlankBallotsDelegation extends Component{
	//constructor here
	
	shouldComponentUpdate() {
			return false ;
	}
	
		componentDidMount() {
		var mymap = L.map(this.refs.map).setView([35.00, 9.90], 7);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhwOHJ5MDAzOTJ1cGtrZnRoa2NmdSJ9.o51MXiJLy8-6cE5InXp77A', {
    	maxZoom: 18,
		id: 'mapbox.streets'
	}).addTo(mymap);

	function getColor (d)  {
   		 return d < 1000 ? '#ffffcc' :
           d < 2000  ? '#ffeda0' :
           d < 3000  ? '#fed976' :
           d < 4000  ? '#feb24c' :
           d < 5000   ? '#fd8d3c' :
           d < 6000   ? '#fd8d3c' :
           d < 7000   ? '#fc4e2a' :
           d < 8000   ? '#e31a1c' :
           d < 9000   ? '#bd0026' :
                      	'#800026';
	}
	 function style(feature) {
		    return {
		        fillColor: getColor(feature.properties.mariage),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}	
	
        function highlightFeature(e) {
					    var layer = e.target;

					    layer.setStyle({
					        weight: 5,
					        color: '#666',
					        dashArray: '',
					        fillOpacity: 0.7
					    });

					    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
					        layer.bringToFront();
					    }
					        info.update(layer.feature.properties);

	}	
	function resetHighlight(e) {
    	geojson.resetStyle(e.target);
    	    info.update();
	}
	function zoomToFeature(e) {
    	map.fitBounds(e.target.getBounds());
	}
	function onEachFeature(feature, layer) {
	    layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight,
	        click: zoomToFeature,
	        tap:highlightFeature
	    });
	}

    var geojson = L.geoJson(OldDelegationData, {style: style,onEachFeature: onEachFeature}).addTo(mymap);
    
    var info = L.control();

		info.onAdd = function (mymap) {
		    this._div = L.DomUtil.create('div', 'in'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};

		// method that we will use to update the control based on feature properties passed
		info.update = function (props) {
		    this._div.innerHTML = '<h4>Blank ballot by delegation</h4>' +  (props ?
		        '<b>' + props.NAME_EN + '</b><br /><br />' +'<p>'+ props.blank + ' blank vote'+'</p>'
		        : '<p>'+'Hover over a city'+'<p />');
		};

		info.addTo(mymap);
		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

    	var div = L.DomUtil.create('div', 'in legend'),
        grades = [1000,2000,3000,4000,5000,6000,7000,8000,9000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);
	
	}
	render(){
		return(

			<div id="mapid" ref="map" style ={{height:'550px'}} />

		);
	}
};

export default BlankBallotsDelegation