import Link from "next/link";

export default function LoginRight() {
    return (
        <div className="flex flex-row min-h-screen justify-center items-center bg-teal-700">
        <input className="block" type="text" />
        <input className="block" type="text" />
        <Link href="/forget-password">Forget password?</Link>
        <input type="button" value="Button" />
        </div>
    )
}