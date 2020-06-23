//adds search functionality to map
let allData = []; //grabs all country data
let countryName = []; //grabs all countries by name and lower cases them
let countryIndex; //gets country by index
let countryPosition = { lat: 37.0902, lng: -95.7129 }; //initial location on google map

//gets all needed data
searchCountry = (countryData) => {
    allData.push(countryData);

  //grab each country by country name and make sure to lowercase(not case sensitive)
  countryData.forEach((country, index) => {
    countryName.push(country["country"].toLowerCase());
  });
};

searchCountryM = () => {
  //gets user input value
  let countryInput = document.getElementById("countryInputM").value;

  //checks user input and returns country Position based on input and repositions map to that location
  if (
    countryInput.toLowerCase() ===
    countryName.find((country) => country === countryInput.toLowerCase())
  ) {
    countryIndex = countryName.indexOf(countryInput.toLowerCase());
    countryPosition = {lat: allData[0][countryIndex]['countryInfo']['lat'], lng: allData[0][countryIndex]['countryInfo']['long']}

    initMap();
    addMarkerstoMap(allData[0]);
} else {
    console.log("Something is wrong");
  }
};
