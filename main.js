'use strict';

$(document).ready(init);

function init() {

  initMap();

  var name;
  var temperature;
  var humidity;
  var conditions;

  if("geolocation" in navigator) {
    var n = navigator.geolocation;

    n.getCurrentPosition(success, failure);

    function success(position) {

      var mylat = Math.floor(position.coords.latitude);
      var mylong = Math.floor(position.coords.longitude);

      console.log(mylat, mylong);

      getWeather(mylat, mylong);
    }

    function failure() {
      $('#geocity').html("your location cannot be retrieved");
    }
  }

  function getWeather(lat, long) {
    var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long;
    console.log(api);
  	// var city = $('#city').val();
  	var apiKey = '&APPID=defcbdf0664d7daa4fd49cbb1dd3b56a';
  	var units = '&units=imperial'
  	var weatherUrl = api + units + apiKey;
    console.log('weatherUrl', weatherUrl)

    $.ajax({
       method: 'GET',
       url: weatherUrl,
       success: function(data) {

         console.log('data:', data);
         name = data.name;
         temperature = Math.round(data.main.temp);
         humidity = data.main.humidity;
         conditions = data.weather[0].description;
         console.log(conditions);
         displayWeather();
      },
       error: function(error) {
         console.log(error);
       }

    });
  }

  function displayWeather() {
    var $temp = $('<p>' + temperature + '°' + '</p>');
    var $conditions = $('<p>' + conditions + '</p>');
    var $humidity = $('<p>' + humidity + '%' + ' ' + 'humidity' + '</p>');
    var $icon = $('<i>' + '</i>');

    $('.temp').append($temp);
	  $temp.addClass('temperature');
    $('.conditions-space').append($conditions);
    $('.conditions-space').append($humidity);
    $('.current-weather').append($icon);

    // if(conditions === 'few clouds') {
    //   $icon.addClass('wi');
    //   $icon.addClass('wi-day-sunny');
    // }
  }

  function initMap() {
  // Create a map object and specify the DOM element for display.
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        scrollwheel: false,
        zoom: 8
      });
}


}
