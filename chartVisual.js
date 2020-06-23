// Sets up line chart data

//data total Days variable
let totalDays = [];

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
              parser: timeFormat,
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
  // let chartDataA = [];
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
  // console.log("cases", chartDataC);
  // console.log("deaths", chartDataD);
  // console.log("recovered", chartDataR);
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
      maintainAspectRatio: false,
      //responsiveness
      responsive: true,
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              parser: timeFormat,
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

//Covid-19 tracker pie chart
/* will Contain
-active cases 
-total cases
-recovered
-deaths

also fwy, make cards clickable so that when per say the active cases card is clicked, data shown on map 
is only in reference to the card
*/

pieChartData = (historical) => {
  
let pieChartM = new Chart(document.getElementById("pie-chart"), {
  type: 'pie',
  data: {
    labels: ["Total Cases", "Active Cases", "Recovered", "Deaths"],
    datasets: [{
      
      backgroundColor: ["#8e5ea2","#3e95cd", "#3cba9f","#e8c3b9"],
      data: [historical[0],historical[1],historical[2],historical[3]]
    }]
  },
  options: {
    maintainAspectRatio: false,
    title: {
      display: true,
      
    }
  }
});
};

doughnutChartData = (historical) => {
  let doughnutChartM = new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Active Cases", "Total Cases"],
      datasets: [
        {
         
          backgroundColor: ["#3e95cd", "#8e5ea2"],
          data: [historical[1],historical[0]]
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Total Active and Overall Total Cases'
      }
    }
});
}

function clearData(chart) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  chart.update();
}

const updateInput = (historical) => {
  historical.forEach((day, index) => {
    if (historical.length - 1 === index) {
      totalDays.push(day);
    }
  });
};
