const loginFields = [
    {
        labelText: "Email",
        id: "email",
        name: "email",
        type: "email",
        placeholder: "e.g. bean@chillin.com",
        

    },
    {
        labelText: "Password",
        id: "password",
        name: "password",
        type: "password",
        placeholder: "••••••••",
        

    }
]

const signupFields = [

    {
        labelText: "Email",
        id: "email",
        name: "email",
        type: "email",
        placeholder: "Enter email address",
        forRegister: true
    },
    {
        labelText: "Password",
        id: "password",
        name: "password",
        type: "password",
        placeholder: "Enter password",
        forRegister: true
    },
    {
        labelText: "Confirm Password",
        id: "confirm",
        name: "confirm",
        type: "password",
        placeholder: "Confirm password",
        forRegister: true
    }
]

const profileFields = [

    {
        labelText: "First Name",
        id: "firstName",
        name: "firstName",
        type: "text",
        isRequired: true,
        placeholder: "John",
        forRegister: false
    },
    {
        labelText: "Last Name",
        id: "lastName",
        name: "lastName",
        type: "text",
        isRequired: true,
        placeholder: "Doe",
        forRegister: false
    },
]

const bioFields = [

    {
        labelText: "Bio",
        id: "bio",
        name: "bio",
        type: "text",
        isRequired: true,
        placeholder: "Add a short description of yourself",
        forRegister: false
    },
]

export { loginFields, signupFields, profileFields, bioFields }