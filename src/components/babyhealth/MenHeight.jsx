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
    const height = label - lowerIndex;

    return lowerValue + (upperValue - lowerValue) * height;
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
const MenHeight = ({ zScore, predictedAge, predictedHeight, min }) => {
  console.log(predictedAge);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "HEIGHT CHART BY AGE - BOYS",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Height (cm)",
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
        data: [46.1, 71, 81, 88.7, 94.9, 100.7],
        borderColor: "rgb(255, 128, 128)",
        backgroundColor: "rgb(255, 128, 128)",
      },
      {
        label: "Normal",
        data: [49.9, 75.7, 87.1, 96.1, 103.3, 110],
        borderColor: "rgb(255, 193, 153)",
        backgroundColor: "rgb(255, 193, 153)",
      },
      {
        label: "+2SD",
        data: [53.7, 80.5, 93.2, 103.5, 111.7, 119.2],
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
  //   label: "Height of baby",
  //   data: [{ x: predictedLabel, y: predictedHeight }],

  //   pointStyle: "circle",
  //   pointRadius: 20,
  //   pointBackgroundColor: "red",
  // };

  const pointImage = new Image(50, 50);
  pointImage.src =
    "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_YzyTFUOUD8.png";
  const predictedDataset = {
    label: "Height of baby",
    data: [{ x: predictedLabel, y: predictedHeight }],

    pointStyle: [pointImage, "circle"],
  };

  interpolatedData.unshift(predictedDataset);
  const evaluateZScore = (zScore) => {
    if (zScore < -3) {
      return "Severe malnutrition";
    } else if (zScore < -2) {
      return "Malnutrition";
    } else if (zScore > 2) {
      return "Good height";
    } else {
      return "Normal height";
    }
  };
  return (
    <div className="flex flex-col items-center gap-6 xl:w-full h-fit ">
      <Line
        options={options}
        data={{ labels: initialLabels, datasets: interpolatedData }}
      />
      <div className="flex flex-col items-center pt-6 ml-4 border  rounded-xl px-3 w-full h-[200px] ">
        <h3 className="text-2xl font-bold text-red-600">Evaluation:</h3>
        <p className="text-xl font-bold text-center text-pink-800">
          {evaluateZScore(zScore)}
        </p>
        <h4 className="text-lg font-semibold text-center underline">
          How to interpret the chart
        </h4>
        <p>Average: The child in the average range</p>
        <p>Above +2SD: The child may be very tall.</p>
        <p>Below -2SD: The child is in a state of stunted growth.</p>
      </div>
    </div>
  );
};

export default MenHeight;
