const countryData = "http://localhost:3001/countries";
var lastVal;
var lastValM = " ";
let countH = 152;
let countI = 0,
  countS = 0;
countI = localStorage.getItem("days");
countS = localStorage.getItem("count");
let historicalData =
  "https://corona.lmao.ninja/v2/historical/all?lastdays=" +
  (152 + parseInt(countI));

lastVal = historicalData;
const countryStyling = "mapStyle.js";
//country data loaded once the window is
window.onload = function () {
  // console.log(lastVal)
  getCountries();
  gethistoricalData(lastVal);

  document.getElementById("q").addEventListener("click", function (event) {
    event.preventDefault();
    clearData(chart); //clears first chart data
    clearData(chartTwo); // clears second chart data
    //prevents entire page from reloading when enter key is pressed

    lastVal = changeLastDays();
    gethistoricalData(lastVal);

    // console.log(lastVal)
  });
  historicalDays();
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
      // console.log(countries);
      searchCountry(countries);
      //this function displayss all needed data
      addMarkerstoMap(countries);
      let cardDataM = cardData(countries);
      pieChartData(cardDataM);
      doughnutChartData(cardDataM);
      //function below adds data to map
      // showDataInTable(countries);
    });
  // console.log("code executed"); // this will be ran first so if one thing doesn't happen, another happens
}

//function grabs data of totals over last 120 days
const gethistoricalData = (last) => {
  // console.log(last);
  fetch(last)
    .then(function (responseTwo) {
      return responseTwo.json(); //if promise is fulfilled, then this block will run
    })
    .then(function (countries) {
      // console.log(countries)
      let chartDataM = buildChartData(countries);
      let secondChartDataM = buildChartDataStacked(countries);
      covidMap(chartDataM);
      covidChartTwo(secondChartDataM);
      /*  pieChartM(); */
    });
  // console.log("code executed"); // this will be ran first so if one thing doesn't happen, another happens
};

//intializies the map
var map;
var marker;
function initMap() {
  let opt = { minZoom: 3, maxZoom: 7 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: countryPosition,
    zoom: 4,
    styles: mapSty,
  });
  map.setOptions(opt);
}

//adds markers to the map
function addMarkerstoMap(countries) {
  let z = 0;
  for (let i = 0; i < countries.length; i++) {
    let myLatLng = {
      center: {
        lat: countries[i]["countryInfo"]["lat"],
        lng: countries[i]["countryInfo"]["long"],
      },
    };
    let infowindowM = allDataInfo(countries, cardM, z);
    z++;
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

let totalC = 0,
  activeC = 0,
  recoveredT = 0,
  deathsT = 0;
cardData = (countries) => {
  countries.forEach((country) => {
    totalC += country["cases"];
    activeC += country["active"];
    recoveredT += country["recovered"];
    deathsT += country["deaths"];
  });
  document.getElementsByClassName("card-text")[0].innerHTML = numeral(
    totalC
  ).format("0,0");
  document.getElementsByClassName("card-text")[1].innerHTML = numeral(
    activeC
  ).format("0,0");
  document.getElementsByClassName("card-text")[2].innerHTML = numeral(
    recoveredT
  ).format("0,0");
  document.getElementsByClassName("card-text")[3].innerHTML = numeral(
    deathsT
  ).format("0,0");
  return [totalC, activeC, recoveredT, deathsT];
};

historicalDays = () => {
  let getHours = new Date().getHours();
  console.log(getHours);
  if (getHours === 0 && countS === 0) {
    countI++;
    countS++;
  } else if(getHours === 1) {
    countS = 0;
  }
  else {
    console.log("No Need to update data");
  }
  localStorage.setItem("days", countI);
  localStorage.setItem("count", countS);
  // console.log(document.getElementById("quantityLabel").innerHTML = `<span> Change data seen over certain period of time in terms of days (between 1 and ${ 152 + parseInt(localStorage.getItem("days"))}):  </span>`)
  document
    .getElementById("quantity")
    .setAttribute("max", 152 + parseInt(localStorage.getItem("days")));
};
//this function puts data into tables

/* const showDataInTable = (data) => {
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
 */
