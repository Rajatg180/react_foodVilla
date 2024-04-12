import { useRouteError } from "react-router-dom";


const Error = ()=>{
    // const error = useRouteError();

    // Destructure
    const {data,status,statusText}=useRouteError();
    
    return (
        <div>
            <h1>Oooopsss!!!</h1>
            <h2>{data + " " + status + " " + statusText}</h2>
        </div>
    );
}

export default Error;