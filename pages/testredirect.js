import axios from "axios";

        
        
        
        
        
const TestRedirect = () => {

   axios({
    method:'get',
    url:'/api/testredir'
   }).then(res=>{
    console.log(res)
   })
 return ( <h1>Redirect</h1> );

}
        
export default TestRedirect;