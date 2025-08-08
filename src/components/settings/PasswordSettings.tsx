import Card from "../ui/Card";
import CardBody from "../ui/CardBody";
import CardTitle from "../ui/CardTitle";

interface PasswordSettingsTypes {

};

const PasswordSettings: React.FC<PasswordSettingsTypes> = ({
    
}) => {
    return (
        <Card>
            <CardTitle title={"Password"} />
            <CardBody>
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
            </CardBody>
        </Card>
    )
};

export default PasswordSettings;