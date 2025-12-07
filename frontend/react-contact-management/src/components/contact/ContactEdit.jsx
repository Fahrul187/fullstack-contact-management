import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { contactDetail, contactUpdate } from "../../lib/api/ContactApi";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert";
import Input from "../common/Input";

export default function ContactEdit() {

    const [token, _] = useLocalStorage("token", "");
    const { id } = useParams();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    async function fetchContact() {
        const response = await contactDetail(token, id);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            setFirstName(responseBody.data.first_name);
            setLastName(responseBody.data.last_name);
            setEmail(responseBody.data.email);
            setPhone(responseBody.data.phone);
        } else {
            await alertError(responseBody.errors);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await contactUpdate(token, { id, first_name, last_name, email, phone });
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            await alertSuccess("Contact updated successfully");
            await navigate({
                pathname: `/dashboard/contacts`
            })
        } else {
            await alertError(responseBody.errors);
        }
    }

    useEffectOnce(() => {
        fetchContact()
            .then(() => console.log("Contact detail fatched successfully"));
    })

    return <>
        <div>
            <div className="flex items-center mb-6">
                <Link to="/dashboard/contacts" className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
                    <i className="fas fa-arrow-left mr-2" /> Back to Contacts
                </Link>
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <i className="fas fa-user-edit text-blue-400 mr-3" /> Edit Contact
                </h1>
            </div>
            <div className="bg-gray-800/80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
                <div className="p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <Input
                                label="First Name"
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="Enter first name"
                                required
                                value={first_name} onChange={(e) => setFirstName(e.target.value)}
                                iconClass="fas fa-user-tag text-gray-500"
                            />

                            <Input
                                label="Last Name"
                                type="text"
                                id="Last_name"
                                name="Last_name"
                                placeholder="Enter last name"
                                required
                                value={last_name} onChange={(e) => setLastName(e.target.value)}
                                iconClass="fas fa-user-tag text-gray-500"
                            />
                        </div>

                        <Input
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                            required
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            iconClass="fas fa-envelope text-gray-500"
                        />

                        <Input
                            label="Phone"
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            required
                            value={phone} onChange={(e) => setPhone(e.target.value)}
                            iconClass="fas fa-phone text-gray-500"
                        />

                        <div className="flex justify-end space-x-4">
                            <Link to="/dashboard/contacts" className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
                                <i className="fas fa-times mr-2" /> Cancel
                            </Link>
                            <button type="submit" className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                                <i className="fas fa-save mr-2" /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>
}