import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const interpolateData = (labels, data, updatedLabels) => {
  return updatedLabels.map((label) => {
    if (label % 1 === 0) {
      return data[label];
    }

    const lowerIndex = Math.floor(label);
    const upperIndex = Math.ceil(label);
    const lowerValue = data[lowerIndex];
    const upperValue = data[upperIndex];
    const weight = label - lowerIndex;

    return lowerValue + (upperValue - lowerValue) * weight;
  });
};
const findExactPosition = (labels, targetValue) => {
  for (let i = 0; i < labels.length - 1; i++) {
    if (labels[i] <= targetValue && labels[i + 1] > targetValue) {
      return i + (targetValue - labels[i]) / (labels[i + 1] - labels[i]);
    }
  }
  return labels.length - 1;
};
const GirlWeight = ({ zScore, predictedAge, predictedWeight, min }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "WEIGHT CHART BY AGE - GIRLS",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Weight (kg)",
        },
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        title: {
          display: true,
          text: "Year Old",
        },
        type: "linear",
        min: 0,
        max: 5,
      },
    },
  };

  const initialLabels = [0, 1, 2, 3, 4, 5];

  const initialData = {
    labels: initialLabels,
    datasets: [
      {
        label: "-2SD",
        data: [2.4, 7, 9, 10.8, 12.3, 13.7],
        borderColor: "rgb(255, 128, 128)",
        backgroundColor: "rgb(255, 128, 128)",
      },
      {
        label: "Normal",
        data: [3.2, 8.9, 11.5, 13.9, 16.1, 18.2],
        borderColor: "rgb(255, 193, 153)",
        backgroundColor: "rgb(255, 193, 153)",
      },
      {
        label: "+2SD",
        data: [4.2, 11.5, 14.8, 18.1, 21.5, 24.9],
        borderColor: "rgb(40, 170, 10)",
        backgroundColor: "rgb(40, 170, 10)",
      },
    ],
  };
  const interpolatedData = initialData.datasets.map((dataset) => ({
    ...dataset,
    data: interpolateData(initialData.labels, dataset.data, initialLabels),
  }));

  const exactPosition = findExactPosition(initialLabels, predictedAge);
  const predictedLabel = exactPosition;

  // const predictedDataset = {
  //   label: "Weight of baby",
  //   data: [{ x: predictedLabel, y: predictedWeight }],

  //   pointStyle: "circle",
  //   pointRadius: 20,
  //   pointBackgroundColor: "red",
  // };

  const pointImage = new Image(50, 50);
  pointImage.src =
    "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_YzyTFUOUD8.png";
  const predictedDataset = {
    label: "Weight of baby",
    data: [{ x: predictedLabel, y: predictedWeight }],

    pointStyle: [pointImage, "circle"],
  };

  interpolatedData.unshift(predictedDataset);
  const evaluateZScore = (zScore) => {
    if (zScore < -3) {
      return "Severe malnutrition";
    } else if (zScore < -2) {
      return "Malnutrition";
    } else if (zScore > 2) {
      return "Overweight";
    } else if (zScore > 3) {
      return "Obese";
    } else {
      return "Normal";
    }
  };
  return (
    <div className="flex flex-col items-center gap-6 xl:w-full h-fit">
      <Line
        options={options}
        data={{ labels: initialLabels, datasets: interpolatedData }}
      />
      <div className="flex flex-col items-center pt-6 ml-4 border  rounded-xl px-3 w-full h-[200px]  ">
        <h3 className="text-2xl font-bold text-red-600">Evaluation:</h3>
        <p className="text-xl font-bold text-center text-pink-800">
          {evaluateZScore(zScore)}
        </p>
        <h4 className="text-lg font-semibold text-center underline">
          How to interpret the chart
        </h4>
        <p>Average: The child in average range</p>
        <p>Above +2SD: The child may be overweight</p>
        <p>Below -2SD: The child is in a state of malnutrition</p>
      </div>
    </div>
  );
};

export default GirlWeight;
