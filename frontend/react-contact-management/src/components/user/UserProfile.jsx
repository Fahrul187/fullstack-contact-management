import { useState } from "react"
import { userDetail, userUpdatePassword, userUpdateProfile } from "../../lib/api/UserApi.js";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert.js";
import Input from "../common/Input.jsx";

export default function UserProfile() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, _] = useLocalStorage("token", "");

    async function fetchUserDetail() {
        const response = await userDetail(token);
        const responseBody = await response.json();
        console.log(responseBody);

        if(response.status === 200){
            setName(responseBody.data.name);
        }else{
            await alertError(responseBody.errors);
        }
    }

    async function handleSubmitProfile(e) {
        e.preventDefault();
        const response = await userUpdateProfile(token, {name});
        const responseBody = await response.json();
        console.log(responseBody);

        if(response.status === 200) {
            await alertSuccess("Profile updated successfully");
        }else{
            await alertError(responseBody.errors);
        }
    }

    async function handleSubmitPassword(e) {
        e.preventDefault();

        if(password !== confirmPassword){
            await alertError("Passwords don't match");
            return;
        }

        const response = await userUpdatePassword(token, {password});
        const responseBody = await response.json();
        console.log(responseBody);

        if(response.status === 200) {
            setPassword('');
            setConfirmPassword('');
            await alertSuccess("Password updated successfully");
        }else{
            await alertError(responseBody.errors);
        }
    }

    useEffectOnce(() => {
        fetchUserDetail()
        .then(() => console.log("User detail fetched successfully"));
    })
    
    return <>
        <main className="container mx-auto px-4 py-8 flex-grow">
            <div className="flex items-center mb-6">
                <i className="fas fa-user-cog text-blue-400 text-2xl mr-3" />
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form 1: Edit Name */}
                <div className="bg-gray-800/80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-user-edit text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
                        </div>
                        <form onSubmit={handleSubmitProfile}>
                            <Input
                                label="Full Name"
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                iconClass="fas fa-user text-gray-500"
                            />
                            <div className="mt-6">
                                <button type="submit" className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center">
                                    <i className="fas fa-save mr-2" /> Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Form 2: Edit Password */}
                <div className="bg-gray-800/80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-key text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Change Password</h2>
                        </div>
                        <form onSubmit={handleSubmitPassword}>
                            <Input
                                label="New Password"
                                type="password"
                                id="new_password"
                                placeholder="Enter your new password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                iconClass="fas fa-lock text-gray-500"
                            />
                            <Input
                                label="Confirm New Password"
                                type="password"
                                id="confirm_password"
                                placeholder="Confirm your new password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                iconClass="fas fa-check-double text-gray-500"
                            />
                            <div className="mt-6">
                                <button type="submit" className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center">
                                    <i className="fas fa-key mr-2" /> Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>

    </>
}