//var that contains country data

const countryData = "https://corona.lmao.ninja/v2/countries?sort=country";

//contains the positions for each marker
let latlongs = [];
//contains title for each country
let titleM = [];
//contains total deaths, cases, recovered
let countrySpecificInfo = [];

//country data loaded once the window is
window.onload = function () {
  getCountries();
};

//function that grabs data
function getCountries() {
  fetch(countryData)
    .then(function (response) {
      return response.json(); //if promise is fulfilled, then this block will run
    })
    .then(function (countries) {
      console.log(countries);
      markerData(countries);
      addMarkerstoMap(latlongs, titleM, countrySpecificInfo);
    });
  console.log("code executed"); // this will be ran first so if one thing doesn't happen, another happens
}

//grabs the lat and longs of each country
function markerData(countriesData) {
  for (let eachCountry of countriesData) {
    latlongs.push([
      eachCountry["countryInfo"]["lat"],
      eachCountry["countryInfo"]["long"],
    ]);
    titleM.push(eachCountry["country"]);

    countrySpecificInfo.push([
      eachCountry["cases"],
      eachCountry["deaths"],
      eachCountry["recovered"],
      eachCountry["countryInfo"]["flag"]
    ]);
  }
}

//intializies the map
var map;
var marker;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -20, lng: 30 },
    zoom: 3,
  });
}

//adds markers to the map
function addMarkerstoMap(positionM, titleM, countrydata) {
  for (let i = 0; i < latlongs.length; i++) {
    let myLatLng = { lat: positionM[i][0], lng: positionM[i][1] };
    let infowindowM = `<div class= 'countrydata'>
    <div class = "TitleImg">
      <h1>${titleM[i]}</h1>
      <img src = '${countrydata[i][3]}' class = 'countryImg' alt = 'country image'/>
    </div>
      <p>cases: ${countrydata[i][0]}</p>
      <p>deaths: ${countrydata[i][1]}</p>
      <p>recovered: ${countrydata[i][2]}</p>
    </div>`;

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: titleM[i],
    });

    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(
      marker,
      "click",
      (function (marker) {
        return function () {
          infowindow.setContent(infowindowM);
          infowindow.open(map, marker);
        };
      })(marker)
    );
    // infoStructure.push([infowindow])
  }
}
