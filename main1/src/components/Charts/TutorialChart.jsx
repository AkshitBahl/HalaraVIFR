import React, { useState } from "react";
import Chart from "react-apexcharts";
import activitiesData from "../../assets/sample1.json"
const TutorialChart = () => {


const getObjectRecognitionCounts = () => {
  const activity = activitiesData.find((activity) => activity.ActivityName === "Tutorial");
  if (activity) {
    const subActivity = activity.SubActivity.find(
      (subActivity) => Object.keys(subActivity)[0] === "ObjectRecognition"
    );
    if (subActivity) {
      const { TotalTrueCounts, TotalFalseCounts } = subActivity.ObjectRecognition;
      return [TotalTrueCounts, TotalFalseCounts];
    }
  }
  return [null, null];
};

const getGestureImitationCounts = () => {
  const activity = activitiesData.find((activity) => activity.ActivityName === "Tutorial");
  if (activity) {
    const subActivity = activity.SubActivity.find(
      (subActivity) => Object.keys(subActivity)[0] === "GestureImitation"
    );
    if (subActivity) {
      const { TotalTrueCounts, TotalFalseCounts } = subActivity.GestureImitation;
      return [TotalTrueCounts, TotalFalseCounts];
    }
  }
  return [null, null];
};

const [objectRecognitionTrueCount, objectRecognitionFalseCount] = getObjectRecognitionCounts();
const [gestureImitationTrueCount, gestureImitationFalseCount] = getGestureImitationCounts();

const objectRecognitionCountsArray = [objectRecognitionTrueCount, objectRecognitionFalseCount];
const gestureImitationCountsArray = [gestureImitationTrueCount, gestureImitationFalseCount];

console.log(objectRecognitionCountsArray, gestureImitationCountsArray); // Output the counts arrays for verification

  const [state, setState] = useState({
    series: [
      {
        name: "True",
        data: objectRecognitionCountsArray,
      },
      {
        name: "False",
        data: gestureImitationCountsArray,
      }
    ],
    options: {
      chart: {
        type: "bar",
        height: 500,
        stacked: true,
      },
      plotOptions: {
        bar: {
        //   horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "15px",
                fontWeight: 600,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "",
      },
      xaxis: {
        categories: ["Object Recognition", "gesture Imitation"],
        labels: {
          formatter: function (val) {
            return val
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  });
  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width="500"
      />
    </div>
  );
};

export default TutorialChart;
