import { LockIcon, User, GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import { useAuth } from "../../context/AuthContext";


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
                    <div className="flex items-center p-3">
                        <h2 className="md:text-lg font-semibold">Settings</h2>
                    </div>
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
                {settings.map((s, idx) => (
                    <Card key={idx}>
                        <div className="flex items-center p-3">
                            <h2 className="md:text-lg font-semibold">{s.id}</h2>
                        </div>
                        <div className="pt-3">
                            <div className="flex flex-col p-5 pt-0 gap-8">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <img src="avatar.jpg" alt="avatar" className="rounded-full size-20" />
                                        <input accept="image/*" type="file" className="absolute inset-0 opacity-0 cursor-pointer"/>
                                    </div>
                                    <div className="pl-4 text-xs text-primary/50 font-normal max-w-88">Update your avatar by clicking the image beside. 288x288 px size recommended in PNG or JPG format only.</div>
                                </div>
                                <div>
                                    <div className="mb-4 text-sm text-primary font-semibold">Display name</div>
                                    <div>
                                        <input 
                                            type="n"
                                            placeholder="Enter name" 
                                            value={user?.name}
                                            required
                                            className="w-full px-4.5 h-12 rounded-full text-sm outline-none transition-colors border-[1.5px] border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300 placeholder:text-t-secondary/50 pr-14"/>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-4 text-sm text-primary font-semibold">Email</div>
                                    <div>
                                        <input 
                                            type="email"
                                            placeholder="Enter email" 
                                            value={user?.email}
                                            required
                                            className="w-full px-4.5 h-12 rounded-full text-sm outline-none transition-colors border-[1.5px] border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300 placeholder:text-t-secondary/50 pr-14"/>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </Card>
                ))}   
            </div>
        </div>
    );
};

export default Settings;