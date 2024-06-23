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

const forgetFields = [
    {
        labelText: "Email",
        id:"email",
        name:"email",
        type:"email",
        placeholder:"bean@chillin.com",
        forRegister: true
    }
]

const resetFields = [
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
        placeholder: "John",
        forRegister: false
    },
    {
        labelText: "Last Name",
        id: "lastName",
        name: "lastName",
        type: "text",
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
        placeholder: "Add a short description of yourself",
        forRegister: false
    },
]

const createGroupFields = [
    {
        labelText: "Group Name",
        id: "name",
        name: "name",
        type: "text",
        placeholder: "Enter group name",
        forRegister: true
    },
    {
        labelText: "Group Description",
        id: "description",
        name: "description",
        type: "text",
        placeholder: "Enter group description",
        forRegister: true
    }

]

const SettingsField = [
    {
        labelText: "First Name",
        id: "firstName",
        name: "firstName",
        type: "text",
        placeholder: "John",
        forRegister: false
    },
    {
        labelText: "Last Name",
        id: "lastName",
        name: "lastName",
        type: "text",
        placeholder: "Doe",
        forRegister: false
    },
    {
        labelText: "Bio",
        id: "bio",
        name: "bio",
        type: "text",
        placeholder: "Add a short description of yourself",
        forRegister: false
    },

]

export { loginFields, signupFields, forgetFields, profileFields, bioFields, resetFields, createGroupFields, SettingsField }