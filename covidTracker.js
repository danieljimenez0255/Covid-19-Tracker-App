//var that contains country data

const countryData = "https://corona.lmao.ninja/v2/countries?sort=country";
const historicalData =
  "https://corona.lmao.ninja/v2/historical/all?lastdays=120";
const countryStyling = "mapStyle.js";
//country data loaded once the window is
window.onload = function () {
  getCountries();
  gethistoricalData();
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
const gethistoricalData = () => {
  fetch(historicalData)
    .then(function (responseTwo) {
      return responseTwo.json(); //if promise is fulfilled, then this block will run
    })
    .then(function (countries) {
      let chartDataM = buildChartData(countries);
      covidMap(chartDataM);
    });
  console.log("code executed"); // this will be ran first so if one thing doesn't happen, another happens
};

const buildChartData = (historical) => {
  let chartData = [];
  for (let date in historical.cases) {
    let dataPoint = {
      x: date,
      y: historical.cases[date],
    };
    chartData.push(dataPoint);
  }
  return chartData;
};
//intializies the map
var map;
var marker;
function initMap() {
  let opt = { minZoom: 3, maxZoom: 7 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -20, lng: 30 },
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

// chart scripts

const covidMap = (chartData) => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var timeFormat = 'MM/DD/YY';
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      datasets: [
        {
          label: "Covid-19 Total Cases",
          backgroundColor: "#f4ea8e",
          borderColor: "#f4ea8e",
          data: chartData,
        },
      ],
    },

    // Configuration options go here
    options: {
      tooltips:{
        mode: 'index',
        intersect:false,
      },
      responsive: true,
      title: {
        display: true,
        text: "Covid-19 Cases",
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              format: timeFormat,
              tooltipFormat: "ll",
            },
            scaleLabel: {
              display: true,
              labelString: "Date",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "value",
            },
            ticks:{
              callback: function(value, index, values){
                return numeral(value).format('0,0');
              }
            },
          },
        ],
      },
    },
  });
};
