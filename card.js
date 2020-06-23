let cardM = "all";

cardInfo = (card) => {
  console.log(card["id"]);
  cardM = card["id"];
  initMap();
  addMarkerstoMap(allData[0]);
};

allDataInfo = (countries, card, index) => {
  cardM = card;
  if (cardM === "totalCM") {
    return `<div class= 'countrydata'>
        <div class = "TitleImg">
          <h1>${countries[index]["country"]}</h1>
          <img src = '${
            countries[index]["countryInfo"]["flag"]
          }' class = 'countryImg' alt = 'country image'/>
        </div>
          <p>Total cases: ${numeral(countries[index]["cases"]).format(
            "0,0"
          )}</p>
        </div>`;
  } else if (cardM === "activeCM") {
    return `<div class= 'countrydata'>
        <div class = "TitleImg">
          <h1>${countries[index]["country"]}</h1>
          <img src = '${
            countries[index]["countryInfo"]["flag"]
          }' class = 'countryImg' alt = 'country image'/>
        </div>
          <p>Active cases: ${numeral(countries[index]["active"]).format(
            "0,0"
          )}</p>
        </div>`;
  } else if (cardM === "recoveredM") {
    return `<div class= 'countrydata'>
        <div class = "TitleImg">
          <h1>${countries[index]["country"]}</h1>
          <img src = '${
            countries[index]["countryInfo"]["flag"]
          }' class = 'countryImg' alt = 'country image'/>
        </div>
          <p>Recovered: ${numeral(countries[index]["recovered"]).format(
            "0,0"
          )}</p>
        </div>`;
  } else if (cardM === "deathsM") {
    return `<div class= 'countrydata'>
        <div class = "TitleImg">
          <h1>${countries[index]["country"]}</h1>
          <img src = '${
            countries[index]["countryInfo"]["flag"]
          }' class = 'countryImg' alt = 'country image'/>
        </div>
          <p>Deaths: ${numeral(countries[index]["deaths"]).format("0,0")}</p>
        </div>`;
  } else if (cardM === "all") {
    return `<div class= 'countrydata'>
   <div class = "TitleImg">
     <h1>${countries[index]["country"]}</h1>
     <img src = '${
       countries[index]["countryInfo"]["flag"]
     }' class = 'countryImg' alt = 'country image'/>
   </div>
     <p>cases: ${numeral(countries[index]["cases"]).format("0,0")}</p>
     <p>deaths: ${numeral(countries[index]["deaths"]).format("0,0")}</p>
     <p>recovered: ${numeral(countries[index]["recovered"]).format("0,0")}</p>
   </div>`;
  }
};
