import { Navigate } from "react-router";
import { useLocalStorage } from "react-use";
// import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const [token] = useLocalStorage("token", "");

    if (!token) {
        // Jika tidak ada token, arahkan ke halaman login
        return <Navigate to="/login" replace />;
    }

    // Jika ada token, tampilkan komponen yang diminta
    return children;
}