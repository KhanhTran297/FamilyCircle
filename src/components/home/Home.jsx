import Tab from "../tab/Tab";

const Home = (props) => {
  return (
    <div className="w-full desktop:max-w-[760px] desktop:w-[700px]   ">
      <Tab {...props} />
    </div>
  );
};

export default Home;
