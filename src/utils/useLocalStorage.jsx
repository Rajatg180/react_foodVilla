
import { useEffect,useState } from "react";


const useLocalStorage = (key) =>{
   // Get the item from localStorage and ensure it's neither null nor "undefined"
   const getItem = () => {
        const item = localStorage.getItem(key);
        return item && item !== "undefined" ? JSON.parse(item) : null;
    };

    // initial value of localStorage 
    const [getLocalStorage,setLocalStorageValue] = useState(getItem);

    useEffect(()=>{
        setLocalStorageValue(getItem);
    },[key]);

    // set value in localStorage
    const setLocalStorage = (value) =>{
        try{
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            localStorage.setItem(key, JSON.stringify(valueToStore));
            setLocalStorageValue(valueToStore);
        }
        catch(err){
            console.error(err);
        }
    }

    //  clear value of localStorage
    const  clearLocalStorage = () =>{
        localStorage.removeItem(key);
        setLocalStorageValue(null);
    }

    return [getLocalStorage,setLocalStorage,clearLocalStorage];

}


export default useLocalStorage;
