const loginFields = [
    {
        labelText:"Email",
        id:"Email",
        name:"Email",
        type:"email",
        placeholder:"e.g. bean@chillin.com",
        isRequired:true

    },
    {
        labelText:"Password",
        id:"Password",
        name:"Password",
        type:"password",
        placeholder:"••••••••",
        isRequired:true

    }
]

const signupFields = [
    
    {
        labelText:"Email",
        id:"email-address",
        name:"email",
        type:"email",
        isRequired:true,
        placeholder:"Enter email address"   
    },
    {
        labelText:"Password",
        id:"password",
        name:"password",
        type:"password",
        isRequired:true,
        placeholder:"Enter password"   
    },
    {
        labelText:"Confirm Password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        isRequired:true,
        placeholder:"Confirm password"   
    }
]

export {loginFields, signupFields}