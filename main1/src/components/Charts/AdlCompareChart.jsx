import React, { useState } from "react";
import Chart from "react-apexcharts";
import activitiesData from '../../assets/sample1.json';
const AdlCompareChart = () => {

    

const adlActivities = activitiesData.filter((activity) => activity.ActivityName === "ADL");

const brushingCounts = adlActivities.map((activity) => {
  const brushingSubActivity = activity.SubActivity.find(
    (subActivity) => Object.keys(subActivity)[0] === "Brushing"
  );
  return brushingSubActivity ? brushingSubActivity.Brushing.count : 0;
});

const toiletTrainingCounts = adlActivities.map((activity) => {
  const toiletTrainingSubActivity = activity.SubActivity.find(
    (subActivity) => Object.keys(subActivity)[0] === "Toilet_training"
  );
  return toiletTrainingSubActivity ? toiletTrainingSubActivity.Toilet_training.count : 0;
});

const bathingCounts = adlActivities.map((activity) => {
  const bathingSubActivity = activity.SubActivity.find(
    (subActivity) => Object.keys(subActivity)[0] === "Bathing"
  );
  return bathingSubActivity ? bathingSubActivity.Bathing.count : 0;
});

const clothingCounts = adlActivities.map((activity) => {
  const clothingSubActivity = activity.SubActivity.find(
    (subActivity) => Object.keys(subActivity)[0] === "Clothing"
  );
  return clothingSubActivity ? clothingSubActivity.Clothing.count : 0;
});

const grommingCounts = adlActivities.map((activity) => {
  const grommingSubActivity = activity.SubActivity.find(
    (subActivity) => Object.keys(subActivity)[0] === "Gromming"
  );
  return grommingSubActivity ? grommingSubActivity.Gromming.count : 0;
});

const breakfastCounts = adlActivities.map((activity) => {
  const breakfastSubActivity = activity.SubActivity.find(
    (subActivity) => Object.keys(subActivity)[0] === "Breakfast"
  );
  return breakfastSubActivity ? breakfastSubActivity.Breakfast.count : 0;
});

console.log(brushingCounts, toiletTrainingCounts, bathingCounts, clothingCounts, grommingCounts, breakfastCounts);



  const [state, setState] = useState({
    series: [
      {
        name: "Brushing",
        data: brushingCounts,
      },
      {
        name: "Toilet Training",
        data: toiletTrainingCounts,
      },
      {
        name: "Bathing",
        data: bathingCounts,
      },
      {
        name: "Clothing",
        data: clothingCounts,
      },
      {
        name: "Gromming",
        data: grommingCounts,
      },
      {
        name: "Breakfast",
        data: breakfastCounts,
      },
    ],
    options: {
      chart: {
        height: 550,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454",'#de4e4e','#09ff22','#27c637'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Session 1","Session 2","Session 3"],
        title: {
          text: "Session",
        },
      },
      yaxis: {
        title: {
          text: "Count",
        },
        min: 0,
        max: 10,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width="500"
      />
    </div>
  );
};

export default AdlCompareChart;
