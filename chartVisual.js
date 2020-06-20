// Sets up line chart data
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

var chart;
const covidMap = (chartData) => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var timeFormat = "MM/DD/YY";
  chart = new Chart(ctx, {
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
      maintainAspectRatio: false,
      legend: {
        display: false,
        labels: {
          fontColor: "white",
        },
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      responsive: true,
      title: {
        display: true,
        text: "Covid-19 Cases",
        fontColor: "white",
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
              fontColor: "white",
            },
            ticks: {
              fontColor: "white",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "value",
              fontColor: "white",
            },
            ticks: {
              callback: function (value, index, values) {
                return numeral(value).format("0,0");
              },
              fontColor: "white",
            },
          },
        ],
      },
    },
  });
};

//Add stacked line charts feature to Tracker App
const buildChartDataStacked = (historical) => {
  let chartDataC = [];
  let chartDataD = [];
  let chartDataR = [];
  for (let date in historical.cases) {
    let dataPoint = {
      x: date,
      y: historical.cases[date],
    };
    chartDataC.push(dataPoint);
  }
  for (let dd in historical.deaths) {
    let secondDataPoint = {
      x: dd,
      y: historical.deaths[dd],
    };
    chartDataD.push(secondDataPoint);
  }
  for (let rr in historical.recovered) {
    let thirdDataPoint = {
      x: rr,
      y: historical.recovered[rr],
    };
    chartDataR.push(thirdDataPoint);
  }
  console.log("cases", chartDataC);
  console.log("deaths", chartDataD);
  console.log("recovered", chartDataR);
  return [chartDataC, chartDataD, chartDataR];
};

var chartTwo;
const covidChartTwo = (historicalTwo) => {
  //gets the chart by its id
  var ctx = document.getElementById("myChartTwo").getContext("2d");
  var timeFormat = "MM/DD/YY";
  chartTwo = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      datasets: [
        {
          label: "deaths",
          fill: true,
          backgroundColor: "#8fa8c8",
          pointBackgroundColor: "#75539e",
          borderColor: "#75539e",
          pointHighlightStroke: "#75539e",
          borderCapStyle: "butt",
          data: historicalTwo[1],
        },
        {
          label: "recovered",
          fill: true,
          backgroundColor: "#92bed2",
          pointBackgroundColor: "#3282bf",
          borderColor: "#3282bf",
          pointHighlightStroke: "#3282bf",
          borderCapStyle: "butt",
          data: historicalTwo[2],
        },
        {
          label: "cases",
          fill: true,
          backgroundColor: "#e0eadf",
          pointBackgroundColor: "#6fccdd",
          borderColor: "#6fccdd",
          pointHighlightStroke: "#6fccdd",
          borderCapStyle: "butt",
          data: historicalTwo[0],
        },
      ],
    },

    // Configuration options go here
    options: {
      //responsiveness
      responsive: true,
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
              fontColor: "white",
            },
            ticks: {
              fontColor: "white",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "value",
              fontColor: "white",
            },
            ticks: {
              callback: function (value, index, values) {
                return numeral(value).format("0,0");
              },

              fontColor: "white",
            },
          },
        ],
      },
      animation: {
        duration: 750,
      },
    },
  });
};

function clearData(chart) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  chart.update();
}
