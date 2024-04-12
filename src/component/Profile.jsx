import { useEffect , useState } from "react";

const Profile = (props) => {

  const [count,setCount]=useState(0);

  useEffect(()=>{

    const timer=setInterval(()=>{
      console.log("setInterval of funcitonal comp");
    },1000)

    console.log("useEffect of functional Comp");

    // used to unmount in functional component
    // clear all the things
    return ()=>{
      clearInterval(timer);
      console.log("useEffect return of functional comp");
    }

  },[]);

  console.log("this is render of functional compoenent"+props.dummy)
  return (
    <div>
      <h1>This is profile component</h1>
      <h4>Name : {props.name}</h4>
    </div>
  );
};

export default Profile;
