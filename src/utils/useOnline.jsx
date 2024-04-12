
import {useState,useEffect} from "react";

const useOnline=()=>{
    
    const [isOnline,setIsOnline]=useState(true);


    useEffect(()=>{

        const handleOnline = ()=>{
            setIsOnline(true);
        }

        const handleOffline = ()=>{
            setIsOnline(false);
        }

        window.addEventListener("online",handleOnline);

        window.addEventListener("offline",handleOffline);


        // clearing all events when we are moving from one page to another page

        return ()=>{
            window.removeEventListener("online",handleOnline);
            window.removeEventListener("offline",handleOffline);
        };

    },[]);

    
    return isOnline;
    
}

export default useOnline;
