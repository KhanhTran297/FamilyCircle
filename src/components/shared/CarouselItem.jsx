import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CarouselItem = (props) => {
  const navigate = useNavigate();
  return (
    <div className=" xl:grid flex flex-col gap-2  xl:gap-0 xl:grid-flow-col xl:grid-cols-[40%_60%] xl:w-full">
      <div className=" flex justify-center items-center bg-[#FFD8E8] xl:bg-none  ">
        <img
          src={props.item.categoryImage}
          alt=""
          className=" w-[250px] h-[250px]"
        />
      </div>
      <div className="flex flex-col gap-2 pl-2 pr-2 xl:mt-10 xl:w-full xl:pr-8">
        <div className=" text-3xl font-roboto">{props.item.categoryName}</div>
        <div className=" whitespace-normal font-roboto text-lg">
          {props.item.categoryDescription}
        </div>
        <div className="flex items-center xl:justify-end xl:mt-4">
          <div
            className=" flex h-10 xl:w-[100px] w-full justify-center pr-4 pl-4 items-center gap-[7px] rounded-[36px] bg-button-submit-light hover:bg-button-hover-light cursor-pointer hover:shadow-buttonHover"
            onClick={() => navigate(`/community/${props.item.categoryName}`)}
          >
            <p className=" text-[#fff] font-roboto text-sm font-medium ">
              More
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  item: PropTypes.object,
};

export default CarouselItem;
