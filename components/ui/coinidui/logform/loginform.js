
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ButtonBase, ClickAwayListener } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useSelect } from '@mui/base';

import {authActions} from '../../../Store/auth'
import { useDispatch } from "react-redux";
import Close from '@mui/icons-material/Close';
import { useState } from 'react';

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



export default function Loginform() {
    const  dispatch=useDispatch()

    const[formValues,setformValues]=useState({email:'', password:''})
    const [error,seterror]=useState({email:false, password:false})
    
 
  const handleSubmit = (event) => {
    event.preventDefault();

    Object.keys(formValues).forEach((key)=>{
      if(formValues[key]==''){
        seterror((prev)=>({...prev,[key]:true}))
      }
    })

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
        <CssBaseline />
        <CloseIcon 
        onClick={onclosehandler}
        sx={{display:{xs:'flex',md:'none'},position:'absolute',right:15,top:-25,cursor:'pointer'}}/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
            <Typography variant='h4'>Welcom</Typography>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
             
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete= {false}
              autoFocus
              error={error.email}
            />
            <TextField
           
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={error.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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