

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ButtonBase } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import  {authActions} from '../../../Store/auth'
import { useDispatch } from "react-redux";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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



export default function Loginform( {type='backdrop'}) {
  const router=useRouter()
    const  dispatch=useDispatch()

    const[formValues,setformValues]=useState({email:'', password:''})
    const [error,seterror]=useState({email:false, password:false})
    const [formisvalid,setformisvalid]=useState(false)
    const [errorMessage,seterrorMessage]=useState('')

   
    
    const onchangehandler=(e)=>{
      const {name,value}=e.target
      
        setformValues({...formValues,
          [name]:value
        })
        seterror({...error,[name]:false})
    }

        const onblurhandler=(e)=>{
            
            if(formValues.email.trim().length>0||formValues.password.trim().length>0){
              setformisvalid(true)
            }else{setformisvalid(false)}
        }


        const   handleSubmit = async (event) => {
          event.preventDefault();
         
          Object.keys(formValues).forEach((key)=>{
            if(formValues[key]==''){
              seterror((prev)=>({...prev,[key]:true}))
              setformisvalid(false)
            }else{
              setformisvalid(true)
            }
          })
          if(formisvalid){
            await axios({
              method:'POST',
              url:'/api/signin',
              data:formValues
            }).then(function(response){
              console.log(response.data.user.emailVerified
                )
              dispatch(authActions.login())
             dispatch(authActions.setverified({isverified:response.data.user.emailVerified}))
              dispatch(authActions.setToeken({
                token:response.data.user.stsTokenManager.accessToken
              }))
              localStorage.setItem('MycoinToken',response.data.user.stsTokenManager.accessToken)
              localStorage.setItem('MYcoinuid',response.data.user.uid)
              if(type=='backdrop'){
                
                dispatch(authActions.toggleshow())
              }else{
                router.replace('/')
              }

              console.log('success response :',response)
              console.log('success response :',response.data.user.stsTokenManager)
            }).catch(function(error){
              console.log('failed response :',error)
              if(error.response.data.error.code=='auth/invalid-email'||error.response.data.error.code=='auth/wrong-password'){
                seterrorMessage('Invalid Email or Password ')
              }
            })
          }
          
        };


    const onclosehandler=()=>{
            dispatch(authActions.toggleshow())
            
    }

    const togglemodehandler=()=>{
        dispatch(authActions.togglemode())
    }
  return (
    

    
      <Container component="main" 
       sx={{width:{xs:'90vw',md:'50vw',lg:'35vw'},position:'relative'}}>
        {type=='redirect'&&<Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">Please Log In to continue</Alert>
    </Stack>}
        <CssBaseline />
       
       {type=='backdrop'&& <CloseIcon 
        onClick={onclosehandler}
        sx={{display:{xs:'flex',md:'none'},position:'absolute',right:15,top:-25,cursor:'pointer'}}/>}
       
        <Box
          sx={{marginTop: 8,  display: 'flex',  flexDirection: 'column',alignItems: 'center', }}
        >
          
            <Typography variant='h4'>Welcom</Typography>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
             value={formValues.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete= "false"
              autoFocus
              error={error.email}
              onChange={onchangehandler}
              onBlur={onblurhandler}
            />
            <TextField
              value={formValues.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={error.password}
              onChange={onchangehandler}
              onBlur={onblurhandler}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {errorMessage&&<Typography sx={{textAlign:'center',color:'red'}}>{errorMessage}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Typography  variant='p'>
                  "Don't have an account? <ButtonBase onClick={togglemodehandler}>sign Up</ButtonBase>"
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    
   
  );
}