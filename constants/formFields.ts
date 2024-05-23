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

const profileFields = [

    {
        labelText: "First Name",
        id: "first-name",
        name: "first-name",
        type: "first-name",
        isRequired: true,
        placeholder: "John",
        forRegister: true
    },
    {
        labelText: "Last Name",
        id: "last-name",
        name: "last-name",
        type: "last-name",
        isRequired: true,
        placeholder: "Doe",
        forRegister: true
    },
]

const bioFields = [

    {
        labelText: "Bio",
        id: "bio",
        name: "bio",
        type: "bio",
        isRequired: true,
        placeholder: "Add a short description of yourself",
        forRegister: true
    },
]

export { loginFields, signupFields, profileFields, bioFields }