import { useEffectOnce, useLocalStorage } from "react-use";
import { userLogout } from "../../lib/api/UserApi.js";
import { useNavigate } from "react-router";

export default function UserLogout() {

    const [token, setToken] = useLocalStorage("token", "");
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await userLogout(token);
        } catch (error) {
            console.error('Logout API failed', error);
            
        }

        setToken("");
        navigate("/login", { replace: true });
    }

    useEffectOnce(() => {
        handleLogout()
    })

    return null;
}