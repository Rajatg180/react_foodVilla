import { Outlet } from "react-router-dom";
import ProfileComponent from "./Profile";
import Profile from "./ProfileClass";
import { Component } from "react";

class About extends Component{

    constructor(props){
        super(props);
        console.log("parent-constructor");
    }

    async componentDidMount(){
        // best place to make api call beacuse it will execute after render
        console.log("paret-componentDidMount")
    }

    render(){
        console.log("parent-render");
        return (
            <div>
                {/* <Outlet/> */}
                <ProfileComponent dummy={"functional component"}/>
                <Profile dummy={"Master 1"}/>
                {/* <Profile dummy={"Master 2"}/> */}
            </div>
        );
    }
}

export default About;


/*

This is normal execution when we are not using any async operation 
*lifecycle execution*

parent-constructor
parent-render
    child-constructor First child
    child-render First child
    child-constructor second child
    child-render second child
    child-componentnDidMount First child
    child-componentnDidMount second child
parnet-componentDidMount

*/