import Tab from "../tab/Tab";

const Home = (props) => {
  return (
    <div className="w-full xl:max-w-[760px] xl:w-[700px]   ">
      <Tab {...props} />
    </div>
  );
};

export default Home;
