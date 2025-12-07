import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { userLogin } from "../../lib/api/UserApi.js";
import { alertError } from "../../lib/alert.js";
import { useLocalStorage } from "react-use";
import Input from "../common/Input.jsx";

export default function UserLogin() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [_, setToken] = useLocalStorage("token", "")

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await userLogin({ username, password });
        const responseBody = await response.json();
        console.log(responseBody);


        if (response.status === 200) {
            const token = responseBody.data.token;
            setToken(token);
            await navigate({
                pathname: "/dashboard/contacts"
            });
        } else {
            await alertError(responseBody.errors);
        }
    }

    return <>
        <div className="animate-fade-in bg-gray-800/80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
            <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient rounded-full mb-4">
                    <i className="fas fa-address-book text-3xl text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Contact Management</h1>
                <p className="text-gray-300 mt-2">Sign in to your account</p>
            </div>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Username"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    iconClass="fas fa-user text-gray-500"
                />

                <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    iconClass="fas fa-lock text-gray-500"
                />
                <div className="mb-6">
                    <button type="submit" className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                        <i className="fas fa-sign-in-alt mr-2" /> Sign In
                    </button>
                </div>
                <div className="text-center text-sm text-gray-400">
                    Don't have an account?
                    <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Sign up</Link>
                </div>
            </form>
        </div>

    </>
}