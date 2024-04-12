import { useEffect ,useState } from "react";
import { useParams } from "react-router-dom";
import { MenuShimmer } from "./shimmer";
import { ITEM_IMG_CDN_URL , IMG_CDN_URL , RES_MENU_URL } from "../config";
import useRestaurant from "../utils/useRestaurant";

const ResturantMenu=()=>{

    // read params from the url
    const params=useParams();

    // Destructuring 
    const {id}=useParams();

    // this is hook which we have created to get the current resturant menu 
    const [restaurant,menuItems]=useRestaurant(id,RES_MENU_URL);

    return !restaurant ? (
          <MenuShimmer />
        ) : (
          <div className="md:flex px-10 py-10">
          <div className="shadow-lg h-[400px] w-full md:w-[600px] bg-slate-200 p-5">
            <img 
              className="bg-cover w-auto h-[300px]"
              src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
              alt={restaurant?.name}
            />
            <div className="flex justify-between">
              <h2 className="font-bold text-red-900">{restaurant?.name}</h2>
              <p className="text-orange-500">{restaurant?.cuisines?.join(", ")}</p>
              <div className={`${parseFloat(restaurant?.avgRating) < 4 ? 'text-red-600' : 'text-green-600'} `}>
                {restaurant?.avgRating}
              </div>
            </div>
          </div>
        
          <div className="md:pl-8">
            <div className="flex justify-between pb-8 sm:pt-10">
              <h3 className="text-xl">Recommended</h3>
              <p className="bg-sky-600 p-2 rounded-md text-white shadow-lg">
                {menuItems.length} ITEMS
              </p>
            </div>
            <div className="">
              {menuItems.map((item) => (
                <div className="mb-30 rounded-lg p-5 shadow-md" key={item?.id}>
                  <div className="">
                    <h3 className="text-pink-800 text-xl font-bold">{item?.name}</h3>
                    <p className="text-md text-red-800 ">
                      {item?.price > 0
                        ? new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(item?.price / 100)
                        : " "}
                    </p>
                    <p className="item-desc">{item?.description}</p>
                  </div>
                  <div className="flex justify-start">
                    {item?.imageId && (
                      <img
                        className="bg-cover w-auto h-[200px] shadow-md rounded-md"
                        src={ITEM_IMG_CDN_URL + item?.imageId}
                        alt={item?.name}
                      />
                    )}
                    <div className="flex flex-col justify-end ml-4">
                      <button className="bg-sky-600 p-1 rounded-md text-white shadow-lg "> ADD +</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      );
}

export default ResturantMenu;