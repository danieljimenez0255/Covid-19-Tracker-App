//var that contains country data

const countryData = "https://corona.lmao.ninja/v2/countries?sort=country";
const countryStyling = "mapStyle.js"
//country data loaded once the window is
window.onload = function () {
  getCountries();
  // getStyling();
  console.log(mapSty)
};

//function that grabs data
function getCountries() {
  fetch(countryData)
    .then(function (response) {
      return response.json(); //if promise is fulfilled, then this block will run
    })
    .then(function (countries) {
      //this function grabs all needed data
      // markerData(countries);

      //this function displayss all needed data
      addMarkerstoMap(countries);
      //function below adds data to map
      showDataInTable(countries);
    });
  console.log("code executed"); // this will be ran first so if one thing doesn't happen, another happens
}

function getStyling() {
 
}

//intializies the map
var map;
var marker;
function initMap() {
  let  opt = {minZoom: 3, maxZoom:7}
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -20, lng: 30 },
    zoom: 4,
    styles: mapSty
  });
  map.setOptions(opt)
}

//adds markers to the map
function addMarkerstoMap(countries) {
  for (let i = 0; i < countries.length; i++) {
    let myLatLng = {
      center: {
        lat: countries[i]["countryInfo"]["lat"],
        lng: countries[i]["countryInfo"]["long"],
      },
    };
    let infowindowM = `<div class= 'countrydata'>
    <div class = "TitleImg">
      <h1>${countries[i]["country"]}</h1>
      <img src = '${countries[i]["countryInfo"]["flag"]}' class = 'countryImg' alt = 'country image'/>
    </div>
      <p>cases: ${countries[i]["cases"]}</p>
      <p>deaths: ${countries[i]["deaths"]}</p>
      <p>recovered: ${countries[i]["recovered"]}</p>
    </div>`;

    marker = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: map,
      center: myLatLng["center"],
      radius: countries[i]["cases"],
    });
    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(
      marker,
      "mouseover",
      (function (marker) {
        return function () {
          infowindow.setContent(infowindowM);
          infowindow.setPosition(marker.getCenter());
          infowindow.open(map);
        };
      })(marker)
    );

    google.maps.event.addListener(marker, "mouseout", function () {
      infowindow.close();
    });
  }
}

//this function puts data into tables

const showDataInTable = (data) => {
  var html = "";
  data.forEach((country) => {
    html += `
        <tr>
            <td>${country.country}</td>
            <td>${country.cases}</td>
            <td>${country.recovered}</td>
            <td>${country.deaths}</td>
        </tr>
        `;
  });
  document.getElementById("table-data").innerHTML = html;
};
