import Tab from "../tab/Tab";

const Home = () => {
  return (
    <div className="w-full xl:w-[760px]   ">
      <div className="sticky flex items-start self-stretch px-6 py-2 top-14 xl:top-0 ">
        <p className="font-medium text-title font-roboto">Home</p>
      </div>
      <Tab />
    </div>
  );
};

export default Home;
