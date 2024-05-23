const loginFields = [
    {
        labelText: "Email",
        id: "email",
        name: "email",
        type: "email",
        placeholder: "e.g. bean@chillin.com",
        isRequired: true

    },
    {
        labelText: "Password",
        id: "password",
        name: "password",
        type: "password",
        placeholder: "••••••••",
        isRequired: true

    }
]

const signupFields = [

    {
        labelText: "Email",
        id: "email",
        name: "email",
        type: "email",
        isRequired: true,
        placeholder: "Enter email address",
        forRegister: true
    },
    {
        labelText: "Password",
        id: "password",
        name: "password",
        type: "password",
        isRequired: true,
        placeholder: "Enter password",
        forRegister: true
    },
    {
        labelText: "Confirm Password",
        id: "confirm-password",
        name: "confirm-password",
        type: "password",
        isRequired: true,
        placeholder: "Confirm password",
        forRegister: true
    }
]

export { loginFields, signupFields }