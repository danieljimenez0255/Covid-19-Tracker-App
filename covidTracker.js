//var that contains country data

const countryData = "https://corona.lmao.ninja/v2/countries?sort=country";

var lastVal;
var lastValM = " ";

let historicalData = "https://corona.lmao.ninja/v2/historical/all?lastdays=120";
lastVal = historicalData;
const countryStyling = "mapStyle.js";
//country data loaded once the window is
window.onload = function () {
  getCountries();
  gethistoricalData(lastVal);

  document
    .getElementById("quantity")
    .addEventListener("keydown", function (event) {
      if (event.key == "Enter") {
        event.preventDefault();
        clearData(chart); //clears first chart data
        clearData(chartTwo); // clears second chart data
        //prevents entire page from reloading when enter key is pressed

        lastVal = changeLastDays();
        gethistoricalData(lastVal);

        // console.log(lastVal)
      }
    });
};

//This function will allow for user to change amount data to be displayed for a certain number of days
const changeLastDays = () => {
  let str = historicalData.slice(0, 53);

  let userInput = document.getElementById("quantity").value;

  lastValM = str + userInput;
  return lastValM;
};

//function that grabs country data
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

//function grabs data of totals over last 120 days
const gethistoricalData = (last) => {
  console.log(last);
  fetch(last)
    .then(function (responseTwo) {
      return responseTwo.json(); //if promise is fulfilled, then this block will run
    })
    .then(function (countries) {
      let chartDataM = buildChartData(countries);
      let secondChartDataM = buildChartDataStacked(countries);
      covidMap(chartDataM);
      covidChartTwo(secondChartDataM);
    });
  console.log("code executed"); // this will be ran first so if one thing doesn't happen, another happens
};

//intializies the map
var map;
var marker;
function initMap() {
  let opt = { minZoom: 3, maxZoom: 7 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.0902, lng: -95.7129 },
    zoom: 4,
    styles: mapSty,
  });
  map.setOptions(opt);
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
