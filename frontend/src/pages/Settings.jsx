import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";
import ThemeSelector from "../components/ui/ThemeSelector";

const Settings = () => {
  return (
    <div>
      <MetaTag title={"Settings"} description={"Customize your experience"} />
      <Navbar head={"Settings"} summary={"Customize your experience"} />
      <div className="py-4 px-8">
        <ThemeSelector />
      </div>
    </div>
  );
};

export default Settings;
