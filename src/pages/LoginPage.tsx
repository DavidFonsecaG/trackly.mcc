import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

const LoginPage = () => {

	const [formValues, handleInputChange] = useForm({
		email: "",
		password: "",
	});

	const { email, password } = formValues;

	const handleLogin = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		console.log(email, password);
	};

	return (
		<div className="flex w-full min-h-screen bg-background">
			<div className="hidden w-2/4 lg:block p-4">
				<div className="flex flex-col h-full w-full bg-primary rounded-3xl text-white p-8">
					<Link to="/" className="flex gap-3 text-2xl items-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-card" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
						<span>Trackly</span>
					</Link>
					<div className="flex flex-col w-full h-full items-center justify-center text-center p-4">
						<div className="rounded-xl mb-4">
							<img className="rounded-xl" src="cover-1.png" alt="cover" />
						</div>
						<span className="text-xl">The easiest way to manage your <br/> student's applications.</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col w-2/4 items-center justify-center sm:px-6  lg:px-20">
				<div className="w-full max-w-sm mx-auto lg:w-96">
					<div className="text-center">
						<div className="flex mb-4 items-center justify-center">
							<Link to="/" className="flex size-10 rounded-full bg-primary items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-card" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
							</Link>
						</div>
						<h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
						<p className="mt-2 text-sm leading-6 text-primary/50">
							Not a member?{" "}
							<Link
							to={"/signup"}
							className="font-semibold leading-6 text-primary hover:text-primary/70"
							>
							Create an account
							</Link>
						</p>
					</div>

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
										autoComplete="password"
										placeholder="password"
										value={password}
										onChange={handleInputChange}
										required
										className="block w-full rounded-md border-2 px-5 py-3 text-primary font-medium placeholder:font-normal placeholder:text-primary/50 sm:text-sm sm:leading-6"
									/>
								</div>

								<div>
									<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-primary p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90 cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
									>
									Log in
									</button>
								</div>
							</form>
						</div>
					
						<div className="">
							<div className="mt-6 ">
							<Link
								to="/auth/google"
								className="flex w-full items-center	justify-center gap-3 rounded-md bg-primary/10 p-3 text-primary cursor-pointer hover:bg-primary/20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500"
							>
								<svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" ><path d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z" fill="#4285F4"></path><path d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z" fill="#34A853"></path><path d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z" fill="#FBBC05"></path><path d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z" fill="#EA4335"></path></svg>
								<span className="text-sm font-semibold leading-6">Log in with Google</span>
							</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;