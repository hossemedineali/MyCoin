import {app} from "../../firebaseConfig"
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'

  
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const passwordregex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const nameregex=/^[a-z ,.'-]+$/i;

export default function handler(req, res) {
  const auth = getAuth();
  //const  {firstName,LastName,email,password}=req.body
  const data={...req.body}
  let err={}
  let errorMessages={}
  let isError=false

  for (var key in data){
    /* check if fields are empty */
    if (data[key]==''){
      err[key]=true
      errorMessages[key]='please enter your '+key
      isError=true
    }else 
        /*validate  fields if not empty and not valid */
      {
       if(key=='firstName'||key=='lastName'){
        if(data[key].length<3||data[key]>10||!nameregex.test(data[key])){
          err[key]=true
          errorMessages[key]=key+" must contain 3 to 10 letters and can't have a special caracters or numbers"
          isError=true
        }
    }else if(key=='email'){
        if(!emailregex.test(data[key])){
          err[key]=true
          errorMessages[key]="Please enter a valid email"
          isError=true
        }
    }
    else if (key=='password'){
        if(!passwordregex.test(data[key])){
          err[key]=true
          errorMessages[key]="Password must have Minimum eight characters, at least one letter and one number"
          isError=true
        }
    }
    }
  }
  

  
  if(isError){
    res.status(400).json({message:'invalid input',err,errorMessages})
  }else {

    createUserWithEmailAndPassword(auth,data.email,data.password)
    .then((userCredential)=>{
      res.status(200).json({...userCredential})
    })
    .catch((error)=>{
      res.status(400).json({message:'some thing went wrong',error})
    })
    


  }
   
  
  //res.send(req.body)
  //res.status(200).json({message:'this is ur data returned to you ',data:req.body})
}


/* 
if(firstName==''){
    err={...err,firstName:true}
    errorMessages={...errorMessages,firstName:'please Enter your First name'}
    isError=true
  }else if(firstName.length<3||firstName.length>10){

  }
*/


/* 
  const data= {firstName,LastName,email,password}=req.body
  let err={firstName:false,LastName:false,email:false,password:false}
  let errorMessages={firstName:'',LastName:'',email:'',password:''}
  let isError=false

  Object.entries(data).forEach((key,value)=>{
      if(value==''){
        err={...err,[key]:true}
        errorMessages={...errorMessages,[key]:'please enter your' +key}
        isError=true
        //return
      }else if(key==firstName||key==LastName){
              if(value.length<3||value.length>10){
                   err={...err,[key]:true}
                   errorMessages={...errorMessages,[key]:key+'must be between 3 and 10 characters'}
                   isError=true
             }else if(key==email){
                    if(!emailregex.test(value)){
                     err={...err,[key]:true}
                     errorMessages={...errorMessages,[key]:'please enter a valid email' }
                     isError=true
                    }
             }else if (key==password){
                    if(!passwordregex.test(value)){
                      err={...err,[key]:true}
                      errorMessages={...errorMessages,[key]:'must have Minimum eight characters, at least one letter and one number' }
                      isError=true
                    }
             }
      }

      
  })

*/
