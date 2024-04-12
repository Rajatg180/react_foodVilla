import React from "react";
import UserContext from "../utils/UserContext";

class Profile extends React.Component{

    // constructor is used for initialization
    constructor(props){
        // used to call the constructor of React.Component and pass props to the constructor 
        super(props);

        // why we need unMount 
        this.timer = setInterval(()=>{
            console.log("Namste react");
        },1000)

        // creating the state 
        this.state= {
            userInfo :{
                avatar_url:"nandna",
                name : "Dummy Name",
                location : "Ind",
                bio:"address"
            },
            userStatus:"Logged In"
        }

        console.log("child-constructor "+this.props.dummy);
    }

    async componentDidMount(){
        // best place to make api call 
        const data =  await fetch("https://api.github.com/users/Rajatg180");
        const json = await data.json();
        
        // updating the state 
        this.setState({
            userInfo : json
        });

        console.log("child-componentnDidMount "+this.props.dummy);
    }

    componentDidUpdate(){

        console.log("child-componentDidUpdate");

    }

    componentWillUnmount(){

        // clear the all stuff when we leave the page ---> best practise 
        clearInterval(this.timer);

        console.log("child-componentWillUnmount");
    }

    render(){
        console.log("child-render "+this.props.dummy);
        return (
            <div>
                <h1>Welcome Back, {this.props.dummy}</h1>
                <img src={this.state.userInfo.avatar_url}></img>

                {/* using UserContext */}
                <UserContext.Consumer>
                    {({user})=>(
                        <h1 className="border-2 border-red-100 m-10 p-5">
                            This is from UserContext -{user.name}
                        </h1>
                    )}
                </UserContext.Consumer>

                <h4>Name : {this.state.userInfo.name}</h4>
                <h4>Bio : {this.state.userInfo.bio}</h4>
                <h4>Location : {this.state.userInfo.location}</h4>
                <h4>Status : {this.state.userStatus}</h4>
                <button onClick={()=>{
                    // we do not mutate state directly
                    // updating the state 
                    this.setState({userStatus:"Logged Out"})
                }}>Change user status</button>
            </div> 
        );
    }
}

export default Profile;

/*

This is when we are using async operation in children componentnDidMount  method 
*lifecycle execution*

parent-constructor
parent-render
    child-constructor 
    child-render
parnet-componentDidMount 
    child-componentnDidMount  //it will take time to execute as it is async operation 
    child-render  // it will rerender dom because there is update in dom 
*/