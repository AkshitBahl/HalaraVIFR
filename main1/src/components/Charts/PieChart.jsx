import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import activitiesData from "../../assets/sample1.json"
const PieChart = () => {


const getSubActivityCount = (activityName) => {
  const activity = activitiesData.find((activity) => activity.ActivityName === activityName);
  if (activity) {
    const subActivities = activity.SubActivity;
    const counts = subActivities.map((subActivity) => {
      const key = Object.keys(subActivity)[0];
      return subActivity[key].count;
    });
    return counts;
  }
  return [];
};

const Count = getSubActivityCount("ADL"); // Brushing


console.log(Count); // Output the counts for verification

  
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Brushing", "Toilet Training", "Bathing", "Clothing", "Grooming", "Breakfast"],
      },
    },
    series: [
      {
        name: "series-1",
        data: Count,
      },
    ],
    dataLabels: {
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
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

export default PieChart;
