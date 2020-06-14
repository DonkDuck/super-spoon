const BMICalculator = (function() {

  //initialize(clear all fields)
  //get input (depending on whether metric or imperial used)
  //return error if any input is invalid
  //calculate BMI with given data
  //update UI to show result

  // *** DATA INPUT AND BMI + BMR CALCULATION ***

var bmi = 0;
var BMR = 0;
var isMetric = false;

  const DOMstrings = {
    measurementPanelMetric: '#measurement-inputs-metric',
    measurementPanelImperial: '#measurement-inputs-imperial',
    metricSelect: '#radio-metric',
    imperialSelect: "#radio-imperial",
    calculateButton: '#calculate-button',
    metricHeight: '#height-metric-input',
    metricWeight: '#weight-metric-input',
    ageInput: '#age-input',
    heightFeet: '#height-input-feet',
    heightInches: '#height-input-inches',
    weightPounds: '#weight-input-imperial',
    maleSelect: '#option-male',
    femaleSelect: '#option-female',
    activityNone: '#radio-none',
    activityLight: '#radio-light',
    activityModerate: '#radio-moderate',
    activityVery: '#radio-very',
    activityExtra: '#radio-extra',
    bmiResult: '#bmi-result-field',
    bmrResult: '#bmr-result-field',
    resultPanel: '#result-div',
    chartElement: '#weight-chart',
    calorieRadio250: '#radio-250',
    calorieRadio500: '#radio-500',
    calorieRadio750: '#radio-750',
    chartPanel: '#chart-div',
    bmiResultExp: '#bmi-result-explanation',
    bmrResultExp: '#bmr-result-explanation',
    footer: '.footer'
  };

  const init = function() {
    const metricRadio = document.querySelector(DOMstrings.metricSelect);
    const imperialRadio = document.querySelector(DOMstrings.imperialSelect);
    const heightMetric = document.querySelector(DOMstrings.metricHeight);
    const weightMetric = document.querySelector(DOMstrings.metricWeight);
    const heightFeet = document.querySelector(DOMstrings.heightFeet);
    const heightInches = document.querySelector(DOMstrings.heightInches);
    const weightPounds = document.querySelector(DOMstrings.weightPounds);
    const maleSelect = document.querySelector(DOMstrings.maleSelect);
    const femaleSelect = document.querySelector(DOMstrings.femaleSelect);
    const ageInput = document.querySelector(DOMstrings.ageInput);
    const activityNone = document.querySelector(DOMstrings.activityNone);
    const activityLight = document.querySelector(DOMstrings.activityLight);
    const activityModerate = document.querySelector(DOMstrings.activityModerate);
    const activityVery = document.querySelector(DOMstrings.activityVery);
    const activityExtra = document.querySelector(DOMstrings.activityExtra);
    const bmiResult = document.querySelector(DOMstrings.bmiResult);
    const bmrResult = document.querySelector(DOMstrings.bmrResult);
    const resultPanel = document.querySelector(DOMstrings.resultPanel);
    const calorieRadio250 = document.querySelector(DOMstrings.calorieRadio250);
    const calorieRadio500 = document.querySelector(DOMstrings.calorieRadio500);
    const calorieRadio750 = document.querySelector(DOMstrings.calorieRadio750);

    //clear all data input

    metricRadio.checked = true;
    imperialRadio.checked = false;
    heightMetric.value = "";
    weightMetric.value = "";
    heightFeet.value = 0;
    heightInches.value = 0;
    weightPounds.value = "";
    maleSelect.checked = false;
    femaleSelect.checked = false;
    ageInput.value = 0;
    activityNone.checked = true;
    calorieRadio500.checked = true;


    setEventListeners();
  }

  // add event listeners for metric/imperial data selections and calculate button

  const setEventListeners = function() {
    let metricSelected, imperialSelected, calculateButton, calorieRadio250, calorieRadio500, calorieRadio750;

    metricSelected = document.querySelector(DOMstrings.metricSelect);
    metricSelected.addEventListener('click', setMeasurement, false);
    imperialSelected = document.querySelector(DOMstrings.imperialSelect);
    imperialSelected.addEventListener('click', setMeasurement, false);
    calculateButton = document.querySelector(DOMstrings.calculateButton);
    calculateButton.addEventListener('click', getInput, false);

    calorieRadio250 = document.querySelector(DOMstrings.calorieRadio250);
    calorieRadio250.addEventListener('click', getInput, false);
    calorieRadio500 = document.querySelector(DOMstrings.calorieRadio500);
    calorieRadio500.addEventListener('click', getInput, false);
    calorieRadio750 = document.querySelector(DOMstrings.calorieRadio750);
    calorieRadio750.addEventListener('click', getInput, false);
  };

  // display metric or imperial input depending on user selection

  const setMeasurement = function() {
    let metricRadio, imperialRadio, measurementPanelMetric, measurementPanelImperial;


    metricRadio = document.querySelector(DOMstrings.metricSelect);
    imperialRadio = document.querySelector(DOMstrings.imperialSelect);
    measurementPanelMetric = document.querySelector(DOMstrings.measurementPanelMetric);
    measurementPanelImperial = document.querySelector(DOMstrings.measurementPanelImperial);

    if (metricRadio.checked) {
      measurementPanelMetric.style.display = "block";
      measurementPanelImperial.style.display = "none";
    } else if (imperialRadio.checked) {
      measurementPanelMetric.style.display = "none";
      measurementPanelImperial.style.display = "block";

    }

  };

  // get all input values and call functions to calculate BMI, BMR and update UI with results

  const getInput = function() {
    const metricRadio = document.querySelector(DOMstrings.metricSelect);
    const imperialRadio = document.querySelector(DOMstrings.imperialSelect);
    const heightMetric = document.querySelector(DOMstrings.metricHeight);
    const weightMetric = document.querySelector(DOMstrings.metricWeight);
    const heightFeet = document.querySelector(DOMstrings.heightFeet);
    const heightInches = document.querySelector(DOMstrings.heightInches);
    const weightPounds = document.querySelector(DOMstrings.weightPounds);
    const maleSelect = document.querySelector(DOMstrings.maleSelect);
    const femaleSelect = document.querySelector(DOMstrings.femaleSelect);
    const ageInput = document.querySelector(DOMstrings.ageInput);
    const activityNone = document.querySelector(DOMstrings.activityNone);
    const activityLight = document.querySelector(DOMstrings.activityLight);
    const activityModerate = document.querySelector(DOMstrings.activityModerate);
    const activityVery = document.querySelector(DOMstrings.activityVery);
    const activityExtra = document.querySelector(DOMstrings.activityExtra);
    const bmiResult = document.querySelector(DOMstrings.bmiResult);
    const bmrResult = document.querySelector(DOMstrings.bmrResult);
    const resultPanel = document.querySelector(DOMstrings.resultPanel);
    const bmiResultExp = document.querySelector(DOMstrings.bmiResultExp);
    const bmrResultExp = document.querySelector(DOMstrings.bmrResultExp);
    const footer = document.querySelector(DOMstrings.footer);


    calcBMI(metricRadio, imperialRadio, weightMetric, heightMetric, weightPounds, heightInches, heightFeet);
    calcBMR(metricRadio, imperialRadio, maleSelect, femaleSelect, weightMetric, heightMetric, ageInput, weightPounds, heightInches, heightFeet, activityNone, activityLight, activityModerate, activityVery, activityExtra);
    updateUI(bmiResult, bmrResult, resultPanel, bmiResultExp, bmrResultExp, footer);
    constructChart(weightPounds, weightMetric);
    window.scrollBy(0, 730);
  }

  //standard bmi calculations
  const calcBMI = function(metricRadio, imperialRadio, weightMetric, heightMetric, weightPounds, heightInches, heightFeet) {
    if (metricRadio.checked) {
      //as well as calculating BMI, sets boolean isMetric value to determine units for weight loss graph calculation and display
      isMetric = true;
      const weightKg = parseFloat(weightMetric.value);
      const heightM = parseFloat(heightMetric.value / 100);
      bmi = weightKg / (heightM * heightM);
    } else if (imperialRadio.checked) {
      isMetric = false;
      const weightlbs = parseFloat(weightPounds.value);
      const heightImperial = parseFloat(heightInches.value) + (parseFloat(heightFeet.value * 12));
      bmi = (weightlbs / (heightImperial * heightImperial)) * 703;
    }
  }


  //standard bmr calculations
  const calcBMR = function(metricRadio, imperialRadio, maleSelect, femaleSelect, weightMetric, heightMetric, ageInput, weightPounds, heightInches, heightFeet, activityNone, activityLight, activityModerate, activityVery, activityExtra) {
    const weightKg = parseFloat(weightMetric.value);
    const heightcm = parseFloat(heightMetric.value);
    const age = ageInput.value;
    const weightlbs = parseFloat(weightPounds.value);
    const heightImperial = parseFloat(heightInches.value) + (parseFloat(heightFeet.value * 12));


    if (metricRadio.checked && maleSelect.checked) {
      BMR = 66.5 +(13.75 * weightKg) + (5.003 * heightcm) - (6.755 * age);
    } else if (metricRadio.checked && femaleSelect.checked) {
      BMR = 655.1 + (9.563 * weightKg) + (1.850 * heightcm) - (4.676 * age);
    } else if (imperialRadio.checked && maleSelect.checked) {
      BMR = 66 + (6.2 * weightlbs) + (12.7 * heightImperial) - (6.76 * age);
    } else if (imperialRadio.checked && femaleSelect.checked) {
      BMR = 655.1 + (4.35 * weightlbs) + (4.7 * heightImperial) - (4.7 * age);
    }

    //modify base BMR based on activity level
    if (activityNone.checked) {
      BMR = BMR * 1.2;
    } else if (activityLight.checked) {
      BMR = BMR * 1.375;
    } else if (activityModerate.checked) {
      BMR = BMR * 1.55;
    } else if (activityVery.checked) {
      BMR = BMR * 1.725;
    } else if (activityExtra.checked) {
      BMR = BMR * 1.9;
    }


  }

  //update UI with results
  const updateUI = function(bmiResult, bmrResult, resultPanel, bmiResultExp, bmrResultExp, footer) {
    bmiResult.textContent = `${bmi.toFixed(2)}`
    bmiResultExp.textContent = `This is a measure of your weight with respect to your height. A healthy BMI is between 18.5 and 24.9`;
    bmrResult.textContent = `${BMR.toFixed(2)}`;
    bmrResultExp.textContent = `This is the number of calories you need each day. Eating less than this amount will promote weight loss`;
    resultPanel.style.display = 'block';
    footer.style.display = 'block';
  }


  // *** WEIGHT LOSS CHARTS AND CALCULATIONS ***

  // 3500 calories per pound of fat therefore 500 calories less per day to lose 1 pound per week.
  // should never eat less than 1200 calories per day - could suffer serious health effects.
  // recommended not to cut down on calories too quickly.


  const calculateMonths = function() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const nextSixMonths = [];

    // work out current month and add month name to empty array
    const currentDate = new Date();
    currentMonth = months[currentDate.getMonth()];
    nextSixMonths.push(currentMonth);

    // for following six months, increment current date and push names of these months to nextSixMonths array
    for (var i = 0; i < 6; i++) {
      currentDate.setMonth(currentDate.getMonth() + 1);
      namedMonth = months[currentDate.getMonth()];
      nextSixMonths.push(namedMonth);
    }

    //nextSixMonths array passed to constructChart function to populate labels for months of calorie cutting

    return nextSixMonths;
  }

  const calculateWeightLoss = function(weight) {
    // should result in array of 7 values - current weight and weight each month after cutting a given number of calories.
    // 3500 calories per pound of fat therefore 500 calories less per day to lose 1 pound per week.
    // assume 4.4 weeks in a month
    // modify results based on calories cut selection - 500 = 1.0, 250 = 0.5, 750 = 1.5
    var calModifier;
    const calorieRadio250 = document.querySelector(DOMstrings.calorieRadio250);
    const calorieRadio500 = document.querySelector(DOMstrings.calorieRadio500);
    const calorieRadio750 = document.querySelector(DOMstrings.calorieRadio750);

    if (calorieRadio250.checked) {
      calModifier = 0.5;
    } else if (calorieRadio500.checked) {
      calModifier = 1.0;
    } else if (calorieRadio750.checked) {
      calModifier = 1.5;
    }

    var monthlyWeightLoss;

    if (isMetric) {
      monthlyWeightLoss = 1.998 * calModifier;
    } else {
      monthlyWeightLoss = 4.4 * calModifier;
    }

    var weightByMonth = [];
    var cumWeightLoss = 0;

    var currentWeight = weight;
    weightByMonth.push(currentWeight);

    if (isMetric) {
      for (var i = 0; i < 6; i++) {
        //0.454 kg per pound, this is lost each week if 500 cal per day cut. Therefore 0.454 * 4.4 = weight loss per month (1.998kg)
        cumWeightLoss += monthlyWeightLoss;
        var weightThisMonth = currentWeight - cumWeightLoss;
        weightByMonth.push(weightThisMonth);
      }
    } else {
      for (var i = 0; i < 6; i++) {
        cumWeightLoss += monthlyWeightLoss;
        var weightThisMonth = currentWeight - cumWeightLoss;
        weightByMonth.push(weightThisMonth);
      }
    }
    return weightByMonth;


  }

  const constructChart = function(weightPounds, weightMetric) {
    var chartMaxWeight = 0;
    var weightLabel;
    //show chart panel
    chartPanel = document.querySelector(DOMstrings.chartPanel);
    chartPanel.style.display = 'block';

    var weightEachMonth;
    //call function to generate month labels for graph
    monthLabels = calculateMonths();

    //if metric used, pass weight to loss calculator in kg, otherwise pass weight in pounds
    if (isMetric) {
      weightEachMonth = calculateWeightLoss(weightMetric.value);
      chartMaxWeight = 140;
      weightLabel = 'Kgs';
    } else {
      weightEachMonth = calculateWeightLoss(weightPounds.value);
      chartMaxWeight = 300;
      weightLabel = 'lbs';
    }

    const ctx = document.querySelector(DOMstrings.chartElement);
    const weightChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [monthLabels[0], monthLabels[1], monthLabels[2], monthLabels[3], monthLabels[4], monthLabels[5], monthLabels[6]],
        datasets: [{
          label:`Weight(${weightLabel})`,
          fill: false,
          borderColor: '#66FCF1',
          data: [weightEachMonth[0], weightEachMonth[1], weightEachMonth[2], weightEachMonth[3], weightEachMonth[4], weightEachMonth[5], weightEachMonth[6]]
        }]
      },
      options: {
        legend: {
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
          yAxes: [{
            gridLines: { zeroLineColor: '#8f8f8f', color: '#8f8f8f'},
            ticks: {
              beginAtZero: true,
              suggestedMax: chartMaxWeight,
              fontColor: 'white',
              padding: 10
            }
          }],
          xAxes: [{
            gridLines: { zeroLineColor: '#8f8f8f', color: '#8f8f8f',},
            ticks: {
              fontColor: 'white',
              padding: 10,
            }
          }]
        }
      }
    });
  }


  init();










})();
