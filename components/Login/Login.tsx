import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";

export default function Login() {
    return (
        <div className = "flex w-full hscreen">
            <LoginLeft />
            <LoginRight />
        </div>
    )
}