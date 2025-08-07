import { LockIcon, User, GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import { useAuth } from "../../context/AuthContext";
import ProfileSettings from "./ProfileSettings";
import CardTitle from "../ui/CardTitle";
import PasswordSettings from "./PasswordSettings";


const Settings = () => {

    const { user } = useAuth();

    const settings = [
        {title: user?.name, subtitle: user?.email, id: "Profile Information", to: "#", icon: User},
        {title: "Your Tracker", subtitle: "Manage tracker settings", id: "Your Tracker", to: "#", icon: GalleryVerticalEnd},
        {title: "Security", subtitle: "Change password", id: "Password", to: "#", icon: LockIcon},
    ];

    return (
        <div className="flex w-full gap-4">
            <div className="w-md">
                <Card className={"sticky top-0"}>
                    <CardTitle title="Settings" />
                    <div className="pt-3">
                        <div className="flex flex-col gap-1">
                            {settings.map((s, idx) => (
                                <Link
                                    key={idx} 
                                    to={s.to}
                                    className="group flex items-center p-3 cursor-pointer rounded-2xl hover:bg-background/20 hover:inset-ring-[1.5px] hover:inset-ring-gray-100"
                                >
                                    {user && user!.name === s.title 
                                        ? <img src="avatar.jpg" alt={s.title} className="rounded-full size-11" />  
                                        : <div className={`flex justify-center items-center size-11 rounded-full bg-background text-primary/50`}>
                                        <s.icon className="w-5 h-5"/>
                                    </div>}
                                    <div className="pl-4">
                                        <div className="text-sm text-primary font-semibold">{s.title}</div>
                                        <div className="text-xs text-primary/50 font-normal">{s.subtitle}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
            <div className="flex flex-col w-full gap-4">
                <ProfileSettings 
                    user={user}
                />
                <PasswordSettings />
            </div>
        </div>
    );
};

export default Settings;