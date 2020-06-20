const express = require("express"); //imports express framework
const axios = require("axios"); //imports axios  package
const app = express(); //creates app
const port = 3001; // the port its hosted on

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/countries", (req, res) => {
  axios.get("https://corona.lmao.ninja/v2/countries").then((response) => {
    res.send(response.data);
  });
}); //takes in request and sends response

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
); //where app is listening. Instantiates API
