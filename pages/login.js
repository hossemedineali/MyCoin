import Loginform from "../components/ui/coinidui/logform/loginform";

import { useSelector } from "react-redux";
import SignUpForm from "../components/ui/coinidui/logform/signupfom";

const LogIn = () => {

    const mode =useSelector(state=>state.auth.mode)
    return ( 
    
    <>
    {mode=='signin'&&<Loginform type={'redirect'}/>}
        {mode=='signup'&&<SignUpForm type={'redirect'}/>}
    </>

        );
}
 
export default LogIn;