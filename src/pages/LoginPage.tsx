import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import LeftPanel from "../components/auth/LeftPanel";
import HeaderAuth from "../components/auth/HeaderAuth";
import GoogleButton from "../components/auth/GoogleButton";
import SubmitButton from "../components/auth/SubmitButton";

const LoginPage = () => {
	const { login } = useAuth();

	const [formValues, handleInputChange] = useForm({
		email: "",
		password: "",
	});

	const { email, password } = formValues;

	const handleLogin = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		
		login(email, password);
	};

	return (
		<div className="flex w-full min-h-screen bg-background">
			<LeftPanel />

			<div className="flex flex-col w-full lg:w-2/4 items-center justify-center px-6 lg:px-20">
				<div className="w-full max-w-sm mx-auto lg:w-96">
					<HeaderAuth 
						data={{
							title: "Log in to your account",
							subtitle: "Not a member?",
							url: "/signup",
							alternative: "Create an account"
						}}
					/>

					<div className="mt-10">
						<div>
							<form method="POST" className="space-y-6" onSubmit={handleLogin}>
								<div className="relative text-xs">
									<div className="absolute -top-2 px-4.5">
										<label htmlFor="email" className="block px-1 font-medium leading-none text-primary/70 bg-background ">
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
									<div className="absolute flex -top-2 font-medium leading-none w-full px-4.5 justify-between">
										<label htmlFor="password" className="block px-1 text-primary/70 bg-background ">
										Password
										</label>
										<a href="#" className="px-1 text-primary/90 bg-background hover:underline">
										Forgot password?
										</a>
									</div>
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										placeholder="password"
										value={password}
										onChange={handleInputChange}
										required
										className="block w-full rounded-md border-2 px-5 py-3 text-primary font-medium placeholder:font-normal placeholder:text-primary/50 sm:text-sm sm:leading-6"
									/>
								</div>

								<div>
									<SubmitButton text="Log in" />
								</div>
							</form>
						</div>
					
						<div>
							<GoogleButton text="Log in with Google"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;