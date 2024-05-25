"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
const Stepper = (props: { step: number }) => {
  const index = props.step;
  const steps = [
    "Customise your profile",
    "Tell us about yourself",
    "Welcome to BeanChillin",
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  return (
    <div className="flex justify-between">
      {steps?.map((step, i) => (
        <div
          key={i}
          className={`step-item ${index === i + 1 && "active"} ${
            (i + 1 < index || complete) && "complete"
          } `}
        >
          <div className="step">
            {i + 1 < currentStep || complete ? <Check size={24} /> : i + 1}
          </div>
          <p className="font-bold text-gray-500">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
