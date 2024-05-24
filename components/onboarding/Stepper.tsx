import React from "react";

export default function Stepper() {
    const steps = ["one", "two", "three"];

    return (
        <div className="flex justify-between">
            {steps?.map((step, i) => (
                <div key={i} className="relative flex flex-col justify-center items-center w-2/6 before:content-[''] before:bg-slate-200 before:absolute before:w-full before:h-[3px]">
                    <div><p>Step {i + 1}</p></div>
                    <p className="text-gray-500">{step}</p>
                </div>
            ))}
        </div>
    );
}
