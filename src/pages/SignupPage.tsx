import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import LeftPanel from "../components/auth/LeftPanel";
import HeaderAuth from "../components/auth/HeaderAuth";
import GoogleButton from "../components/auth/GoogleButton";
import SubmitButton from "../components/auth/SubmitButton";

const SignupPage = () => {
    const { signup } = useAuth();

    const [formValues, handleInputChange] = useForm({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = formValues;

    const handleSignup = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        signup(name, email, password);
    };

    return (
        <div className="flex w-full h-dvh bg-background">
            <LeftPanel />

            <div className="flex flex-col w-full lg:w-2/4 items-center justify-center px-6 lg:px-20">
                <div className="w-full max-w-sm mx-auto lg:w-96">
                    <HeaderAuth 
						data={{
							title: "Create new account",
							subtitle: "Already have an account?",
							url: "/login",
							alternative: "Log in"
						}}
					/>

                    <div className="mt-10">
                        <div>
                            <form method="POST" className="space-y-6" onSubmit={handleSignup}>
                                <div className="relative text-xs">
                                    <div className="absolute -top-2 px-4.5">
                                        <label htmlFor="name" className="block px-1 font-medium leading-none text-primary/70 bg-background">
                                        Full name
                                        </label>
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="name"
                                        autoComplete="name"
                                        placeholder="Jamie Davis"
                                        value={name}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md border-2 px-5 py-3 text-primary font-medium placeholder:font-normal placeholder:text-primary/50 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div className="relative text-xs">
                                    <div className="absolute -top-2 px-4.5">
                                        <label htmlFor="email" className="block px-1 font-medium leading-none text-primary/70 bg-background">
                                        Email
                                        </label>
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="counselor@example.com"
                                        value={email}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md border-2 px-5 py-3 text-primary font-medium placeholder:font-normal placeholder:text-primary/50 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div className="relative text-xs">
                                    <div className="absolute -top-2 px-4.5">
                                        <label htmlFor="password" className="block px-1 font-medium leading-none text-primary/70 bg-background">
                                        Password
                                        </label>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="password"
                                        value={password}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md border-2 px-5 py-3 text-primary font-medium placeholder:font-normal placeholder:text-primary/50 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div>
                                    <SubmitButton text="Sign up" />
                                </div>
                            </form>
                        </div>
                    
						<div>
							<GoogleButton text="Sign up with Google"/>
						</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;