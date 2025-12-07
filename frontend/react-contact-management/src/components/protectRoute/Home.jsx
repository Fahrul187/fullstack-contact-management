import { useLocalStorage } from "react-use";
import { Navigate } from "react-router";

export default function Home() {
    const [token] = useLocalStorage("token", "");

    if (token) {
        // Jika ada token, arahkan ke dashboard
        return <Navigate to="/dashboard/contacts" replace />;
    }

    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/login" replace />;
}