import { LockIcon, User, GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import { useAuth } from "../../context/AuthContext";
import ProfileSettings from "./ProfileSettings";
import CardTitle from "../ui/CardTitle";


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
                <Card>
                    <CardTitle title={"Password"} />
                    <div className="pt-3">
                        <div className="flex flex-col p-5 pt-0 gap-8">
                            <div className="relative text-xs">
                                <div className="absolute flex -top-2 font-medium leading-none w-full px-4.5 justify-between">
                                    <label htmlFor="password" className="block px-1 text-primary/90 font-normal bg-card">
                                    Password
                                    </label>
                                    <a href="#" className="px-1 text-primary/70 font-normal bg-card hover:text-primary/90">
                                    Forgot password?
                                    </a>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Enter password"
                                    // value={}
                                    // onChange={}
                                    required
                                    className="w-full px-4.5 h-12 rounded-full text-sm outline-none transition-colors border-[1.5px] border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300 placeholder:text-neutral-300 pr-14"
                                />
                            </div>
                            <div className="flex w-full gap-4 justify-between">
                                <div className="relative text-xs w-full">
                                    <div className="absolute flex -top-2 font-medium leading-none w-full px-4.5 justify-between">
                                        <label htmlFor="new-password" className="block px-1 text-primary/90 font-normal bg-card">
                                        New Password
                                        </label>
                                    </div>
                                    <input
                                        id="new-password"
                                        name="new-password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Enter new password"
                                        // value={}
                                        // onChange={}
                                        required
                                        className="w-full px-4.5 h-12 rounded-full text-sm outline-none transition-colors border-[1.5px] border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300 placeholder:text-neutral-300 pr-14"
                                    />
                                </div>
                                <div className="relative text-xs w-full">
                                    <div className="absolute flex -top-2 font-medium leading-none w-full px-4.5 justify-between">
                                        <label htmlFor="confirm-password" className="block px-1 font-normal text-primary/90 bg-card">
                                        Confirm New Password
                                        </label>
                                    </div>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="confirm-password"
                                        placeholder="Confirm new password"
                                        // value={}
                                        // onChange={}
                                        required
                                        className="w-full px-4.5 h-12 rounded-full text-sm outline-none transition-colors border-[1.5px] border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300 placeholder:text-neutral-300 pr-14"
                                    />
                                </div>
                            </div>
                            <button className="px-7 h-12 rounded-full text-sm max-w-fit bg-primary text-white cursor-pointer hover:bg-primary/90">Update Password</button>
                        </div>                        
                    </div>
                </Card>
   
            </div>
        </div>
    );
};

export default Settings;