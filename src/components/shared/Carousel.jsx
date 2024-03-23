import React, { useState } from "react";
import PropTypes from "prop-types";
import CarouselItem from "./CarouselItem";
import { RightOutlined, LeftOutlined, MinusOutlined } from "@ant-design/icons";
const Carousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      img: "./Pregnant.png",
      title: "Pregnant",
      description:
        "The community group for mothers has good news and looks forward to welcoming their little angel in the next 9 months and 10 days.",
    },
    {
      img: "./Postpartum.png",
      title: "Postpartum",
      description:
        "Taking care of the mother after giving birth will require a lot of information and knowledge so that the postpartum period is gentle and safe for the mother.",
    },
    {
      img: "./Baby.png",
      title:
        "The first 365 days of your child's journey with your child will be gentle, meaningful and full of knowledge from useful topics in the community group.",
      description: "3 chủ đề",
    },
  ];
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
  };
  return (
    <div className=" relative xl:w-full xl:h-[250px] xl:bg-[#85a8c5]  xl:rounded-2xl xl:overflow-hidden ">
      <div
        className=" duration-[0.3s] shadow-md whitespace-nowrap  w-full  "
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            img={item.img}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <div className=" xl:absolute xl:bottom-2 xl:flex xl:flex-row xl:justify-center w-full ">
        {items.map((item, index) => (
          <MinusOutlined
            key={index}
            className={` cursor-pointer hover:font-medium text-xl ${
              index == activeIndex && "text-white"
            }`}
            onClick={() => {
              updateIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {};

export default Carousel;
