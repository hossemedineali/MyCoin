  import * as React from 'react';
  import Avatar from '@mui/material/Avatar';
  import Button from '@mui/material/Button';
  import CssBaseline from '@mui/material/CssBaseline';
  import TextField from '@mui/material/TextField';

  import Link from '@mui/material/Link';
  import Grid from '@mui/material/Grid';
  import Box from '@mui/material/Box';

  import Typography from '@mui/material/Typography';
  import Container from '@mui/material/Container';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import { ButtonBase } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';

  import { useDispatch, useSelector } from "react-redux";

  import {authActions} from '../../../Store/auth'
  import { useState } from 'react';

  import axios from 'axios';

  import { useRouter } from 'next/router'


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






  export default function SignUpForm({type='backdrop'}) {
      const dispatch=useDispatch();

      const router=useRouter();
        /* autState*/
        const isAuth=useSelector(state=>state.auth.isAuth)
        
      /* ================form  states=========================================== */
      const[formValues,setformValues]=useState({firstName:'', lastName:'',email:'', password:''})
      const [error,seterror]=useState({firstName:false, lastName:false,email:false, password:false})
      const [errorMessages,seterrorMessages]=useState({firstName:'', lastName:'',email:'', password:''})
      const [istouched, setistouched] = useState({firstName:false, lastName:false,email:false, password:false})
      const [isValid, setisValid] = useState({firstName:false, lastName:false,email:false, password:false})
      const [formisvalid,setformisvalid]= useState(false)
      const [submitResponse,setsubmitResponse]=useState()

  /*=========================onChangehandler===================================== */
      const onchangehandler=(e)=>{
        const {name,value}=e.target
        
          setformValues({...formValues,
            [name]:value
          })
          seterror({...error,[name]:false})
          setistouched({...istouched,[name]:true})

          

      }

      /* =========================== */
      const onfocushandler=e=>{
        const {name}=e.target
        setistouched({...istouched,[name]:true})
        
      }

      const  onblurHandler=async(e)=>{
        console.log('blur')
        const {name,value}=e.target
        
         if(istouched[name]==true){
              verify(name,value)
              setistouched({...istouched,[name]:false})
      } 
          verify(name,value)
      Object.keys(isValid).forEach((key,index)=>{
        if(isValid[key]){
          setformisvalid(true)
        }else{setformisvalid(false)}
      })

       

    }

      async function handleSubmit(event) {
        console.log('submit')
      event.preventDefault();
        const enteredFormValues={
          firstName:event.target.firstName.value,
          lastName:event.target.lastName.value,
          email:event.target.email.value,
          password:event.target.password.value
        }


        async function fetch  (){
            console.log('fetching ...')
          await axios({
            method:'post',
            url:'/api/signUp',
            data:enteredFormValues
          })
           .then((response)=>{
           
            dispatch(authActions.login())
              if(type=='backdrop'){
                dispatch(authActions.toggleshow())

              }

            dispatch(authActions.setToeken({
              token:response.data.user.stsTokenManager.accessToken
            }))
            dispatch(authActions.setToeken({
              token:response.data.user.uid
            }))
            localStorage.setItem('MYcoinuid',response.data.user.uid)
            localStorage.setItem('MycoinToken',response.data.user.stsTokenManager.accessToken)
            router.replace('/')
          }).catch( (error) =>{
            console.log('error')
            console.log(error)
            if(error.response.data.code=='auth/email-already-in-use'){
              setsubmitResponse('email already in use')
            }
             
          }) 
        }
        
      
      Object.keys(formValues).forEach((key,index)=>{
        
        if(formValues[key]==''){
          console.log('submit error while looping throw form values')
          seterrorMessages((prev)=>({...prev,[key]:'Please enter your '+ key}))
          seterror((prev)=>({...prev,[key]:true}))
          setformisvalid(false)
        }else {
          console.log('while looping throw vormvalues all is ok')
          setformisvalid (true)
          
        }
      }) 
      fetch()

                
                      }



                      //form  verification  function
                      const verify=(name,value)=>{

                        if(name=='firstName'||name=='lastName'){

                          
                          const regex=/^[a-z ,.'-]+$/i;
                          if(value==''){
                            seterrorMessages({...errorMessages,[name]:'please enter your ' +name})
                            seterror({...error,[name]:true})
                            setisValid({...isValid,[name]:false})
                      
                          } else if(value.length<3||value.length>10||!regex.test(value)){

                            seterrorMessages({...errorMessages,[name]:name+" must contain 3 to 10 letters and can't have a special caracters or numbers"})
                            seterror({...error,[name]:true})
                            setisValid({...isValid,[name]:false})
                          }else{
                            seterrorMessages({...errorMessages,[name]:''})
                            seterror({...error,[name]:false})
                            setisValid({...isValid,[name]:true})
                      
                          }
                      /******************************************************************************** */
                      } else if(name=='email'){
                      
                        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                        if(value==''){
                          seterrorMessages({...errorMessages,[name]:'Please enter your ' +name})
                          seterror({...error,[name]:true})
                          setisValid({...isValid,[name]:false})

                        }else if (!regex.test(value)){
                          seterrorMessages({...errorMessages,[name]:"Please enter a valid " +name})
                            seterror({...error,[name]:true})
                            setisValid({...isValid,[name]:false})
                        }else{
                          seterrorMessages({...errorMessages,[name]:''})
                            seterror({...error,[name]:false})
                            setisValid({...isValid,[name]:true})
                        }
                      }else if(name=='password'){
                        
                        const regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                        if(value==''){
                          seterrorMessages({...errorMessages,[name]:'Please enter your ' +name})
                          seterror({...error,[name]:true})
                          setisValid({...isValid,[name]:false})
                        }else if(!regex.test(value)){

                          seterrorMessages({...errorMessages,[name]:"must have Minimum eight characters, at least one letter and one number"})
                          seterror({...error,[name]:true})
                          setisValid({...isValid,[name]:false})

                        }else{
                          seterrorMessages({...errorMessages,[name]:''})
                            seterror({...error,[name]:false})
                            setisValid({...isValid,[name]:true})
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
                         {type=='backdrop'&& <CloseIcon 
                            onClick={onclosehandler}
                            sx={{display:{xs:'flex',md:'none'},position:'absolute',right:15,top:-25,cursor:'pointer'}}/>}
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
                                      value={formValues.firstName}
                                      error={error.firstName}
                                      helperText={error.firstName && errorMessages.firstName}
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
                                      value={formValues.lastName}
                                      error={error.lastName}
                                      helperText={error.lastName && errorMessages.lastName}
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
                                      value={formValues.email}
                                      error={error.email}
                                      helperText={error.email && errorMessages.email}
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
                                      value={formValues.password}
                                      error={error.password}
                                      helperText={error.password && errorMessages.password}
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
              {submitResponse&&<Typography sx={{textAlign:'center',color:'red'}}>{submitResponse}</Typography>}
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
                    Already have an account? <ButtonBase onClick={togglemodehandler}>Sign in</ButtonBase>
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
