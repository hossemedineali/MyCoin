
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch } from "react-redux";

import {authActions} from '../../../Store/auth'
import { useState } from 'react';
import { validateConfig } from 'next/dist/server/config-shared';

function Copyright(props) {
   
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();




const initialstate={
  firstName:{
    name:'firstName',
    value:'',
    error:false,
    errorMessage:'',
    touched:false,
    isvalid:false
  },
  lastName:{
    name:'lastName',
    value:'',
    error:false,
    errorMessage:'',
    touched:false,
    isvalid:false
  },
  email:{
    name:'email',
    value:'',
    error:false,
    errorMessage:'',
    touched:false,
    isvalid:false
  },
  password:{
    name:'password',
    value:'',
    error:false,
    errorMessage:'',
    touched:false,
    isvalid:false
  },

  
}

export default function SignUpForm() {
    const dispatch=useDispatch();

    

    
    const[formValues,setformValues]=useState({firstName:{
      name:'firstName',
      value:'',
      error:false,
      errorMessage:'',
      touched:false,
      isvalid:false
    },
    lastName:{
      name:'lastName',
      value:'',
      error:false,
      errorMessage:'',
      touched:false,
      isvalid:false
    },
    email:{
      name:'email',
      value:'',
      error:false,
      errorMessage:'',
      touched:false,
      isvalid:false
    },
    password:{
      name:'password',
      value:'',
      error:false,
      errorMessage:'',
      touched:false,
      isvalid:false
    },})
    const [errorMessages,seterrorMessages]=useState({})
    

    //console.log(formValues)


    const onchangehandler=(e)=>{
      const {name,value}=e.target
      
        setformValues({...formValues,
          [name]:{
            ...formValues[name],
            value:value,
            touched:true,
            error:false
          }})
    }

    const onfocushandler=e=>{
      const {name}=e.target
      
      setformValues({...formValues,
        [name]:{
          ...formValues[name],touched:true
        }})
    }

    const onblurHandler=(e)=>{
      const {name,value}=e.target
      
      if(formValues[name].touched==true){
             verify(name,value)
    }}


    
    function handleSubmit(event) {
    event.preventDefault();
      if(formValues.firstName.value==''){
        console.log('first name empty')
        console.log(formValues)
        verify('firstName','')
        console.log(formValues)
      }
       if(formValues.lastName.value==''){
        console.log('lastname empty')
        console.log(formValues)
        verify('lastName','')
        console.log(formValues)
      }
       if(formValues.email.value==''){
        console.log('email empty')
      }
       if(formValues.password.value==''){
        console.log('password empty')
      }
  }


  const verify=(name,value)=>{

    if(name=='firstName'||name=='lastName'){

      console.log('verify first name or last name')
      const regex=/^[a-z ,.'-]+$/i;
      if(value==''){
        setformValues({...formValues,
          [name]:{
            ...formValues[name],
            errorMessage:'You must enter a ' +name,
            error:true,
            touched:false,
            isvalid:false
          }})
  
      } else if(value.length<3||value.length>10||!regex.test(value)){
  
        setformValues({...formValues,
          [name]:{
            ...formValues[name],
            errorMessage:name+" must contain 3 to 10 letters and can't have a special caracters or numbers",
            error:true,
            touched:false
          }})
      }else{
        setformValues({...formValues,
          [name]:{
            ...formValues[name],
            error:false,
            touched:false,
            isvalid:true
          }})
  
      }
   
  } else if(name=='email'){
    console.log(' verify email')
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(value==''){
      setformValues({...formValues,
      [name]:{
        ...formValues[name],
        errorMessage:'You must enter an' +name,
        error:true,
        touched:false,
        isvalid:false
      }
      })
    }else if (!regex.test(value)){
      setformValues({...formValues,
        [name]:{
          ...formValues[name],
          errorMessage:'Please Enter a valid email',
          error:true,
          touched:false
        }})
    }else{
      setformValues({...formValues,
        [name]:{
          ...formValues[name],
          error:false,
          touched:false,
          isvalid:true
        }})
    }
  }else if(name=='password'){
    console.log('verify password')
    const regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(value==''){
      setformValues({...formValues,
      [name]:{
        ...formValues[name],
        errorMessage:'You must enter a' +name,
        error:true,
        touched:false,
        isvalid:false
      }
      })
    }else if(!regex.test(value)){
      setformValues({...formValues,
        [name]:{
          ...formValues[name],
          errorMessage:name+' must have Minimum eight characters, at least one letter and one number',
          error:true,
          touched:false,
          isvalid:false
        }})
    }else{
      setformValues({...formValues,
        [name]:{
          ...formValues[name],
          errorMessage:'',
          error:false,
          touched:false,
          isvalid:true
        }})
    }
  
  }
  
  }

 

  const onclosehandler=()=>{
    dispatch(authActions.toggleshow())
    
}

  const togglemodehandler=()=>{
    dispatch(authActions.togglemode())
}  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" 
      sx={{width:{xs:'90vw',md:'50vw',lg:'35vw'},position:'relative'}}
      >
       <CloseIcon 
        onClick={onclosehandler}
        sx={{display:{xs:'flex',md:'none'},position:'absolute',right:15,top:-25,cursor:'pointer'}}/>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4' color={'black'}>Welcom</Typography>
          <Typography component="h1" variant="h5" color={'black'}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                
                <TextField
                  value={formValues.firstName.value}
                  error={formValues.firstName.error}
                  helperText={formValues.firstName.error && formValues.firstName.errorMessage}
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={onchangehandler}
                  onBlur={onblurHandler}
                  onFocus={onfocushandler}
                />
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formValues.lastName.value}
                  error={formValues.lastName.error}
                  helperText={formValues.lastName.error && formValues.lastName.errorMessage}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={onchangehandler}
                  onBlur={onblurHandler}
                  onFocus={onfocushandler}
                  
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={formValues.email.value}
                  error={formValues.email.error}
                  helperText={formValues.email.error && formValues.email.errorMessage}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={onchangehandler}
                  onBlur={onblurHandler}
                  onFocus={onfocushandler}
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={formValues.password.value}
                  error={formValues.password.error}
                  helperText={formValues.password.error && formValues.password.errorMessage}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={onchangehandler}
                  onBlur={onblurHandler}
                  onFocus={onfocushandler}
                />
              </Grid>
              <Grid item xs={12}>
                
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography  variant='p'color={'#999999'}>
                  " Already have an account? <ButtonBase onClick={togglemodehandler}>Sign in</ButtonBase>"
                </Typography>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}




/*

                              if(value==''){
                                setformValues({...formValues,
                                  [name]:{
                                    ...formValues[name],
                                    errorMessage:'You must enter a ' +name,
                                    error:true,
                                    touched:false
                                  }})
                              }else if(value.length<3||value.length>10){
                                setformValues({...formValues,
                                  [name]:{
                                    ...formValues[name],
                                    errorMessage:name+' must contain 3 to 10 letters',
                                    error:true,
                                    touched:false
                                  }})
                              }
*/




/*
---------------------------------------------------------
old functional onchange handler
-------------------------------------------------------------


const onblurHandler=(e)=>{
      const {name,value}=e.target
      console.log(name,' blured')
      if(formValues[name].touched==true){
              if (name=='email'&&value==''){
                setformValues({...formValues,
                  [name]:{
                    ...formValues[name],
                    errorMessage:'You must enter an ' +name,
                    error:true,
                    touched:false
                  }})
              } else if(value==''){
                setformValues({...formValues,
                  [name]:{
                    ...formValues[name],
                    errorMessage:'You must enter a ' +name,
                    error:true,
                    touched:false
                  }})
              }

              if(name=='firstName'||name=='lastName'){
                if(value.length<3||value.length>10){
                  setformValues({...formValues,
                    [name]:{
                      ...formValues[name],
                      errorMessage:name+' must contain 3 to 10 letters',
                      error:true,
                      touched:false
                    }})
                }
              }

              if(name=='email'){
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                if (!regex.test(value)){
                  setformValues({...formValues,
                    [name]:{
                      ...formValues[name],
                      errorMessage:'Please Enter a valid email',
                      error:true,
                      touched:false
                    }})
                }
              }

              if(name=='password'){
                const regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                if(!regex.test(value)){
                  setformValues({...formValues,
                    [name]:{
                      ...formValues[name],
                      errorMessage:name+' must have Minimum eight characters, at least one letter and one number',
                      error:true,
                      touched:false
                    }})
                }

              }
                            

                            
      
    }}

*/