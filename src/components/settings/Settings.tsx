import { useRef } from 'react';
import { LockIcon, User, GalleryVerticalEnd } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";
import TrackerSettings from "./TrackerSettings";
import ScrollMenu from './ScrollMenu';

const Settings = () => {

    const { user } = useAuth();
    const profileRef = useRef<HTMLDivElement>(null);
    const trackerRef = useRef<HTMLDivElement>(null);
    const securityRef = useRef<HTMLDivElement>(null);
    const settings = [
        {title: user?.name ?? "Profile Information", subtitle: user?.email ?? "Manage your profile", icon: User, ref: profileRef},
        {title: "Your Tracker", subtitle: "Manage tracker settings", icon: GalleryVerticalEnd, ref: trackerRef},
        {title: "Security", subtitle: "Change password", icon: LockIcon, ref: securityRef},
    ];

    return (
        <div className="flex w-full gap-4">
            <div className="w-md">
                <ScrollMenu 
                    menuItems={settings} 
                    user={user}/>
            </div>
            <div className="flex flex-col w-full gap-4">
                <section ref={profileRef}> 
                    <ProfileSettings user={user} />
                </section>
                <section ref={trackerRef}>
                    <TrackerSettings />
                </section>
                <section ref={securityRef}>
                    <PasswordSettings />
                </section>
            </div>
        </div>
    );
};

export default Settings;