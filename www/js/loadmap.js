// JavaScript Document
function initialize() {
	var myLatlng = new google.maps.LatLng(-122.256844,37.866547);
	var mapOptions = {
		zoom: 7,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);

	var kmlLayer = new google.maps.KmlLayer({
		url: 'https://dl.dropboxusercontent.com/u/12960227/UCBerkeleyParkingLotsGarages.kml',
		suppressInfoWindows: true,
		map: map
	});
	
	var garageName="default";
	var rate="0";
	
	google.maps.event.addListener(kmlLayer, 'click', function(kmlEvent) {
		var text = '<div>'
				+ '<span id="garage-name"><strong>'+kmlEvent.featureData.name+'</strong></span>'
				+ '</div>'

				+ '<div>'
				+ kmlEvent.featureData.description
				+ '</div>'

				+'<div>'
				+'<font color="#3366ff">Default Rate: </font>'
				+'<span id="rate"> $10/day </span>'
				+'<br/>'
				+'</div>'

				+'<div>'
				+'<input id="park-btn" class="btn btn-primary" type="button" data-toggle="modal" data-target="#confirming" value="Park Here"/>'
				+'</div>'
				+'<br/>' ;
		garageName = kmlEvent.featureData.name;
		rate = getRate();
		showInContentWindow(text);
	});

	function showInContentWindow(text) {
		var sidediv = document.getElementById('content-window');
		sidediv.innerHTML = text;
	}
	function getRate(){
		return "$10/day";	
	}
	
	$('#confirming').on('show.bs.modal', function () {
		$('#conf-garage').html(garageName);
		$('#conf-rate').html(rate);
		$('#confirmed').click({rate: rate, garageName: garageName},confirmed);
	})
	
}

google.maps.event.addDomListener(window, 'load', initialize);