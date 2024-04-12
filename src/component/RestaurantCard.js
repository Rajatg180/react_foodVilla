import { IMG_CDN_URL } from "../config";

// optional chaining = ?.

// props - > 1) props is object

// const RestrauntCard=(props)=>{
//   console.log(props.dummy);
//   return (
//     <div className="card">
//       <img src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" + props.restaurant.data?.cloudinaryImageId}></img>
//       <h2>{props.restaurant.data?.name}</h2>
//       <h3>{props.restaurant.data?.cuisines.join(", ")}</h3>
//       <h4>{props.restaurant.data?.lastMileTravelString} minutes</h4>
//     </div>
//   );
// }

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  sla,
  costForTwo,
  avgRatingString,
}) => {
  return (
    <div
      className="w-[200px] rounded-lg shadow-sm hover:shadow-lg p-2 hover:translate-y-1"
    >
      <img
        className="bg-cover w-max h-[200px] "
        src={IMG_CDN_URL + cloudinaryImageId}
        alt={name}
      />
      <h2 className="text-pink-500 text-center text-xl 	font-medium">{name}</h2>
      <h5 className="text-slate-600 text-center ">{cuisines.join(", ")}</h5>
      <h5 className="text-slate-600 text-center py-2" > Location : {areaName}</h5>
      <div className="text-center ">
        <h4
          className={`m-1 font-normal ${parseFloat(avgRatingString) < 4 ? 'text-red-600' : 'text-green-600'}`}
        >
          {avgRatingString + " Rating"}
        </h4>
        <h4 className="text-slate-600">
          {sla?.lastMileTravelString ?? "2.0 km"}
        </h4>
        <h4 className="text-slate-600">
          {costForTwo ?? "₹200 for two"}
        </h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
