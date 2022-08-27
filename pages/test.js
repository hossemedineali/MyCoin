
import {app} from "../firebaseconfig"
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import { Button, TextField } from "@mui/material"
import { Form } from "react-bootstrap"
import { Box } from "@mui/system"
import { useState } from "react"


const Test = () => {
    const auth=getAuth()
    const[formValues,setformValues]=useState({email:'', password:''})


    const onchangehandler=(e)=>{
      const {name,value}=e.target
      
        setformValues({...formValues,
          [name]:value
        })
       


    }

    const onSubmithundler=()=>{
      console.log('submit')
       async function sub(){
        await createUserWithEmailAndPassword(auth,formValues.email,formValues.password)
        .then((userCredential)=>{
          //res.status(200).json({...userCredential})
          console.log(userCredential.user)
          localStorage.setItem('token',userCredential.user.accessToken)

        })
        .catch((error)=>{
          //res.status(400).json({error})
        })
      }
     
      sub()
    }
    //createUserWithEmailAndPassword(auth,'test1@test.com','test123')
  return ( <Box>

  <form onSubmit={onSubmithundler}>
       <TextField
                  value={formValues.email}
                 
                 
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={onchangehandler}
                  onBlur={''}
                  onFocus={''}
                />

                <br/>
                <TextField
                  value={formValues.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={onchangehandler}
                 
                />


    <Button  onClick={onSubmithundler} > submit</Button>

    </form>
  </Box> );
}
 
export default Test; 