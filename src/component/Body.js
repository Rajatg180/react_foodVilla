import RestrauntCard from "./RestaurantCard.js";
import { useState, useEffect,useContext } from "react";
import Shimmer from "./shimmer.js";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { filterData } from "../utils/Helper.js";
import useOnline from "../utils/useOnline.jsx";
import UserContext from "../utils/UserContext.jsx";



const Body = () => {
  // searchText is a local state variable 
  // React only keep track of state variable 
  const [searchText, setsearchText] = useState(""); //To create State variable
  const [allResturants, setAllResturants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // UserContext
  const {user,setUser}=useContext(UserContext);

  // empty dependency array -> once after render
  // [searchText] -> once after initial render + everytime after render (when my searchText changes)
  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://foodfire.onrender.com/api/restaurants?lat=18.6486772&lng=73.7592659&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);

    // initialize checkJsonData() function to check Swiggy Restaurant data
    async function checkJsonData(jsonData) {
      for (let i = 0; i < jsonData?.data?.cards.length; i++) {
        // initialize checkData for Swiggy Restaurant data
        let checkData =
          json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;

        // if checkData is not undefined then return it
        if (checkData !== undefined) {
          return checkData;
        }
      }
    }

    // call the checkJsonData() function which return Swiggy Restaurant data
    const resData = await checkJsonData(json);

    setAllResturants(resData);
    setFilteredRestaurants(resData);
  }

  // custom hook to get online / offline status
  const isOnline = useOnline();

  if(!isOnline){
    return (<h1>🔴You are offline check your internet connection once🔴</h1>)
  }

  //if restaurants is empty don't render restaurants cards --> early return
  if (!allResturants) return null;


  return allResturants.length === 0 ? (
    <Shimmer/>
    // This is done using react npm package 
    // <ShimmerSimpleGallery card imageHeight={300} caption />
  ) : (
    <>
      <div className="py-5 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 m-5 w-20 border-2 border-gray-300 rounded-md shadow-lg"
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
        />
        <button
          className="bg-orange-600 p-2 m-5 rounded-lg shadow-lg text-white"
          onClick={() => {
            // filter the data based on input
            // and update the state
            const data = filterData(searchText, allResturants);
            // update the data
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>

        {/* creating one more textfield to see how we can modify the value of UserContext from the Body component  */}
        <input className="p-2 m-5 w-10  border-gray-300 rounded-md shadow-lg" value={user.name} onChange={
          (e)=>{
            // changing the value of user
            setUser({
              name:e.target.value,
              email:"newrajatgore@gmail.com" 
            });
          }
        }>
        </input>

      </div> 
      <div className="flex flex-wrap justify-between px-10">
        {filteredRestaurants.map((restaurant, index) => {
          console.log("this is id of res "+restaurant?.info?.id);
          return (
            <Link to={"/restaurant/"+restaurant?.info?.id}>
                <RestrauntCard {...restaurant?.info} key={restaurant?.info?.id} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Body;
