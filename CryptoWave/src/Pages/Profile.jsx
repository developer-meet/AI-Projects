import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Profile = () => {
  return (
    <div className="flex text-white bg-[#0B0E14] min-h-screen">
      <div className="w-[300px] h-screen sticky top-0 bg-[#11151C] hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Header title="My Profile" />
      </div>
    </div>
  );
};

export default Profile;
