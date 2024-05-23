"use client"
import Button from "@/components/common-ui/button/Button";
import Header from "../common-ui/form/Header";

const WelcomePage = () => {

    return (
        <>
            <Header
                heading="Customise your profile"
                paragraph="Enter your registered email address to reset your password"
            />
            <div className="flex justify-center">
                <img src="/hi.png" alt="Welcome Image" height="500" width="500" />
            </div>
            <div className="flex justify-center">
                <Button
                    text="Start your journey now!"
                    action="submit"
                    addClass=" text-white bg-primary hover:bg-slate-400"
                />
            </div>
        </>
    );
};

export default WelcomePage;