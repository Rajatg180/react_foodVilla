
import { useEffect,useContext } from "react";
import Logo from "../assets/img/foodVilla.png";
import useOnline from "../utils/useOnline";
import {Link} from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage";
import useAuth from "../utils/useAuth";
import UserContext from "../utils/UserContext";

export const Title = () => {
  return (
    <Link href="/">
      <img
        alt="logo"
        src={Logo}
        className="w-50 px-5 py-2"
      ></img>
    </Link>
  );
};

export const HeaderComponent = () => {

  // call custom hook useLocalStorage for getting localStorage value of user 
  const [getLocalStorage,clearLocalStorage] = useLocalStorage("user");

  // call custom hook for user is loggedin or not 
  const [isLoggedin,setIsLoggedin] = useAuth();

  useEffect(()=>{
    if(getLocalStorage == null){
      setIsLoggedin(false);
    }
  },[getLocalStorage]);

  // call custom hook to get online or not 
  const isOnline = useOnline();


  // using UserContext which we have created  
  // destructuring
  const {user}=useContext(UserContext);


  return (
    <div className="sm:flex bg-purple-900 justify-between shadow-lg">
      <Title />
      <div>
        <ul className="sm:flex  py-10">
          <Link to="/">
             <li className="px-2 text-white text-xl underline" >Home</li>
          </Link>
          <Link to="/about">
             <li className="px-2 text-white text-xl underline" >About</li>
          </Link>
          <li className="px-2 text-white text-xl underline">
            <Link to="/contact">
              Contact
            </Link>
          </li>
          <Link to="/instamart">
            <li className="px-2 text-white text-xl underline" >InstaMart</li>
          </Link>
          <li className="px-2 text-white text-xl">Cart - 4 Items</li>
        </ul>
      </div>
      <h1 className="py-10">{isLoggedin ? "🟢" : "🔴"}</h1>
      <h1 className="py-10 text-xl font-semibold text-white">{user.name}</h1>
      {isLoggedin ? (
        <button
          onClick={() => {
            setIsLoggedin(false);
            clearLocalStorage();
          }}
          className="text-white underline text-xl"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => {
            setIsLoggedin(true);
          }}
          className="text-white underline text-xl"
        >
          Login
        </button>
      )}
    </div>
  );
};

/*
  - what is difference between js expression and statement ---> in react the only js expression works not statement

*/
