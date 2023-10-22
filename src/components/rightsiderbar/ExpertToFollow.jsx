import Expert from "./Expert";

const ExpertToFollow = () => {
  return (
    <div className="desktop:flex hidden flex-col items-start max-w-[320px] gap-6 p-6 pr-3 bg-[#FFF8F8] rounded-3xl   w-full">
      <div className="h-6">
        <p className="text-base font-medium font-roboto text-[#1F1A1C]">
          Expert to follow
        </p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <Expert />
        <Expert />
        <Expert />
      </div>
      <button className="flex items-center w-full justify-center hover:bg-menu h-10 px-3 rounded-[36px]">
        <p className="text-[#A73574] text-sm font-roboto font-medium">
          Show more
        </p>
      </button>
    </div>
  );
};

export default ExpertToFollow;
