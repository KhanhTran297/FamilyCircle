import Tab from "../../components/tab/Tab";
import useAccount from "../../hooks/useAccount";

const ForumPage = () => {
  const { accountProfile } = useAccount();

  return (
    <div className="w-full">
      <div className="flex self-stretch justify-center w-full desktop:w-[760px]">
        <Tab kind="2" accountId={accountProfile?.data?.id} />
      </div>
    </div>
  );
};

export default ForumPage;
