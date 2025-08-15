import { useState } from "react";
import Card from "../ui/Card";
import CardBody from "../ui/CardBody";
import CardTitle from "../ui/CardTitle";

interface PasswordSettingsTypes {
    handleUpdatePsswrd: (oldPsswrd: string, newPsswrd: string) => void;
    setNotification: (message: string | null) => void
};

const PasswordSettings: React.FC<PasswordSettingsTypes> = ({
    handleUpdatePsswrd,
    setNotification,
}) => {
    const initialState = { password: "", newPassword: "", confirmPassword: "" };
    const [psswrd, setPsswrd] = useState(initialState);
    const [errors, setErrors] =useState({
        password: false,
        newPassword: false,
        confirmPassword: false,
    });

    const isSamePassword = (newPasswrod: string, confirmPassword: string) => {
        if (newPasswrod == confirmPassword) {
            return true
        } else {
            setNotification("Passwords do not match!");
            return false
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPsswrd((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        const newErros = {
            password: !psswrd.password,
            newPassword: !psswrd.newPassword || !isSamePassword(psswrd.newPassword, psswrd.confirmPassword),
            confirmPassword: !psswrd.confirmPassword || !isSamePassword(psswrd.newPassword, psswrd.confirmPassword),
        };
        setErrors(newErros);
        const hasErrors = Object.values(newErros).some(Boolean);
        if (hasErrors) return;

        handleUpdatePsswrd(psswrd.password, psswrd.newPassword); 
        setPsswrd(initialState);
    };

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
                        placeholder="Enter password"
                        value={psswrd.password}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className={`w-full px-4.5 h-12 rounded-full text-sm outline-none transition-colors border-[1.5px] placeholder:text-neutral-300 pr-14 ${
                            errors.password
                            ? "border-red-300 hover:border-red-500 focus:border-red-500" 
                            : "border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300"
                        }`}
                    />
                </div>
                <div className="flex w-full gap-4 justify-between">
                    <div className="relative text-xs w-full">
                        <div className="absolute flex -top-2 font-medium leading-none w-full px-4.5 justify-between">
                            <label htmlFor="newPassword" className="block px-1 text-primary/90 font-normal bg-card">
                            New Password
                            </label>
                        </div>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={psswrd.newPassword}
                            onChange={handleInputChange}
                            required
                            autoComplete="off"
                            className={`w-full px-4.5 h-12 rounded-full text-sm outline-none transition-colors border-[1.5px] placeholder:text-neutral-300 pr-14 ${
                                errors.newPassword
                                ? "border-red-300 hover:border-red-500 focus:border-red-500" 
                                : "border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300"
                            }`}
                        />
                    </div>
                    <div className="relative text-xs w-full">
                        <div className="absolute flex -top-2 font-medium leading-none w-full px-4.5 justify-between">
                            <label htmlFor="confirmPassword" className="block px-1 font-normal text-primary/90 bg-card">
                            Confirm New Password
                            </label>
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={psswrd.confirmPassword}
                            onChange={handleInputChange}
                            required
                            autoComplete="off"
                            className={`w-full px-4.5 h-12 rounded-full text-sm outline-none transition-colors border-[1.5px] placeholder:text-neutral-300 pr-14 ${
                                errors.confirmPassword
                                ? "border-red-300 hover:border-red-500 focus:border-red-500" 
                                : "border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300"
                            }`}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleSubmit} 
                    className="px-7 h-12 rounded-full text-sm max-w-fit bg-primary text-white cursor-pointer hover:bg-primary/90"
                >Update Password</button>
            </CardBody>
        </Card>
    )
};

export default PasswordSettings;