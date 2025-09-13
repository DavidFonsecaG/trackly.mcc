import { useAppContext } from "../context/AppContext";
import Settings from "../components/settings/Settings";
import Toast from "../components/ui/Toast";

function SettingsPage() {

    const { notification, setNotification } = useAppContext();
       
    return (
        <div className="flex flex-col w-full min-h-fit h-full pl-3 pr-1.5 pb-3 lg:pl-0 md:pr-3 md:pb-4">
            <Settings setNotification={setNotification}/>
            {notification && <Toast message={notification} duration={10000}/>}
        </div>
    );
};

export default SettingsPage;