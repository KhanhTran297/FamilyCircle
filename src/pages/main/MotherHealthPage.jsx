import React, { useState } from "react";
import ProgressBar from "../../components/motherhealth/ProgressBar";
import { Flex, Progress, Tooltip } from "antd";
const MotherHealthPage = () => {
  const [name, setName] = useState("");
  const [weightPre, setWeightPre] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [week, setWeek] = useState("");
  const [trackingDate, setTrackingDate] = useState(new Date());
  const [bmi, setBMI] = useState(null);
  const [bmiData, setBmiData] = useState(null);

  const formatDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const calculateBMI = (weightPre, height) => {
    const heightInMeter = height / 100;
    const bmi = weightPre / (heightInMeter * heightInMeter);

    let status = "";
    let level = "";

    if (bmi <= 18.5) {
      level = "Skinny";
      status = "active";
    } else if (bmi <= 25) {
      level = "Normal";
      status = "success";
    } else {
      level = "Obese";
      status = "exception";
    }

    return { bmi: bmi.toFixed(2), status, level };
  };

  const calculateProgress = (bmi) => {
    if (bmi <= 18.5) {
      return 33.33;
    } else if (bmi <= 25) {
      return 66.66;
    } else {
      return 100;
    }
  };
  const calculateRecommendedWeightIncrease = (bmi, weightPre) => {
    let weightIncrease = 0;

    if (bmi < 18.5) {
      weightIncrease = 0.25 * weightPre;
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      weightIncrease = 10;
    } else if (bmi >= 25) {
      weightIncrease = 0.15 * weightPre;
    }

    return weightIncrease.toFixed(2); // Round to 2 decimal places
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmiData = calculateBMI(weightPre, height);
    setBmiData(bmiData);
    calculateProgress(bmiData.bmi);
    calculateRecommendedWeightIncrease(bmiData.bmi, weightPre);
  };
  console.log("bmi", bmi);
  return (
    <div className="w-full max-h-screen overflow-x-hidden overflow-y-auto">
      <div className="flex flex-col self-stretch w-full gap-8 mt-6 ">
        <div className="flex w-full">
          <div className="flex flex-row lg:w-[1160px] lg:h-[330px] border border-solid rounded-xl shadow-lg px-4 ">
            <div className="flex flex-col gap-4 justify-center items-center p-4 w-[360px] border-r-2">
              <img
                src="https://dinhduongmevabe.com.vn/_nuxt/img/icon-mother.ca4295a.svg"
                className="w-[70px] h-[70px]"
              />
              <h2 className="font-medium text-orange-600 text-title font-roboto">
                Monitor Your Mother&apos;s Health
              </h2>
              <p className="text-sm font-normal">
                Please update the information according to the table to monitor
                your mother&apos;s health.
              </p>
            </div>

            <div className="flex flex-col items-center p-4 ">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row justify-between gap-6 ">
                  <label className="flex flex-col gap-3 text-base font-medium ">
                    Mother&apos;s full name:
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="border-2  w-[200px] h-[45px] p-3 text-base font-normal rounded-xl"
                    />
                  </label>
                  <br />
                  <label className="flex flex-col gap-3 text-base font-medium">
                    Height(cm):
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      required
                      className="border-2  w-[200px] h-[45px] p-3 text-base font-normal rounded-xl"
                    />
                  </label>
                  <br />
                  <label className="flex flex-col gap-3 text-base font-medium">
                    Weight before pregnancy (kg):
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={weightPre}
                      onChange={(e) => setWeightPre(e.target.value)}
                      required
                      className="border-2  w-[200px] h-[45px] p-3 text-base font-normal rounded-xl"
                    />
                  </label>
                </div>
                <br />
                <div className="flex flex-row justify-between gap-6 ">
                  <label className="flex flex-col gap-3 text-base font-medium">
                    Weight (kg):
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                      className="border-2  w-[200px] h-[45px] p-3 text-base font-normal rounded-xl"
                    />
                  </label>
                  <br />
                  <label className="flex flex-col gap-3 text-base font-medium">
                    Pregnancy week:
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={week}
                      onChange={(e) => setWeek(e.target.value)}
                      required
                      className="border-2  w-[200px] h-[45px] p-3 text-base font-normal rounded-xl"
                    />
                  </label>
                  <br />
                  <label className="flex flex-col gap-3 text-base font-medium">
                    Tracking Date:
                    <input
                      type="date"
                      value={formatDate(trackingDate)}
                      onChange={(e) =>
                        setTrackingDate(new Date(e.target.value))
                      }
                      required
                      className="border-2  w-[200px] h-[45px] p-3 text-base font-normal rounded-xl"
                    />
                  </label>
                </div>
                <br />
                <div className="flex justify-center w-full">
                  <button
                    type="submit"
                    className="h-[50px] w-[250px] bg-[#A73574] text-white font-bold text-lg rounded-lg "
                  >
                    Health check
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <h2 className="text-3xl font-bold ">
            Mother Health Monitoring Results
          </h2>
        </div>
        <div className="flex flex-col w-full h-full ">
          <div className="flex flex-row xl:w-[1160px] xl:h-[293px] border border-solid rounded-xl shadow-lg px-4 ">
            <div className="flex flex-col gap-4   p-4 w-[800px] border-r-2">
              <h2 className="font-medium text-title font-roboto">
                Body mass index before pregnancy
              </h2>
              <p className="text-sm font-normal">
                BMI (Body Mass Index) is a "body mass index" determined based on
                weight and height. Depending on whether the mother's
                pre-pregnancy BMI is thin, normal or overweight, the recommended
                amount of weight to gain during pregnancy will be different.
              </p>
              {bmiData && (
                <Flex gap="small" vertical>
                  <Tooltip
                    title={`${bmiData ? bmiData.level : "Loading"} BMI :  ${
                      bmiData.bmi
                    }`}
                  >
                    <Progress
                      percent={
                        bmiData ? calculateProgress(parseFloat(bmiData.bmi)) : 0
                      }
                      status={bmiData.status}
                      size={[600, 40]}
                    />
                  </Tooltip>
                </Flex>
              )}
            </div>
            <div className="flex flex-col items-center gap-4 p-4">
              <h2 className="font-medium text-center text-title font-roboto">
                COMMENT ON YOUR BMI BEFORE PREGNANCY
              </h2>
              <img
                src="https://dinhduongmevabe.com.vn/_nuxt/img/icon-mother-blue.eabf34a.svg"
                className="w-[70px] h-[70px]"
              />
              {bmiData && (
                <p className="text-sm font-normal text-center">
                  Her nutritional status before pregnancy is categorized as{" "}
                  <br />
                  <br />
                  <span className="text-2xl font-bold text-center text-pink-800 uppercase">
                    {bmiData.level}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full ">
          <div className="flex flex-col xl:w-[1160px] xl:h-auto border border-solid rounded-xl shadow-lg p-4  ">
            <div className="flex flex-col gap-6">
              <h2 className="font-medium text-center text-title font-roboto">
                RECOMMENDED WEIGHT INCREASE ACCORDING TO YOUR PRE- PREGNANCY BMI
              </h2>
              <div className="flex flex-row gap-4 p-4">
                <div className="w-[700px] border-r-2 border-solid flex flex-col gap-4 p-4">
                  <h2 className="font-medium text-title font-roboto">Note</h2>
                  <ul style={{ listStyleType: "disc" }}>
                    <li>
                      Body mass index (BMI) &lt; 18.5: Mother's body is
                      underweight. The recommended weight gain during pregnancy
                      should be 25% of the pre-pregnancy weight. For example, if
                      the mother weighs 40.5kg and is 150cm tall, her BMI would
                      be 18. When pregnant, she should gain about 10kg (25% x
                      40.5kg).
                    </li>
                    <li>
                      Body mass index (BMI) from 18.5 to 24.9: Mother's body is
                      normal. The recommended weight gain during pregnancy is
                      between 10kg and 12kg.
                    </li>
                    <li>
                      Body mass index (BMI) equal to or greater than 25:
                      Mother's body is overweight. The recommended weight gain
                      during pregnancy should be about 15% of the pre-pregnancy
                      weight. For example, if the mother weighs 70kg and is
                      150cm tall, her BMI would be 31. During pregnancy, she
                      should gain about 10kg (15% x 70kg).
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-center gap-6 ">
                  <img
                    src="https://dinhduongmevabe.com.vn/_nuxt/img/icon-doctor-green.79e15b4.svg"
                    className="w-[70px] h-[70px]"
                  />
                  {bmiData && (
                    <p className="font-normal text-center ">
                      Recommended weight increase based on pre-pregnancy BMI:{" "}
                      <span className="text-2xl font-bold text-center text-pink-800 uppercase">
                        {calculateRecommendedWeightIncrease(
                          parseFloat(bmiData.bmi),
                          parseFloat(weightPre)
                        )}{" "}
                        kg
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotherHealthPage;
