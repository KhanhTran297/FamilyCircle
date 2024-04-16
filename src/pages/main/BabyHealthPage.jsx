import React, { useState } from "react";

import MenWeight from "../../components/babyhealth/MenWeight";
import MenHeight from "../../components/babyhealth/MenHeight";
import { useQuery } from "@tanstack/react-query";
import { getListHeightApi, getListWeightApi } from "../../api/data";
import GirlWeight from "../../components/babyhealth/GirlWeight";
import GirlHeight from "../../components/babyhealth/GirlHeight";
import { min } from "date-fns";

const BabyHealthPage = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState(0);
  const [birthDate, setBirthDate] = useState(new Date());
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [trackingDate, setTrackingDate] = useState(new Date());
  const [zScoreWeight, setZScoreWeight] = useState(null);
  const [zScoreHeight, setZScoreHeight] = useState(null);
  const [predictedAge, setPredictedAge] = useState(null);
  const [healthData, setHealthData] = useState(null);

  const formatDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const minBirthDate = new Date();
  minBirthDate.setFullYear(minBirthDate.getFullYear() - 4);

  const calculateAgeInMonths = (birthDate, trackingDate) => {
    const years = trackingDate.getFullYear() - birthDate.getFullYear();
    const months = trackingDate.getMonth() - birthDate.getMonth();
    const days = trackingDate.getDate() - birthDate.getDate();

    return years * 12 + months + (days < 0 ? -1 : 0);
  };
  const calculateAge = (birthDate, trackingDate) => {
    const years = trackingDate.getFullYear() - birthDate.getFullYear();
    const months = trackingDate.getMonth() - birthDate.getMonth();
    const days = trackingDate.getDate() - birthDate.getDate();

    let totalMonths = years * 12 + months + (days < 0 ? -1 : 0);
    let formattedAge = parseFloat(
      `${totalMonths / 12}.${(totalMonths % 12).toFixed(0)}`
    );

    return formattedAge;
  };

  console.log(predictedAge);
  const calculateZScoreWeight = (weight, L, M, S) => {
    console.log(L, M, S);
    const weightFloat = parseFloat(weight);
    const LFloat = parseFloat(L);
    const MFloat = parseFloat(M);
    const SFloat = parseFloat(S);

    if (LFloat === 0) {
      console.error("L (Power) cannot be zero.");
      return null;
    }

    const zScore =
      (Math.pow(weightFloat / MFloat, LFloat) - 1) / (LFloat * SFloat);
    return zScore;
  };

  const calculateZScoreHeight = (height, L, M, S) => {
    console.log(L, M, S);
    const weightFloat = parseFloat(height);
    const LFloat = parseFloat(L);
    const MFloat = parseFloat(M);
    const SFloat = parseFloat(S);

    if (LFloat === 0) {
      console.error("L (Power) cannot be zero.");
      return null;
    }

    const zScore =
      (Math.pow(weightFloat / MFloat, LFloat) - 1) / (LFloat * SFloat);
    return zScore;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const weightResponse = await getListWeightApi(
        gender,
        calculateAgeInMonths(birthDate, trackingDate)
      );
      const heightResponse = await getListHeightApi(
        gender,
        calculateAgeInMonths(birthDate, trackingDate)
      );

      const {
        power: powerWeight,
        median: medianWeight,
        variation: variationWeight,
      } = weightResponse.data.content[0] || {};
      const {
        power: powerHeight,
        median: medianHeight,
        variation: variationHeight,
      } = heightResponse.data.content[0] || {};

      const calculatedZScoreWeight = calculateZScoreWeight(
        weight,
        powerWeight,
        medianWeight,
        variationWeight
      );
      const calculatedZScoreHeight = calculateZScoreHeight(
        height,
        powerHeight,
        medianHeight,
        variationHeight
      );
      const predictedAge = calculateAge(birthDate, trackingDate);
      setZScoreWeight(calculatedZScoreWeight);
      setZScoreHeight(calculatedZScoreHeight);
      setPredictedAge(predictedAge);

      setHealthData({
        zScoreHeight: calculatedZScoreHeight,
        zScoreWeight: calculatedZScoreWeight,
        age: predictedAge,
        predictedHeight: height,
        predictedWeight: weight,
        minBirthDate,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(gender);
  return (
    <div className="w-full max-h-screen overflow-x-hidden overflow-y-auto">
      <div className="flex flex-col self-stretch w-full gap-8 mt-6 ml-4 ">
        <div className="flex justify-center w-full">
          <div className="flex flex-row xl:w-[1110px] xl:h-[293px] border border-solid rounded-xl shadow-lg px-4 ">
            <div className="flex flex-col gap-4 justify-center items-center p-4 w-[360px] border-r-2">
              <img
                src="https://dinhduongmevabe.com.vn/_nuxt/img/icon-banner-baby.cb9ea62.svg"
                className="w-[70px] h-[70px]"
              />
              <h2 className="font-medium text-orange-600 text-title font-roboto">
                Monitor Your Baby&apos;s Health
              </h2>
              <p className="text-sm font-normal">
                Please update the information according to the table to monitor
                your baby&apos;s development process.
              </p>
            </div>

            <div className="flex flex-col items-center p-4 ">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row justify-between gap-6 ">
                  <label className="flex flex-col gap-3 text-base font-medium ">
                    Baby&apos;s full name:
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
                    Gender:
                    <select
                      value={gender}
                      onChange={(e) => setGender(parseInt(e.target.value, 10))}
                      required
                      className="text-sm font-normal border-2 w-[200px] h-[45px] p-3 rounded-xl "
                    >
                      <option value="1">Boy</option>
                      <option value="0">Girl</option>
                    </select>
                  </label>
                  <br />
                  <label className="flex flex-col gap-3 text-base font-medium">
                    Birthday
                    <input
                      type="date"
                      value={formatDate(birthDate)}
                      onChange={(e) => setBirthDate(new Date(e.target.value))}
                      required
                      min={formatDate(minBirthDate)}
                      max={formatDate(new Date())}
                      className="text-base font-normal border-2  w-[200px] h-[45px] p-3 rounded-xl "
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
            Baby Health Monitoring Results
          </h2>
        </div>
        <div className="flex flex-col w-full h-full ">
          <div className="flex flex-col items-center justify-center w-full gap-6 p-6 ">
            {gender === 0
              ? healthData && (
                  <GirlWeight
                    zScore={healthData.zScoreWeight}
                    predictedAge={healthData.age}
                    predictedWeight={healthData.predictedWeight}
                    min={healthData.minBirthDate}
                  />
                )
              : healthData && (
                  <MenWeight
                    zScore={healthData.zScoreWeight}
                    predictedAge={healthData.age}
                    predictedWeight={healthData.predictedWeight}
                    min={healthData.minBirthDate}
                  />
                )}
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-6 p-6">
            {gender === 0
              ? healthData && (
                  <GirlHeight
                    zScore={healthData.zScoreWeight}
                    predictedAge={healthData.age}
                    predictedHeight={healthData.predictedHeight}
                    min={healthData.minBirthDate}
                  />
                )
              : healthData && (
                  <MenHeight
                    zScore={healthData.zScoreWeight}
                    predictedAge={healthData.age}
                    predictedHeight={healthData.predictedHeight}
                    min={healthData.minBirthDate}
                  />
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyHealthPage;
