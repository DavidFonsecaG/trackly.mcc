import { useRef } from 'react';
import { LockIcon, User, GalleryVerticalEnd } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";
import TrackerSettings from "./TrackerSettings";
import ScrollMenu from './ScrollMenu';

interface SettingsTypes{
    setNotification: (message: string | null) => void
};

const Settings: React.FC<SettingsTypes> = ({
    setNotification
}) => {

    const { user, updateUser } = useAuth();
    const profileRef = useRef<HTMLDivElement>(null);
    const trackerRef = useRef<HTMLDivElement>(null);
    const securityRef = useRef<HTMLDivElement>(null);
    const settings = [
        {title: user?.name ?? "Profile Information", subtitle: user?.email ?? "Manage your profile", icon: User, ref: profileRef},
        {title: "Your Tracker", subtitle: "Manage tracker settings", icon: GalleryVerticalEnd, ref: trackerRef},
        {title: "Security", subtitle: "Change password", icon: LockIcon, ref: securityRef},
    ];

    const handleUpdatePsswrd = async (password: string, newPassword: string) => {
        const message = await updateUser(password, newPassword);
        setNotification(message);
    };

    return (
        <div className="flex w-full gap-4">
            <div className="w-md">
                <ScrollMenu 
                    menuItems={settings} 
                    user={user}/>
            </div>
            <div className="flex flex-col w-full gap-4">
                <section ref={profileRef}> 
                    <ProfileSettings user={user}/>
                </section>
                <section ref={trackerRef}>
                    <TrackerSettings />
                </section>
                <section ref={securityRef}>
                    <PasswordSettings 
                        handleUpdatePsswrd={handleUpdatePsswrd}
                        setNotification={setNotification}
                    />
                </section>
            </div>
        </div>
    );
};

export default Settings;