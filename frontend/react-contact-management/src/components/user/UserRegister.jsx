import { useState } from "react"
import { alertError, alertSuccess } from "../../lib/alert.js";
import { userRegister } from "../../lib/api/UserApi.js";
import { Link, useNavigate } from "react-router";
import Input from "../common/Input.jsx";

export default function UserRegister() {

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            await alertError("Password don't match");
            return;
        }

        const response = await userRegister({
            username: username,
            password: password,
            name: name  
        });
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            await alertSuccess("User created successfully");
            await navigate({
                pathname: "/login"
            });
        } else {
            await alertError(responseBody.errors);
        }
    }

    return <>
        <div className="animate-fade-in bg-gray-800/80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
            <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient rounded-full mb-4">
                    <i className="fas fa-user-plus text-3xl text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Contact Management</h1>
                <p className="text-gray-300 mt-2">Create a new account</p>
            </div>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Username"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Choose a username"
                    required
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    iconClass="fas fa-user text-gray-500"
                />

                <Input
                    label="Full Name"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    value={name} onChange={(e) => setName(e.target.value)}
                    iconClass="fas fa-id-card text-gray-500"
                />
                
                <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    iconClass="fas fa-lock text-gray-500"
                />
                
                <Input
                    label="Confirm Password"
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    iconClass="fas fa-check-double text-gray-500"
                />
                <div className="mb-6">
                    <button type="submit" className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                        <i className="fas fa-user-plus mr-2" /> Register
                    </button>
                </div>
                <div className="text-center text-sm text-gray-400">
                    Already have an account?
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Sign in</Link>
                </div>
            </form>
        </div>
    </>
}