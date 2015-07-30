// Put event listeners into place
window.addEventListener("DOMContentLoaded", function() {
    // Grab elements, create settings, etc.
    // var canvas = document.getElementById("canvas"),
        // context = canvas.getContext("2d"),
    var video = document.getElementById("video"),
        videoObj = { "video": true },
        errBack = function(error) {
            console.log("Video capture error: ", error.code); 
        };

    // Put video listeners into place
    if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function(stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(videoObj, function(stream){
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
    else if(navigator.mozGetUserMedia) { // Firefox-prefixed
        navigator.mozGetUserMedia(videoObj, function(stream){
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
    video.style.cssText = "-moz-transform: scale(-1, 1); \
    -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
    transform: scale(-1, 1); filter: FlipH;";

    // // Trigger photo take
    // $("#snap").click( function() {
    //     context.drawImage(video, 0, 0, 467, 350);
    // });

    $(".get-btn").click( function() {

    });

}, false);

$(function(){

    $('.hair-select').click( function () {
        event.preventDefault();
        var hairurl = $(this).data("hair");
        $(".tryer__image").css( "background-image", 'url(' + hairurl + ')'); //Theme2
    })
});




var map;

function initialize() {
  var mapOptions = {
    zoom: 14,
    styles: [
      {
        stylers: [
          { visibility: 'simplified' }
        ]
      }
      ]
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);



  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);



        var request = {
        location: pos,
        radius: '500',
        types: ['store']
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    
    function createMarker(place) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
          // Star
          path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
          fillColor: '#ffff00',
          fillOpacity: 1,
          scale: 1/4,
          strokeColor: '#bd8d2c',
          strokeWeight: 1
        }
      });
    }

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(results[i]);
        }
      }
    }

    var infowindow = new google.maps.InfoWindow({
    map: map,
    position: pos,
    content: 'Hairdressers near you!'
    });

    map.setCenter(pos);

    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);