import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Footer=()=>{
    const {user} = useContext(UserContext);

    return (
      <div className="p-10 bg-purple-900 flex justify-center">
          <h1 className="text-white text-xl">Made with ❤ by {user.name} </h1>
      </div>
    );
}

export default Footer;
