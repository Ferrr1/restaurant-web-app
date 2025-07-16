import Navbar from "../components/Navbar";
import ThemeSelector from "../components/ui/ThemeSelector";

const Settings = () => {
  return (
    <div>
      <Navbar head={"Settings"} summary={"Customize your experience"} />
      <div className="py-4 px-8">
        <ThemeSelector />
      </div>
    </div>
  );
};

export default Settings;
