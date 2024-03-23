import Community from "./Community";
const RightSiderBar = () => {
  return (
    <div className="desktop:top-0 desktop:right-0 desktop:sticky block desktop:w-full desktop:h-[100vh] ">
      <div className="flex-col items-start gap-6 py-6 desktop:flex">
        <Community />
      </div>
    </div>
  );
};

export default RightSiderBar;
