import { createContext } from "react";

// creating usercontext which will provide data to all component in react app
const UserContext =  createContext({
    user:{
        name:"Dummy Name",
        email:"dummy@gmail.com"
    }
})

// react tool do not track context  so to track it we can use
UserContext.displayName="UserContext";


export default UserContext;