import { useEffect,useState } from "react";

const useRestaurant = (resId,RES_MENU_URL)=>{

    // store the current resturant data from the api 
    const [restaurant,setRestaurant]=useState(null)

    // store the current resturants menu items 
    const [menuItems,setMenuItems]=useState([]);

    useEffect(()=>{
        // call getRestaurantInfo function so it fetch api data and set data in restaurant state variable
        getResturantInfo();
    },[]);

    async function getResturantInfo(){

        try{

            const data = await fetch(RES_MENU_URL+resId);

            const json= await data.json();


            console.log(json);

            // Set restaurant data
            const restaurantData = json?.data?.cards?.map(x => x.card)?.
                                    find(x => x && x.card['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant")?.card?.info || null;

            setRestaurant(restaurantData); 

            console.log( "This is restaurantData " + restaurantData);

            // Set menu item data
            const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
                                  groupedCard?.cardGroupMap?.REGULAR?.
                                  cards?.map(x => x.card?.card)?.
                                  filter(x=> x['@type'] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")?.
                                  map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];


            const uniqueMenuItems = [];

            menuItemsData.forEach((item) => {
                if (!uniqueMenuItems.find(x => x.id === item.id)) {
                    uniqueMenuItems.push(item);
                }
            })

            setMenuItems(uniqueMenuItems);
            
        }
        catch(e){
            setMenuItems([]);
            setRestaurant(null);
            console.log(e);
        }
    
    }

    return [restaurant,menuItems];

};

export default useRestaurant;