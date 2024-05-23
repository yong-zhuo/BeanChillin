"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import { bioFields } from "@/constants/formFields";
import { fieldState } from "@/types/formFieldsState";
import { useState } from "react";

const fields = bioFields;

let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const BioForm = () => {
    const [profileState, setProfileState] = useState(fieldsState);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setProfileState({ ...setProfileState, [e.target.name]: e.target.value });

    const handleClick = () => document.getElementById('upload')?.click();
    return (
        <>
            <Header
                heading="Customise your profile"
                paragraph="Enter your registered email address to reset your password"
            />
            {fields.map((field) => (
                <FormInput
                    key={field.id}
                    handleChange={handleChange}
                    value={profileState[field.id]}
                    labelText={field.labelText}
                    name={field.name}
                    id={field.id}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                    forRegister={field.forRegister}
                    height={50}
                ></FormInput>
            ))}
        </>
    );
};

export default BioForm;