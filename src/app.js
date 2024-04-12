/*Parcel properties
 *
 *  HMR - hot module reloading
 * file watcher algorithm - C++ writen
 * Bundling
 * minify
 * cleaning our code
 * dev abd production build
 * super fast build algorithm
 * image optimization
 * caching while development
 * compression
 * compatable with older version of browser
 * HTTPS on dev
 * port number
 * consisten hashing algorithm
 * zero configuration
 * Tree Shaking - Removing unwanted code
 *
 *
 * node package manager take care of our Transitive dependencies(means one dependencies depend on other) of our code
 */

// browserlist make our code compactable to many browser  --> in package.json


const heading1 = React.createElement(
  "h1",
  { id: "title1", key: "h1" },
  "Hello world from h1"
);

const heading2 = createElement(
  "h2",
  { id: "title2", key: "h2" },
  "Hello world from h2"
);

// JSX (understood by the babel and convert it ) => React.createElement (understood by the React and convert it ) => Object => HTML(DOM)

// react element
const heading = (
  <h1 id="heading" key="h">
    "this is writen in jsx"
  </h1>
);


// React Component 
// 1)  Functional Component

// using react element in functional component
const Head = function (){
  return (
    <div>
      <h1>This is functional Component</h1>,
      {heading}
      {console.log("you can write any code in this")}
    </div>
  );
};


const Head1=()=>(
  <div>
    <h1>
      Namste react it is 
    </h1>
    <h2>
      This is H2 tag
    </h2>
  </div>
);

// using functional component  in functional component as tag 
const Head2 = function (){
  return (
    <div>
      <h1>This is functional Component</h1>,
      <Head1/> 
    </div>
  );
};

// or
/*  
const Head2 = function (){
  return (
    <div>
      <h1>This is functional Component</h1>,
      {Head1()}
    </div>
  );
};

*/

// or
/*  
const Head2 = function (){
  return (
    <div>
      <h1>This is functional Component</h1>,
      <Head></Head>
    </div>
  );
};

*/

const parent = createElement("div", { className: "parent" }, [
  heading1,
  heading2,
  heading,
  Head1(), // we need to execute it thats why we are using head() not only head
]);






// ************************************************************ Actual App ***************************************************


import React from "react";
import ReactDOM from "react-dom/client";

// Named Import 
import { createElement,useState } from "react";
import {Title,HeaderComponent} from "./component/Header";

// import { Title } from "./component/Header";
import * as Obj from './component/Header';
import { IMG_CDN_URL } from "./config";

// React Router package 
import { RouterProvider, createBrowserRouter , Outlet } from "react-router-dom";

// default import
import Body from "./component/Body";
import Footer from "./component/Footer";
import About from "./component/About";
import Error  from "./component/Error";
import Contact from "./component/Contact";
import ResturantMenu from "./component/RestaurantMenu";
import Profile from "./component/Profile";
import Shimmer from "./component/shimmer";

// importing UserContext
import UserContext from "./utils/UserContext";

// lazy loading 
import { lazy , Suspense} from "react";
// importing instamart as lazy loading 
const InstaMart = lazy(()=>import("./component/InstaMart"));
// upon on demand loading -> upon render -> react suspend loading 


// React Redux
import {Provider} from 'react-redux';
import store from "./utils/store";


const AppLayout =()=>{

  const [user,setUser]= useState({
    name:"Rajat Gore",
    email:"rajatgore@gmail.com"
  })

  return (
    <>
      {/* The <Provider> component makes the Redux store available to any nested components that need to access the Redux store. */}
      <Provider store={store}>
          {/* we have override the default value of UserContext by passing prop(value) in UserContext.provider*/}
          <UserContext.Provider value={{user:user,setUser:setUser}}>
            <HeaderComponent/>
            {/* children will come in outlet according to the route*/}
            <Outlet/>
            <Footer/>
          </UserContext.Provider>
      </Provider>
    </>
  );
}

// router configuration 
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<AppLayout/>,
    errorElement:<Error/>,
    children :[
      {
        path: "/",
        element:<Body/>
      },
      {
        path:'/about',  // here /about means from the root 
        element:<About/>,
        children:[
          {
            path:"profile", //here we have written "profile" only without "/" because it will be parents_path + current_path (ie.localhost:1234/about/profile) **  if we write "/profile" it will be (ie.localhost:1234/profile) 
            element:<Profile/>
          }
        ] 
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/restaurant/:id',
        element:<ResturantMenu/>
      },
      {
        path:'/instamart',
        element:(
          // Until the component do not get load it will show the Shimmer (fallback prop)
          <Suspense fallback={<Shimmer/>}>
            <InstaMart/>
          </Suspense>
        )
      }
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(parent);

// render functional component
// root.render(<AppLayout/>);

root.render(<RouterProvider router={appRouter} fallbackElement={<parent/>} />);



 


