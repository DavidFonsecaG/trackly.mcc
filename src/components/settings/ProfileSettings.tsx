import Card from "../ui/Card";
import type { User } from "../../types";
import CardTitle from "../ui/CardTitle";
import CardBody from "../ui/CardBody";

interface ProfileSettingsTypes {
    user: User | null;
};

const ProfileSettings: React.FC<ProfileSettingsTypes> = ({
    user,
}) => {
    return (
        <Card>
            <CardTitle title="Profile Information" />
            <CardBody>
                <div className="flex items-center">
                    <div className="relative">
                        <img src={user?.picture} alt={user?.name} className="rounded-full min-w-20 size-20" />
                        <input accept="image/*" type="file" className="absolute inset-0 opacity-0 cursor-pointer"/>
                    </div>
                    <div className="pl-4 text-[0.7rem] text-primary/70 max-w-88">Update your avatar by clicking the image beside. 288x288 px size recommended in PNG or JPG format only.</div>
                </div>
                <div>
                    <div className="mb-4 text-sm text-primary font-semibold">Display name</div>
                    <div>
                        <input
                            id="name"
                            name="name"
                            type="name"
                            placeholder="Enter name" 
                            value={user?.name || ""}
                            readOnly
                            autoComplete="off"
                            className="w-full px-4.5 h-12 rounded-full text-sm outline-none transition-colors border-[1.5px] border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300 placeholder:text-t-secondary/50 pr-14"/>
                    </div>
                </div>
                <div>
                    <div className="mb-4 text-sm text-primary font-semibold">Email</div>
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email" 
                            value={user?.email || ""}
                            readOnly
                            autoComplete="off"
                            className="w-full px-4.5 h-12 rounded-full text-sm outline-none transition-colors border-[1.5px] border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300 placeholder:text-t-secondary/50 pr-14"/>
                    </div>
                </div>                                
            </CardBody>
        </Card>
    )
};

export default ProfileSettings;