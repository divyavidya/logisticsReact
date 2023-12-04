import { useNavigate } from "react-router";

function HomeComponent(){
    const navigate=useNavigate();
    return(
        navigate('/auth/login')
    
    )
}

export default HomeComponent;