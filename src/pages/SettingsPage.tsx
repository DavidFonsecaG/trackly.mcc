import { useAppContext } from "../context/AppContext";
import Settings from "../components/settings/Settings";
import Toast from "../components/ui/Toast";

function SettingsPage() {

    const { notification, setNotification } = useAppContext();
       
    return (
        <div className="flex flex-col w-full min-h-fit h-full px-3 pb-3 md:pb-4 lg:pl-0">
            <Settings setNotification={setNotification}/>
            {notification && <Toast message={notification} duration={10000}/>}
        </div>
    );
};

export default SettingsPage;