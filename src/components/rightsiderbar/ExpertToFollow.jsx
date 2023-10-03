import Expert from "./Expert";

const ExpertToFollow = () => {
  return (
    <div className="xl:flex hidden flex-col items-start w-full gap-6 p-6 pr-3 bg-[#FFF8F8] rounded-3xl">
      <div className="h-6">
        <p className="text-base font-medium font-roboto text-[#1F1A1C]">
          Expert to follow
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Expert />
        <Expert />
        <Expert />
      </div>
      <button className="flex items-center self-stretch justify-center hover:bg-menu h-10 px-3 rounded-[36px]">
        <p className="text-[#A73574] text-sm font-roboto font-medium">
          Show more
        </p>
      </button>
    </div>
  );
};

export default ExpertToFollow;
